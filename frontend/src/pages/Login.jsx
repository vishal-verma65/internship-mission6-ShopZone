import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { MdAttachEmail, MdKey } from "react-icons/md";
import { FaGlobe, FaTwitter, FaUser } from "react-icons/fa";

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        style={{
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "var(--color-text-muted)",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {/* Left icon */}
        {icon && (
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: focused
                ? "var(--color-primary)"
                : "var(--color-text-faint)",
              transition: "color 0.2s",
              fontSize: "1rem",
              pointerEvents: "none",
            }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: icon ? "0.7rem 0.9rem 0.7rem 2.4rem" : "0.7rem 0.9rem",
            backgroundColor: "var(--color-surface-3)",
            border: `1px solid ${focused ? "var(--color-primary)" : "var(--color-surface-3)"}`,
            borderRadius: "0.6rem",
            color: "var(--color-text)",
            fontSize: "0.9rem",
            fontFamily: "var(--font-body)",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxShadow: focused ? "0 0 0 3px rgba(249,115,22,0.12)" : "none",
          }}
        />
      </div>
    </div>
  );
}

function SocialBtn({ icon, label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.65rem",
        backgroundColor: hovered
          ? "var(--color-surface-3)"
          : "var(--color-surface-2)",
        border: "1px solid var(--color-surface-3)",
        borderRadius: "0.6rem",
        color: "var(--color-text)",
        fontSize: "0.85rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "background-color 0.2s",
        fontFamily: "var(--font-body)",
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      {label}
    </button>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useAuthStore((s) => s.login);

  // Where to redirect after login — passed via ProtectedRoute or Cart page
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, from, navigate]);

  const handleGuestLogin = () => {
    login({ name: "Guest User", email: "guest@shopzone.com" });
    navigate(from, { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const name = email
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()); // "john.doe" → "John Doe"
      login({ name, email });
      navigate(from, { replace: true });
    }, 900);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="animate-fade-up"
        style={{
          width: "100%",
          maxWidth: "440px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/*  Card  */}
        <div
          style={{
            backgroundColor: "var(--color-surface-2)",
            border: "1px solid var(--color-surface-3)",
            borderRadius: "1.25rem",
            padding: "clamp(1.5rem, 5vw, 2.5rem)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          }}
        >
          {/* Logo + heading */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Link
              to="/"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "var(--color-text)",
                textDecoration: "none",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ color: "var(--color-primary)" }}>Shop</span>Zone
            </Link>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: "var(--color-text)",
              }}
            >
              Welcome back
            </h1>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-muted)",
                marginTop: "0.3rem",
              }}
            >
              {from !== "/"
                ? "🔒 Login required to continue checkout"
                : "Sign in to your account"}
            </p>
          </div>

          {/*  Guest Login CTA  */}
          <div
            style={{
              backgroundColor: "rgba(249,115,22,0.07)",
              border: "1px solid rgba(249,115,22,0.2)",
              borderRadius: "0.75rem",
              padding: "1rem",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--color-text-muted)",
                marginBottom: "0.75rem",
              }}
            >
              Just browsing? Jump straight in as a guest — no account needed.
            </p>
            <button
              onClick={handleGuestLogin}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "0.7rem",
              }}
            >
              <FaUser /> Continue as Guest
            </button>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "var(--color-surface-3)",
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-faint)",
                fontWeight: 500,
              }}
            >
              or sign in with email
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "var(--color-surface-3)",
              }}
            />
          </div>

          {/*  Email / Password form  */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <InputField
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              icon=<MdAttachEmail className="text-yellow-200" />
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              icon=<MdKey className="text-yellow-200" />
            />

            {/* Error message */}
            {error && (
              <div
                style={{
                  backgroundColor: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: "0.5rem",
                  padding: "0.6rem 0.85rem",
                  fontSize: "0.82rem",
                  color: "var(--color-danger)",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "0.75rem",
                marginTop: "0.25rem",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "⏳ Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Social logins */}
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
            <SocialBtn
              icon=<FaGlobe className="text-blue-200" />
              label="Google"
              onClick={handleGuestLogin}
            />
            <SocialBtn
              icon=<FaTwitter />
              label="Twitter"
              onClick={handleGuestLogin}
            />
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.78rem",
              color: "var(--color-text-faint)",
              marginTop: "1.5rem",
            }}
          >
            Don't have an account?{" "}
            <button
              onClick={handleGuestLogin}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-primary)",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.78rem",
                fontFamily: "var(--font-body)",
                padding: 0,
              }}
            >
              Create one instantly →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
