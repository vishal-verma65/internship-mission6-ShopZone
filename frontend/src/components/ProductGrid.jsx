import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

// ProductGrid
/**
 * Renders a responsive grid of ProductCard components.
 *
 * Props:
 *  - products  : Array of product objects to display
 *  - searchTerm: Current search string (used in empty state message)
 *
 * Handles:
 *  - Empty array → shows EmptyState with contextual message
 *  - Populated array → renders staggered animated cards in CSS grid
 */
export default function ProductGrid({ products = [], searchTerm = "" }) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon="search"
        title={
          searchTerm ? `No results for "${searchTerm}"` : "No products found"
        }
        description={
          searchTerm
            ? "Try a different search term or browse all categories."
            : "Check back later or try a different filter."
        }
        action={{ label: "Browse All Products", to: "/shop" }}
      />
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {products.map((product, index) => (
        // Wrap each card in a div with a staggered animation delay
        <div
          key={product.id}
          style={{
            animation: "fadeUp 0.45s var(--ease-smooth) both",
            animationDelay: `${index * 40}ms`, // 40ms stagger per card
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
