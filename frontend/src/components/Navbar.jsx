import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function HamburgerIcon({ open }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const totalQty = useCartStore((s) => s.totalQty);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const clearCart = useCartStore((s) => s.clearCart);

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled
          ? "rgba(15, 15, 15, 0.92)"
          : "rgba(15, 15, 15, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? "var(--color-surface-3)" : "transparent"}`,
        transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div
        className="container-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        <Link
          to="/"
          onClick={handleNavClick}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.4rem",
            color: "var(--color-text)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <span style={{ color: "var(--color-primary)" }}>Shop</span>Zone
        </Link>

        {/*  Desktop Nav Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={handleNavClick}
              style={({ isActive }) => ({
                padding: "0.4rem 0.85rem",
                borderRadius: "0.5rem",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.9rem",
                textDecoration: "none",
                color: isActive
                  ? "var(--color-primary)"
                  : "var(--color-text-muted)",
                backgroundColor: isActive
                  ? "rgba(249,115,22,0.1)"
                  : "transparent",
                transition: "color 0.2s, background-color 0.2s",
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/*  Right Side Actions─ */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Cart Button with Badge */}
          <Link
            to="/cart"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "0.5rem",
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-surface-3)",
              color: "var(--color-text)",
              textDecoration: "none",
              transition: "border-color 0.2s, background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)";
              e.currentTarget.style.backgroundColor = "rgba(249,115,22,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-surface-3)";
              e.currentTarget.style.backgroundColor = "var(--color-surface-2)";
            }}
          >
            <CartIcon />
            {/* Dynamic badge — only shows when cart has items */}
            {totalQty > 0 && (
              <span className="badge" style={{ fontSize: "0.6rem" }}>
                {totalQty > 99 ? "99+" : totalQty}
              </span>
            )}
          </Link>

          {/* Auth Button — Login or User menu */}
          {isAuthenticated ? (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-text-muted)",
                  fontWeight: 500,
                  maxWidth: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="btn-ghost"
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.8rem" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary"
              style={{
                padding: "0.5rem 1.1rem",
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              <UserIcon /> Login
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-surface-3)",
              borderRadius: "0.5rem",
              color: "var(--color-text)",
              cursor: "pointer",
            }}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/*  Mobile Dropdown Menu */}
      {mobileOpen && (
        <div
          style={{
            backgroundColor: "var(--color-surface-2)",
            borderTop: "1px solid var(--color-surface-3)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={handleNavClick}
              style={({ isActive }) => ({
                padding: "0.65rem 0.85rem",
                borderRadius: "0.5rem",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                color: isActive ? "var(--color-primary)" : "var(--color-text)",
                backgroundColor: isActive
                  ? "rgba(249,115,22,0.1)"
                  : "transparent",
              })}
            >
              {label}
            </NavLink>
          ))}

          {/* Mobile auth row */}
          <div
            style={{
              marginTop: "0.5rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--color-surface-3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {isAuthenticated ? (
              <>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  👋 {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-ghost"
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={handleNavClick}
                className="btn-primary"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
