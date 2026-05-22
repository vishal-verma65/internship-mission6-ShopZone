//*  ProductCard
/**
 * Displays a single product in card format.
 *
 * Props:
 *  - product: full product object from DummyJSON API
 *
 * Features:
 *  - Navigates to /product/:id on "View Details" click
 *  - "Add to Cart" button with visual feedback (brief "Added!" state)
 *  - Image zoom on hover
 *  - Category badge
 *  - Star rating display
 *  - Discount badge if discountPercentage > 5
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "#facc15" : "none"}
          stroke={
            star <= Math.round(rating) ? "#facc15" : "var(--color-surface-3)"
          }
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span
        style={{
          fontSize: "0.72rem",
          color: "var(--color-text-muted)",
          marginLeft: "3px",
          fontWeight: 500,
        }}
      >
        {rating?.toFixed(1)}
      </span>
    </div>
  );
}

function MiniCartIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false); // feedback state
  const [imgError, setImgError] = useState(false); // image fallback

  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  const cartItems = useCartStore((s) => s.items);

  // Check if this product is already in cart
  const inCart = cartItems.some((i) => i.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleCardClick = () => navigate(`/product/${product.id}`);

  // Format price
  const hasDiscount = product.discountPercentage > 5;
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <article
      className="card animate-fade-up"
      onClick={handleCardClick}
      style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      aria-label={`View details for ${product.title}`}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#fff",
          height: "200px",
        }}
      >
        <img
          src={
            imgError
              ? "https://placehold.co/400x300?text=No+Image"
              : product.thumbnail
          }
          alt={product.title}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: "0.75rem",
            transition: "transform 0.4s var(--ease-smooth)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.08)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        {hasDiscount && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              fontSize: "0.68rem",
              fontWeight: 700,
              padding: "0.2rem 0.5rem",
              borderRadius: "999px",
            }}
          >
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        {/* In-cart indicator */}
        {inCart && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "var(--color-success)",
              color: "#fff",
              fontSize: "0.65rem",
              fontWeight: 700,
              padding: "0.2rem 0.5rem",
              borderRadius: "999px",
            }}
          >
            ✓ In Cart
          </div>
        )}
      </div>

      {/* Card body─ */}
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          flex: 1, // push button to bottom
        }}
      >
        {/* Category tag */}
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "var(--color-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            backgroundColor: "rgba(249,115,22,0.1)",
            padding: "0.15rem 0.5rem",
            borderRadius: "999px",
            alignSelf: "flex-start",
          }}
        >
          {product.category}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "var(--color-text)",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden", // clamp to 2 lines
          }}
        >
          {product.title}
        </h3>

        <StarRating rating={product.rating} />

        {/* Price row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "0.25rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--color-text)",
            }}
          >
            ${product.price?.toFixed(2)}
          </span>
          {originalPrice && (
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--color-text-faint)",
                textDecoration: "line-through",
              }}
            >
              ${originalPrice}
            </span>
          )}
        </div>

        <div style={{ flex: 1 }} />

        {/* Action buttons─ */}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="btn-ghost"
            style={{ flex: 1, fontSize: "0.8rem", padding: "0.5rem" }}
          >
            Details
          </button>
          ]{" "}
          <button
            onClick={handleAddToCart}
            className="btn-primary"
            style={{
              flex: 1,
              fontSize: "0.8rem",
              padding: "0.5rem",
              backgroundColor: added ? "var(--color-success)" : undefined,
              transition: "background-color 0.3s",
            }}
          >
            {added ? (
              "✓ Added!"
            ) : (
              <>
                <MiniCartIcon /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
