import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import { FaShippingFast } from "react-icons/fa";

function OrderSummary({ totalPrice, totalQty, onCheckout }) {
  const TAX_RATE = 0.08;
  const SHIPPING_MIN = 50;
  const subtotal = totalPrice;
  const shipping = subtotal >= SHIPPING_MIN ? 0 : 4.99;
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + shipping + tax;

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-surface-3)",
        borderRadius: "var(--radius-card)",
        padding: "1.5rem",
        position: "sticky",
        top: "84px",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "var(--color-text)",
          marginBottom: "1.25rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--color-surface-3)",
        }}
      >
        Order Summary
      </h2>

      {/* Line items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
          marginBottom: "1rem",
        }}
      >
        <SummaryRow
          label={`Subtotal (${totalQty} item${totalQty !== 1 ? "s" : ""})`}
          value={`$${subtotal.toFixed(2)}`}
        />

        <SummaryRow
          label="Shipping"
          value={shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          valueStyle={{
            color: shipping === 0 ? "var(--color-success)" : undefined,
          }}
        />

        <SummaryRow
          label={`Tax (${(TAX_RATE * 100).toFixed(0)}%)`}
          value={`$${tax.toFixed(2)}`}
        />
      </div>

      {/* Free shipping nudge */}
      {subtotal < SHIPPING_MIN && (
        <div
          style={{
            backgroundColor: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: "0.5rem",
            padding: "0.65rem 0.85rem",
            fontSize: "0.78rem",
            color: "var(--color-primary)",
            marginBottom: "1rem",
          }}
        >
          <FaShippingFast className="text-orange-300 inline text-xl" /> Add{" "}
          <strong>${(SHIPPING_MIN - subtotal).toFixed(2)}</strong> more for free
          shipping!
        </div>
      )}

      {/* Divider + Grand total */}
      <div
        style={{
          borderTop: "1px solid var(--color-surface-3)",
          paddingTop: "0.85rem",
          marginBottom: "1.25rem",
        }}
      >
        <SummaryRow label="Total" value={`$${grandTotal.toFixed(2)}`} bold />
      </div>

      {/* Checkout CTA */}
      <button
        onClick={onCheckout}
        className="btn-primary"
        style={{
          width: "100%",
          padding: "0.85rem",
          fontSize: "0.95rem",
          justifyContent: "center",
        }}
      >
        Proceed to Checkout →
      </button>

      <Link
        to="/shop"
        className="btn-ghost"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "0.65rem",
          textDecoration: "none",
          padding: "0.65rem",
          fontSize: "0.85rem",
        }}
      >
        ← Continue Shopping
      </Link>

      {/* Trust badges */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1.25rem",
          paddingTop: "1rem",
          borderTop: "1px solid var(--color-surface-3)",
          flexWrap: "wrap",
        }}
      >
        {["🔒 Secure", "↩️ Easy Returns", "🚚 Fast Ship"].map((t) => (
          <span
            key={t}
            style={{
              fontSize: "0.72rem",
              color: "var(--color-text-faint)",
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, bold = false, valueStyle = {} }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: bold ? "1rem" : "0.87rem",
        fontWeight: bold ? 700 : 400,
        color: bold ? "var(--color-text)" : "var(--color-text-muted)",
      }}
    >
      <span>{label}</span>
      <span
        style={{
          fontWeight: bold ? 800 : 500,
          color: "var(--color-text)",
          ...valueStyle,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalQty = useCartStore((s) => s.totalQty);
  const clearCart = useCartStore((s) => s.clearCart);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      // Send user to login, with intent to return to checkout
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ padding: "4rem 0" }}>
        <div className="container-page">
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            description="You haven't added anything yet. Browse our products and find something you love!"
            action={{ label: "Start Shopping", to: "/shop" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container-page">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
              }}
            >
              Shopping Cart
            </h1>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--color-text-muted)",
                marginTop: "0.25rem",
              }}
            >
              {totalQty} item{totalQty !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          {/* Clear cart */}
          <button
            onClick={() => {
              if (window.confirm("Remove all items from cart?")) clearCart();
            }}
            className="btn-danger"
            style={{ fontSize: "0.82rem" }}
          >
            Clear Cart
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "2rem",
            alignItems: "start",
          }}
          className="cart-layout"
        >
          {/* Left — Cart items list */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Right — Order summary */}
          <OrderSummary
            totalPrice={totalPrice}
            totalQty={totalQty}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
