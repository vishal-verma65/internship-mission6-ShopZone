//* EmptyState Component
/**
 * Reusable empty/error state UI shown when:
 *  - Cart is empty            → icon="cart"
 *  - Search returns nothing   → icon="search"
 *  - API fetch fails          → icon="error"
 *  - No products in category  → icon="box"
 *
 * Props:
 *  - icon       : 'cart' | 'search' | 'error' | 'box'   (default: 'box')
 *  - title      : Main heading text
 *  - description: Subtext below the heading
 *  - action     : { label, to } — renders a Link button (optional)
 *  - onRetry    : function — renders a "Try Again" button (optional, for errors)
 */

import { Link } from "react-router-dom";

const ICONS = {
  cart: (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  search: (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  error: (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  box: (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  ),
};

export default function EmptyState({
  icon = "box",
  title = "Nothing here yet",
  description = "",
  action = null, // { label: 'Go Shopping', to: '/shop' }
  onRetry = null, // callback for error retry
}) {
  return (
    <div
      className="animate-fade-up"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 1.5rem",
        gap: "1rem",
      }}
    >
      {/* Icon container with glowing ring */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "var(--color-surface-2)",
          border: "2px solid var(--color-surface-3)",
          color: "var(--color-text-faint)",
          marginBottom: "0.5rem",
          boxShadow: "0 0 40px rgba(249, 115, 22, 0.07)",
        }}
      >
        {ICONS[icon] ?? ICONS.box}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.4rem",
          color: "var(--color-text)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>

      {description && (
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-text-muted)",
            maxWidth: "320px",
            lineHeight: 1.65,
          }}
        >
          {description}
        </p>
      )}

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {action && (
          <Link
            to={action.to}
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            {action.label}
          </Link>
        )}

        {onRetry && (
          <button onClick={onRetry} className="btn-ghost">
            ↺ Try Again
          </button>
        )}
      </div>
    </div>
  );
}
