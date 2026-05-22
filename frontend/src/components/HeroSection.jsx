import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";

//* Animated counter hook
// Counts from 0 up to `target` over `duration` ms
function useCounter(target, duration = 1500, startCounting = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);

  return count;
}

function StatCard({ value, label, suffix = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const count = useCounter(value, 1400, visible);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "1rem 1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(1.6rem, 2vw, 2.2rem)",
          color: "var(--color-primary)",
          lineHeight: 1,
        }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          color: "var(--color-text-muted)",
          marginTop: "0.3rem",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function FloatingBadge({ text, style, icon }) {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-surface-3)",
        borderRadius: "0.75rem",
        padding: "0.5rem 0.9rem",
        fontSize: "0.78rem",
        fontWeight: 600,
        color: "var(--color-text)",
        backdropFilter: "blur(8px)",
        whiteSpace: "nowrap",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        animation: "floatBadge 3s ease-in-out infinite",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        ...style,
      }}
    >
      {icon}
      {text}
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay so entrance animation fires after paint
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/*  Background mesh gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `
          radial-gradient(ellipse 80% 60% at 60% 40%, rgba(249,115,22,0.13) 0%, transparent 65%),
          radial-gradient(ellipse 50% 50% at 20% 80%, rgba(249,115,22,0.07) 0%, transparent 60%)
        `,
          pointerEvents: "none",
        }}
      />

      {/*  Decorative grid lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-page"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
          padding: "4rem 1.5rem",
        }}
      >
        {/*  Left: Text content */}
        <div style={{ "padding-bottom": "3rem" }}>
          {/* Pre-badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.25)",
              borderRadius: "999px",
              padding: "0.3rem 0.9rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-primary)",
              marginBottom: "1.25rem",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--color-primary)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            New arrivals every week
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
              marginBottom: "1.25rem",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
            }}
          >
            Shop Smarter,{" "}
            <span
              style={{
                color: "var(--color-primary)",
                position: "relative",
                display: "inline-block",
              }}
            >
              Live Better
              {/* Underline accent */}
              <svg
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "100%",
                  height: "6px",
                  overflow: "visible",
                }}
                viewBox="0 0 200 6"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q50 0 100 4 Q150 8 200 3"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2.5"
                  strokeOpacity="0.5"
                />
              </svg>
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            style={{
              fontSize: "clamp(0.95rem, 1vw, 1.1rem)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "460px",
              marginBottom: "2rem",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s",
            }}
          >
            Discover thousands of products across every category. Quality you
            can trust, prices that won't break the bank — all in one modern
            storefront.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
            }}
          >
            <Link
              to="/shop"
              className="btn-primary"
              style={{
                textDecoration: "none",
                padding: "0.75rem 1.75rem",
                fontSize: "0.95rem",
              }}
            >
              Shop Now →
            </Link>
            <Link
              to="/contact"
              className="btn-ghost"
              style={{
                textDecoration: "none",
                padding: "0.75rem 1.75rem",
                fontSize: "0.95rem",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>

        {/*  Right: Visual panel */}
        <div
          style={{
            "padding-bottom": "3rem",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(30px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
          className="hero-visual"
        >
          {/* Central glowing orb */}
          <div
            style={{
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: `
              radial-gradient(circle at 40% 35%,
                rgba(249,115,22,0.25) 0%,
                rgba(249,115,22,0.08) 50%,
                transparent 70%
              )
            `,
              border: "1px solid rgba(249,115,22,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 80px rgba(249,115,22,0.12), inset 0 0 60px rgba(249,115,22,0.05)",
            }}
          >
            <div
              style={{
                fontSize: "18rem",
              }}
            >
              <img
                src="/shopping.svg"
                alt="Products"
                style={{ width: "1em", height: "1em" }}
              />
            </div>
          </div>

          {/* Floating badges around the orb */}
          <FloatingBadge
            icon={<AiFillProduct className="text-yellow-600" />}
            text="2,000+ Products"
            style={{ top: "8%", left: "2%", animationDelay: "0s" }}
          />
          <FloatingBadge
            icon={<FaStar className="text-yellow-400" />}
            text="4.8 Avg Rating"
            style={{ top: "20%", right: "0%", animationDelay: "0.8s" }}
          />
          <FloatingBadge
            icon={<FaShippingFast className="text-orange-400" />}
            text="Fast Delivery"
            style={{ bottom: "22%", left: "0%", animationDelay: "1.4s" }}
          />
          <FloatingBadge
            icon={<RiSecurePaymentFill className="text-blue-400" />}
            text="Secure Payments"
            style={{ bottom: "8%", right: "2%", animationDelay: "0.4s" }}
          />
        </div>
      </div>

      {/*  Stats bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(26,26,26,0.8)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid var(--color-surface-3)",
        }}
      >
        <div
          className="container-page"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: ".2rem 1.5rem",
          }}
        >
          <StatCard value={2000} suffix="+" label="Products" delay={600} />
          <StatCard value={150} suffix="+" label="Brands" delay={750} />
          <StatCard
            value={50000}
            suffix="+"
            label="Happy Customers"
            delay={900}
          />
          <StatCard value={99} suffix="%" label="Satisfaction" delay={1050} />
        </div>
      </div>
    </section>
  );
}
