//* CartItem
/**
 * Renders a single row in the cart page.
 *
 * Props:
 *  - item: cart item object { id, title, price, thumbnail, category, quantity }
 *
 * Features:
 *  - Quantity stepper (+/−) — removes item if quantity goes to 0
 *  - Remove button with confirmation animation
 *  - Line total = price × quantity
 *  - Image fallback on error
 *  - Fade-out animation before removal
 */

import { useState } from "react";
import useCartStore from "../store/cartStore";

function TrashIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function CartItem({ item }) {
  const [imgError, setImgError] = useState(false);
  const [removing, setRemoving] = useState(false); // triggers fade-out

  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  //  Remove with animated fade-out
  const handleRemove = () => {
    setRemoving(true);
    // Wait for CSS transition to finish before actually removing from store
    setTimeout(() => removeFromCart(item.id), 300);
  };

  //  Quantity controls
  const increment = () => updateQuantity(item.id, item.quantity + 1);
  const decrement = () => {
    if (item.quantity === 1) {
      handleRemove(); // remove item when qty hits 0
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const lineTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-surface-3)",
        borderRadius: "var(--radius-card)",
        opacity: removing ? 0 : 1,
        transform: removing ? "translateX(20px)" : "translateX(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {/*  Product image */}
      <div
        style={{
          flexShrink: 0,
          width: "80px",
          height: "80px",
          borderRadius: "0.6rem",
          overflow: "hidden",
          backgroundColor: "#fff",
          border: "1px solid var(--color-surface-3)",
        }}
      >
        <img
          src={imgError ? "https://placehold.co/80x80?text=?" : item.thumbnail}
          alt={item.title}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: "6px",
          }}
        />
      </div>

      {/*  Item info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Category */}
        <span
          style={{
            fontSize: "0.68rem",
            color: "var(--color-primary)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {item.category}
        </span>

        {/* Title — truncated to 1 line on small screens */}
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "var(--color-text)",
            marginTop: "0.15rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </h4>

        {/* Unit price */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
            marginTop: "0.2rem",
          }}
        >
          ${item.price.toFixed(2)} each
        </p>
      </div>

      {/*  Quantity stepper */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          backgroundColor: "var(--color-surface-3)",
          borderRadius: "0.5rem",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <button
          onClick={decrement}
          aria-label="Decrease quantity"
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            transition: "background-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(249,115,22,0.15)";
            e.currentTarget.style.color = "var(--color-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          <MinusIcon />
        </button>

        <span
          style={{
            minWidth: "28px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "var(--color-text)",
            userSelect: "none",
          }}
        >
          {item.quantity}
        </span>

        <button
          onClick={increment}
          aria-label="Increase quantity"
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            transition: "background-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(249,115,22,0.15)";
            e.currentTarget.style.color = "var(--color-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          <PlusIcon />
        </button>
      </div>

      {/*  Line total + remove */}
      <div
        style={{
          flexShrink: 0,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--color-text)",
          }}
        >
          ${lineTotal}
        </span>

        <button onClick={handleRemove} className="btn-danger">
          <TrashIcon /> Remove
        </button>
      </div>
    </div>
  );
}
