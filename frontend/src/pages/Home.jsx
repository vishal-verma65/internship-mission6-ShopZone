import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { fetchAllProducts, fetchCategories } from "../api/products";

import { BsFillLightningFill } from "react-icons/bs";
import { SiAdguard } from "react-icons/si";
import { MdPriceChange } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";

function SectionHeader({ tag, title, subtitle, action }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: "1.75rem",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}
    >
      <div>
        <span
          style={{
            display: "block",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.35rem",
          }}
        >
          {tag}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            color: "var(--color-text)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--color-text-muted)",
              marginTop: "0.4rem",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          to={action.to}
          className="btn-ghost"
          style={{
            textDecoration: "none",
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
          }}
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}

const CATEGORY_META = {
  smartphones: { icon: "📱", label: "Smartphones" },
  laptops: { icon: "💻", label: "Laptops" },
  fragrances: { icon: "🌸", label: "Fragrances" },
  skincare: { icon: "✨", label: "Skincare" },
  groceries: { icon: "🛒", label: "Groceries" },
  "home-decoration": { icon: "🏠", label: "Home Decor" },
  furniture: { icon: "🛋️", label: "Furniture" },
  tops: { icon: "👕", label: "Tops" },
  "womens-dresses": { icon: "👗", label: "Women's Dresses" },
  "womens-shoes": { icon: "👠", label: "Women's Shoes" },
  "mens-shoes": { icon: "👟", label: "Men's Shoes" },
  "mens-watches": { icon: "⌚", label: "Men's Watches" },
  "womens-watches": { icon: "⌚", label: "Women's Watches" },
  "womens-bags": { icon: "👜", label: "Women's Bags" },
  "womens-jewellery": { icon: "💍", label: "Jewellery" },
  sunglasses: { icon: "🕶️", label: "Sunglasses" },
  automotive: { icon: "🚗", label: "Automotive" },
  motorcycle: { icon: "🏍️", label: "Motorcycle" },
  lighting: { icon: "💡", label: "Lighting" },
};

function CategoryCard({ category, index }) {
  const [hovered, setHovered] = useState(false);
  const slug = category?.slug || category;
  const meta = CATEGORY_META[slug] || { icon: "📦", label: slug };

  return (
    <Link to={`/shop?category=${slug}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.6rem",
          padding: "1.25rem 0.75rem",
          backgroundColor: hovered
            ? "rgba(249,115,22,0.08)"
            : "var(--color-surface-2)",
          border: `1px solid ${hovered ? "rgba(249,115,22,0.4)" : "var(--color-surface-3)"}`,
          borderRadius: "var(--radius-card)",
          cursor: "pointer",
          transition: "all 0.25s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          animation: "fadeUp 0.4s ease both",
          animationDelay: `${index * 50}ms`,
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{meta.icon}</span>
        <span
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: hovered ? "var(--color-primary)" : "var(--color-text-muted)",
            transition: "color 0.2s",
            lineHeight: 1.3,
          }}
        >
          {meta.label}
        </span>
      </div>
    </Link>
  );
}

function FeatureBanner() {
  return (
    <div
      style={{
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.04) 100%)",
        border: "1px solid rgba(249,115,22,0.25)",
        padding: "clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 3rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        flexWrap: "wrap",
        position: "relative",
      }}
    >
      {/* Decorative circle */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-60px",
          top: "-60px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
          }}
        >
          Limited Time Offer
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            color: "var(--color-text)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "0.75rem",
          }}
        >
          Up to 40% off
          <br />
          <span style={{ color: "var(--color-primary)" }}>Top Brands</span>
        </h3>
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--color-text-muted)",
            marginBottom: "1.25rem",
            maxWidth: "360px",
          }}
        >
          Shop our biggest sale of the season. Deals on electronics, fashion,
          home goods and more.
        </p>
        <Link
          to="/shop"
          className="btn-primary"
          style={{ textDecoration: "none" }}
        >
          Shop the Sale →
        </Link>
      </div>

      <div
        style={{
          fontSize: "6rem",
          animation: "floatOrb 4s ease-in-out infinite",
        }}
      >
        🏷️
      </div>

      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Fetch both simultaneously for speed
        const [productsData, catsData] = await Promise.all([
          fetchAllProducts(8, 0), // only 8 featured products
          fetchCategories(),
        ]);
        setFeatured(productsData.products);
        setCategories(catsData.slice(0, 12)); // show first 12 categories
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <HeroSection />

      {/* Categories */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container-page">
          <SectionHeader
            tag="Browse"
            title="Shop by Category"
            subtitle="Find exactly what you're looking for"
            action={{ label: "All Categories", to: "/shop" }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: "0.85rem",
            }}
          >
            {categories.map((cat, i) => (
              <CategoryCard key={cat?.slug || cat} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        style={{
          padding: "4rem 0",
          backgroundColor: "rgba(26,26,26,0.5)",
          borderTop: "1px solid var(--color-surface-3)",
          borderBottom: "1px solid var(--color-surface-3)",
        }}
      >
        <div className="container-page">
          <SectionHeader
            tag="Hand Picked"
            title="Featured Products"
            subtitle="Our top picks just for you"
            action={{ label: "View All Products", to: "/shop" }}
          />
          {loading && <Loader variant="grid" count={8} />}
          {error && (
            <EmptyState
              icon="error"
              title="Couldn't load products"
              description={error}
              onRetry={() => window.location.reload()}
            />
          )}
          {!loading && !error && <ProductGrid products={featured} />}
        </div>
      </section>

      {/* Feature Banner */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container-page">
          <FeatureBanner />
        </div>
      </section>

      {/* Why ShopZone */}
      <section
        style={{
          padding: "4rem 0 5rem",
          borderTop: "1px solid var(--color-surface-3)",
        }}
      >
        <div className="container-page">
          <SectionHeader
            tag="Why Us"
            title="The ShopZone Difference"
            subtitle="We go above and beyond for every customer"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                icon: <BsFillLightningFill className="text-yellow-500" />,
                title: "Lightning Fast",
                desc: "Same-day dispatch on most orders. Expect your package in record time.",
              },
              {
                icon: <SiAdguard className="text-green-600" />,
                title: "Buyer Protection",
                desc: "100% purchase protection. Not happy? We make it right, no questions asked.",
              },
              {
                icon: <MdPriceChange className="text-yellow-300" />,
                title: "Best Price Guarantee",
                desc: "Found it cheaper elsewhere? We will match or beat any competitor price.",
              },
              {
                icon: <FaHandsHelping className="text-orange-200" />,
                title: "24/7 Support",
                desc: "Our customer care team is available round the clock to help you with anything.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={title}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px solid var(--color-surface-3)",
                  borderRadius: "var(--radius-card)",
                  animation: "fadeUp 0.45s ease both",
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>
                  {icon}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--color-text)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
