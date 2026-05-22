import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
  searchProducts,
} from "../api/products";

function SearchBar({ value, onChange, onClear }) {
  return (
    <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
      {/* Search icon */}
      <svg
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: "var(--color-text-faint)",
        }}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        type="text"
        placeholder="Search products…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.65rem 2.5rem 0.65rem 2.4rem",
          backgroundColor: "var(--color-surface-2)",
          border: "1px solid var(--color-surface-3)",
          borderRadius: "0.6rem",
          color: "var(--color-text)",
          fontSize: "0.9rem",
          fontFamily: "var(--font-body)",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--color-surface-3)")}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={onClear}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            fontSize: "1rem",
            lineHeight: 1,
            padding: "2px",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

function FilterBar({
  categories,
  activeCategory,
  onCategory,
  sortBy,
  onSort,
  totalCount,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
      }}
    >
      {/* Category select */}
      <select
        value={activeCategory}
        onChange={(e) => onCategory(e.target.value)}
        style={{
          padding: "0.6rem 0.9rem",
          backgroundColor: "var(--color-surface-2)",
          border: "1px solid var(--color-surface-3)",
          borderRadius: "0.6rem",
          color: "var(--color-text)",
          fontSize: "0.85rem",
          fontFamily: "var(--font-body)",
          cursor: "pointer",
          outline: "none",
          minWidth: "155px",
        }}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => {
          const slug = cat?.slug || cat;
          const label = cat?.name || slug;
          return (
            <option key={slug} value={slug}>
              {label.charAt(0).toUpperCase() +
                label.slice(1).replace(/-/g, " ")}
            </option>
          );
        })}
      </select>

      {/* Sort select */}
      <select
        value={sortBy}
        onChange={(e) => onSort(e.target.value)}
        style={{
          padding: "0.6rem 0.9rem",
          backgroundColor: "var(--color-surface-2)",
          border: "1px solid var(--color-surface-3)",
          borderRadius: "0.6rem",
          color: "var(--color-text)",
          fontSize: "0.85rem",
          fontFamily: "var(--font-body)",
          cursor: "pointer",
          outline: "none",
          minWidth: "155px",
        }}
      >
        <option value="default">Sort: Default</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating-desc">Rating: Best First</option>
        <option value="name-asc">Name: A → Z</option>
      </select>

      {/* Result count */}
      <span
        style={{
          fontSize: "0.82rem",
          color: "var(--color-text-muted)",
          marginLeft: "auto",
        }}
      >
        {totalCount} product{totalCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

function sortProducts(products, sortBy) {
  const arr = [...products];
  switch (sortBy) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return arr.sort((a, b) => b.rating - a.rating);
    case "name-asc":
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return arr;
  }
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Controls — read initial values from URL query params
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState("default");

  //  Initial data load
  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        const [productsData, catsData] = await Promise.all([
          fetchAllProducts(100, 0),
          fetchCategories(),
        ]);
        setAllProducts(productsData.products);
        setCategories(catsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  //  Apply filters + sort whenever controls or source data change
  useEffect(() => {
    let result = [...allProducts];

    // 1. Category filter
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Search filter (client-side on the already-fetched data)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    // 3. Sort
    result = sortProducts(result, sortBy);

    setDisplayed(result);
  }, [allProducts, activeCategory, searchTerm, sortBy]);

  const handleCategory = useCallback(
    (cat) => {
      setActiveCategory(cat);
      setSearchTerm(""); // clear search when switching category
      if (cat) {
        setSearchParams({ category: cat });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("");
    setSortBy("default");
    setSearchParams({});
  };

  const hasActiveFilters = searchTerm || activeCategory || sortBy !== "default";

  if (error) {
    return (
      <div className="container-page" style={{ padding: "4rem 1.5rem" }}>
        <EmptyState
          icon="error"
          title="Failed to load products"
          description={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "80vh" }}>
      {/*  Page header  */}
      <div
        style={{
          borderBottom: "1px solid var(--color-surface-3)",
          backgroundColor: "var(--color-surface-2)",
          padding: "2.5rem 0 2rem",
        }}
      >
        <div className="container-page">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.03em",
              marginBottom: "0.4rem",
            }}
          >
            {activeCategory
              ? activeCategory.charAt(0).toUpperCase() +
                activeCategory.slice(1).replace(/-/g, " ")
              : "All Products"}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
            {loading
              ? "Loading products…"
              : `Showing ${displayed.length} of ${allProducts.length} products`}
          </p>
        </div>
      </div>

      {/*  Controls bar  */}
      <div
        style={{
          position: "sticky",
          top: "64px",
          zIndex: 10,
          backgroundColor: "rgba(15,15,15,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-surface-3)",
          padding: "0.85rem 0",
        }}
      >
        <div
          className="container-page"
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
          />
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategory={handleCategory}
            sortBy={sortBy}
            onSort={setSortBy}
            totalCount={displayed.length}
          />
          {/* Clear filters button — only shown when filters are active */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-ghost"
              style={{
                fontSize: "0.8rem",
                padding: "0.55rem 0.9rem",
                whiteSpace: "nowrap",
              }}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/*  Product grid  */}
      <div className="container-page" style={{ padding: "2rem 1.5rem 4rem" }}>
        {loading ? (
          <Loader variant="grid" count={12} />
        ) : (
          <ProductGrid products={displayed} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
}
