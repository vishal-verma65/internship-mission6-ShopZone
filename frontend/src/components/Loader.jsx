//* Spinner Loader
// Used for small inline loading states (e.g. button loading, small sections)
export function Spinner({ size = 24, color = "var(--color-primary)" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: "spin 0.75s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

//* Skeleton Card
// Mimics a ProductCard's shape while data is loading.
// Shows a shimmer animation via the `.skeleton` CSS class.
export function SkeletonCard() {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-surface-3)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
      }}
    >
      {/* Image placeholder */}
      <div className="skeleton" style={{ height: "200px", borderRadius: 0 }} />

      {/* Text placeholders */}
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
        }}
      >
        {/* Title line - wide */}
        <div className="skeleton" style={{ height: "14px", width: "80%" }} />
        {/* Title line - narrow */}
        <div className="skeleton" style={{ height: "14px", width: "55%" }} />

        {/* Price */}
        <div
          className="skeleton"
          style={{ height: "20px", width: "40%", marginTop: "0.25rem" }}
        />

        {/* Rating row */}
        <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: "14px", height: "14px", borderRadius: "50%" }}
            />
          ))}
          <div className="skeleton" style={{ width: "30px", height: "12px" }} />
        </div>

        {/* Button placeholder */}
        <div
          className="skeleton"
          style={{
            height: "38px",
            borderRadius: "0.6rem",
            marginTop: "0.25rem",
          }}
        />
      </div>
    </div>
  );
}

//* Skeleton Grid
// Renders N skeleton cards inside a responsive grid.
// Drop-in replacement for ProductGrid while loading.
export function SkeletonGrid({ count = 8 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

//* Full Page Loader
// Used when an entire page is loading (e.g. ProductDetail fetching a product).
export function PageLoader({ message = "Loading..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        gap: "1rem",
      }}
    >
      <Spinner size={40} />
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-muted)",
          fontSize: "0.9rem",
        }}
      >
        {message}
      </p>
    </div>
  );
}

export default function Loader({ variant = "page", count = 8, message }) {
  if (variant === "grid") return <SkeletonGrid count={count} />;
  if (variant === "spinner") return <Spinner />;
  return <PageLoader message={message} />;
}
