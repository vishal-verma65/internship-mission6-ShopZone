import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { fetchProductById } from "../api/products";
import { PageLoader } from "../components/Loader";
import EmptyState from "../components/EmptyState";

function StarRating({ rating, count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
      <div style={{ display: "flex", gap: "3px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={star <= Math.round(rating) ? "#facc15" : "none"}
            stroke={
              star <= Math.round(rating) ? "#facc15" : "var(--color-surface-3)"
            }
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span
        style={{
          fontSize: "0.9rem",
          color: "var(--color-text-muted)",
          fontWeight: 500,
        }}
      >
        {rating?.toFixed(1)}
      </span>
      {count && (
        <span style={{ fontSize: "0.82rem", color: "var(--color-text-faint)" }}>
          ({count.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}

function ImageGallery({ images = [], thumbnail, title }) {
  const allImages = images.length > 0 ? images : [thumbnail].filter(Boolean);
  const [active, setActive] = useState(0);
  const [imgError, setImgError] = useState({});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Main image */}
      <div
        style={{
          aspectRatio: "1",
          backgroundColor: "#fff",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-surface-3)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={
            imgError[active]
              ? "https://placehold.co/500x500?text=No+Image"
              : allImages[active]
          }
          alt={`${title} - image ${active + 1}`}
          onError={() => setImgError((prev) => ({ ...prev, [active]: true }))}
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            objectFit: "contain",
            transition: "opacity 0.25s ease",
          }}
        />
      </div>

      {/* Thumbnails — only show if multiple images */}
      {allImages.length > 1 && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "0.5rem",
                overflow: "hidden",
                border: `2px solid ${
                  i === active
                    ? "var(--color-primary)"
                    : "var(--color-surface-3)"
                }`,
                padding: "4px",
                backgroundColor: "#fff",
                cursor: "pointer",
                transition: "border-color 0.2s",
                flexShrink: 0,
              }}
            >
              <img
                src={imgError[i] ? "https://placehold.co/64x64?text=?" : img}
                alt={`thumb ${i + 1}`}
                onError={() => setImgError((prev) => ({ ...prev, [i]: true }))}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "baseline",
        fontSize: "0.85rem",
        padding: "0.5rem 0",
        borderBottom: "1px solid var(--color-surface-3)",
      }}
    >
      <span
        style={{
          color: "var(--color-text-muted)",
          minWidth: "120px",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
        {value}
      </span>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const addToCart = useCartStore((s) => s.addToCart);
  const cartItems = useCartStore((s) => s.items);
  const inCart = cartItems.some((i) => i.id === product?.id);
  const cartQty = cartItems.find((i) => i.id === product?.id)?.quantity || 0;

  // Fetch product
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <PageLoader message="Loading product…" />;

  if (error || !product) {
    return (
      <div className="container-page" style={{ padding: "4rem 1.5rem" }}>
        <EmptyState
          icon="error"
          title="Product not found"
          description={error || "This product does not exist or was removed."}
          action={{ label: "Back to Shop", to: "/shop" }}
        />
      </div>
    );
  }

  // Computed values
  const hasDiscount = product.discountPercentage > 1;
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;
  const savings = hasDiscount
    ? (originalPrice - product.price).toFixed(2)
    : null;

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container-page">
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            style={{ color: "var(--color-text-muted)", textDecoration: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
            }
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to="/shop"
            style={{ color: "var(--color-text-muted)", textDecoration: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
            }
          >
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/shop?category=${product.category}`}
            style={{ color: "var(--color-text-muted)", textDecoration: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
            }
          >
            {product.category}
          </Link>
          <span>/</span>
          <span
            style={{
              color: "var(--color-text)",
              fontWeight: 500,
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.title}
          </span>
        </nav>

        {/* Main layout: image left, info right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="product-layout"
        >
          {/* Left — Gallery */}
          <ImageGallery
            images={product.images}
            thumbnail={product.thumbnail}
            title={product.title}
          />

          {/* Right — Product info */}
          <div
            className="animate-fade-up"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Badges row */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span
                style={{
                  backgroundColor: "rgba(249,115,22,0.1)",
                  color: "var(--color-primary)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.65rem",
                  borderRadius: "999px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  border: "1px solid rgba(249,115,22,0.25)",
                }}
              >
                {product.category}
              </span>
              {product.brand && (
                <span
                  style={{
                    backgroundColor: "var(--color-surface-2)",
                    color: "var(--color-text-muted)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    padding: "0.2rem 0.65rem",
                    borderRadius: "999px",
                    border: "1px solid var(--color-surface-3)",
                  }}
                >
                  {product.brand}
                </span>
              )}
              {product.stock < 10 && (
                <span
                  style={{
                    backgroundColor: "rgba(239,68,68,0.1)",
                    color: "var(--color-danger)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.65rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(239,68,68,0.25)",
                  }}
                >
                  Only {product.stock} left!
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                color: "var(--color-text)",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              {product.title}
            </h1>

            <StarRating
              rating={product.rating}
              count={product.reviews?.length}
            />

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "2rem",
                  color: "var(--color-text)",
                  letterSpacing: "-0.02em",
                }}
              >
                ${product.price?.toFixed(2)}
              </span>
              {originalPrice && (
                <span
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--color-text-faint)",
                    textDecoration: "line-through",
                  }}
                >
                  ${originalPrice}
                </span>
              )}
              {savings && (
                <span
                  style={{
                    backgroundColor: "rgba(34,197,94,0.1)",
                    color: "var(--color-success)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.55rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(34,197,94,0.25)",
                  }}
                >
                  Save ${savings}
                </span>
              )}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.75,
                borderTop: "1px solid var(--color-surface-3)",
                paddingTop: "1rem",
              }}
            >
              {product.description}
            </p>

            {/* Quantity selector */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                  fontWeight: 500,
                }}
              >
                Quantity:
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px solid var(--color-surface-3)",
                  borderRadius: "0.6rem",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "none",
                    border: "none",
                    color: "var(--color-text-muted)",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-muted)")
                  }
                >
                  −
                </button>
                <span
                  style={{
                    minWidth: "36px",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    userSelect: "none",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() =>
                    setQty((q) => Math.min(product.stock || 10, q + 1))
                  }
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "none",
                    border: "none",
                    color: "var(--color-text-muted)",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-muted)")
                  }
                >
                  +
                </button>
              </div>

              {inCart && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-success)",
                    fontWeight: 600,
                  }}
                >
                  ✓ {cartQty} already in cart
                </span>
              )}
            </div>

            {/* CTA buttons */}
            <div
              style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}
            >
              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: "0.85rem",
                  fontSize: "0.95rem",
                  backgroundColor: added ? "var(--color-success)" : undefined,
                  transition: "background-color 0.3s",
                }}
              >
                {added
                  ? "✓ Added to Cart!"
                  : `Add ${qty > 1 ? `${qty} items` : ""} to Cart`}
              </button>
              <Link
                to="/cart"
                className="btn-ghost"
                style={{
                  padding: "0.85rem 1.25rem",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                View Cart
              </Link>
            </div>

            {/* Specs table */}
            <div style={{ marginTop: "0.5rem" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--color-text)",
                  marginBottom: "0.5rem",
                }}
              >
                Product Details
              </h3>
              <InfoRow label="SKU" value={product.sku || "—"} />
              <InfoRow label="Brand" value={product.brand || "—"} />
              <InfoRow label="Category" value={product.category || "—"} />
              <InfoRow label="Stock" value={`${product.stock} units`} />
              <InfoRow
                label="Weight"
                value={product.weight ? `${product.weight} kg` : "—"}
              />
              <InfoRow
                label="Warranty"
                value={product.warrantyInformation || "—"}
              />
              <InfoRow
                label="Shipping"
                value={product.shippingInformation || "—"}
              />
              <InfoRow
                label="Return Policy"
                value={product.returnPolicy || "—"}
              />
            </div>

            {/* Back to shop */}
            <button
              onClick={() => navigate(-1)}
              className="btn-ghost"
              style={{
                alignSelf: "flex-start",
                marginTop: "0.5rem",
                fontSize: "0.85rem",
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
