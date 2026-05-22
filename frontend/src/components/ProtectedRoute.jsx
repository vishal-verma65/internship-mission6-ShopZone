//* ProtectedRoute
/**
 * A wrapper component that guards routes behind authentication.
 *
 * How it works:
 *  1. Reads `isAuthenticated` from Zustand auth store
 *  2. If authenticated  → renders {children} normally
 *  3. If NOT authenticated → redirects to /login
 *     - Passes current path via `state.from` so Login page can
 *       redirect the user back after successful login
 *
 * Usage in App.jsx:
 *  <Route path="/checkout" element={
 *    <ProtectedRoute>
 *      <Checkout />
 *    </ProtectedRoute>
 *  } />
 *
 * Props:
 *  - children: the page/component to render when authenticated
 */

import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to /login, but remember where we came from.
    // The `state` object is passed to the Login page via React Router's
    // location state — Login can then redirect back here after login.
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace // replaces history entry so back-button works correctly
      />
    );
  }

  return children;
}
