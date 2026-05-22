//* Auth Store
// Manages mock authentication state globally.
// Uses `persist` so login survives hard refresh.

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      //  State
      isAuthenticated: false, // true after guest login
      user: null, // holds basic user object

      //* Actions
      /**
       * login: sets authentication to true and stores a mock user object.
       * Called when user clicks "Login as Guest" on the /login page.
       */
      login: (
        userData = { name: "Guest User", email: "guest@shopzone.com" }
      ) => {
        set({ isAuthenticated: true, user: userData });
      },

      /**
       * logout: clears authentication state.
       * Resets both isAuthenticated and user back to defaults.
       */
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),

    //  Persist config
    {
      name: "shopzone-auth", // localStorage key
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
