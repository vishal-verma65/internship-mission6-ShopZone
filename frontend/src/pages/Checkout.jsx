import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import { MdCurrencyBitcoin } from "react-icons/md";

function StepBar({ current }) {
  const steps = ["Shipping", "Payment", "Confirm"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0",
        marginBottom: "2.5rem",
      }}
    >
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center" }}>
            {/* Step circle */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: done
                    ? "var(--color-success)"
                    : active
                      ? "var(--color-primary)"
                      : "var(--color-surface-3)",
                  color: done || active ? "#fff" : "var(--color-text-faint)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  transition: "background-color 0.3s",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: active ? 700 : 500,
                  color: active
                    ? "var(--color-primary)"
                    : done
                      ? "var(--color-success)"
                      : "var(--color-text-faint)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                style={{
                  width: "80px",
                  height: "2px",
                  backgroundColor: done
                    ? "var(--color-success)"
                    : "var(--color-surface-3)",
                  margin: "0 0.25rem",
                  marginBottom: "1.2rem",
                  transition: "background-color 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  half = false,
  required = true,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
        gridColumn: half ? "span 1" : "span 2",
      }}
    >
      <label
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "var(--color-text-muted)",
        }}
      >
        {label}
        {required && <span style={{ color: "var(--color-primary)" }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "0.65rem 0.85rem",
          backgroundColor: "var(--color-surface-3)",
          border: `1px solid ${focused ? "var(--color-primary)" : "transparent"}`,
          borderRadius: "0.55rem",
          color: "var(--color-text)",
          fontSize: "0.88rem",
          fontFamily: "var(--font-body)",
          outline: "none",
          boxShadow: focused ? "0 0 0 3px rgba(249,115,22,0.1)" : "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-surface-3)",
        borderRadius: "var(--radius-card)",
        padding: "1.5rem",
        marginBottom: "1.25rem",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--color-text)",
          marginBottom: "1.1rem",
          paddingBottom: "0.7rem",
          borderBottom: "1px solid var(--color-surface-3)",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalQty = useCartStore((s) => s.totalQty);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 0=Shipping, 1=Payment, 2=Confirm
  const [placing, setPlacing] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const [payment, setPayment] = useState({
    cardName: "",
    cardNum: "",
    expiry: "",
    cvv: "",
  });

  const [payMethod, setPayMethod] = useState("card"); // card | paypal | crypto

  const TAX_RATE = 0.08;
  const shippingFee = totalPrice >= 50 ? 0 : 4.99;
  const tax = totalPrice * TAX_RATE;
  const grandTotal = totalPrice + shippingFee + tax;

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 1800);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 2));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const setS = (field) => (val) => setShipping((p) => ({ ...p, [field]: val }));
  const setP = (field) => (val) => setPayment((p) => ({ ...p, [field]: val }));

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };
  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  };

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container-page">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.025em",
              marginBottom: "0.3rem",
            }}
          >
            Checkout
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            Welcome back,{" "}
            <strong style={{ color: "var(--color-primary)" }}>
              {user?.name}
            </strong>
            ! You have {totalQty} item{totalQty !== 1 ? "s" : ""} in your order.
          </p>
        </div>

        <StepBar current={step} />

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "2rem",
            alignItems: "start",
          }}
          className="checkout-layout"
        >
          {/* Left: form steps */}
          <div>
            {/* STEP 0: Shipping */}
            {step === 0 && (
              <div className="animate-fade-up">
                <Section title="📦 Shipping Information">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.85rem",
                    }}
                  >
                    <Field
                      label="First Name"
                      value={shipping.firstName}
                      onChange={setS("firstName")}
                      placeholder="John"
                      half
                    />
                    <Field
                      label="Last Name"
                      value={shipping.lastName}
                      onChange={setS("lastName")}
                      placeholder="Doe"
                      half
                    />
                    <Field
                      label="Email"
                      value={shipping.email}
                      onChange={setS("email")}
                      placeholder="you@example.com"
                      type="email"
                    />
                    <Field
                      label="Phone"
                      value={shipping.phone}
                      onChange={setS("phone")}
                      placeholder="+1 555 000 0000"
                      type="tel"
                    />
                    <Field
                      label="Street Address"
                      value={shipping.address}
                      onChange={setS("address")}
                      placeholder="123 Main St."
                    />
                    <Field
                      label="City"
                      value={shipping.city}
                      onChange={setS("city")}
                      placeholder="New York"
                      half
                    />
                    <Field
                      label="State"
                      value={shipping.state}
                      onChange={setS("state")}
                      placeholder="NY"
                      half
                    />
                    <Field
                      label="ZIP"
                      value={shipping.zip}
                      onChange={setS("zip")}
                      placeholder="10001"
                      half
                    />
                    <Field
                      label="Country"
                      value={shipping.country}
                      onChange={setS("country")}
                      placeholder="United States"
                      half
                    />
                  </div>
                </Section>

                {/* Shipping method */}
                <Section title="🚚 Shipping Method">
                  {[
                    {
                      id: "standard",
                      label: "Standard Shipping",
                      sub: "5–7 business days",
                      price: "FREE",
                      condition: totalPrice >= 50,
                    },
                    {
                      id: "express",
                      label: "Express Shipping",
                      sub: "1–2 business days",
                      price: "$9.99",
                    },
                    {
                      id: "overnight",
                      label: "Overnight Delivery",
                      sub: "Next business day",
                      price: "$19.99",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.85rem",
                        borderRadius: "0.6rem",
                        border: "1px solid var(--color-surface-3)",
                        marginBottom: "0.5rem",
                        cursor: "pointer",
                        backgroundColor: "var(--color-surface-3)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <input
                          type="radio"
                          name="shipMethod"
                          defaultChecked={opt.id === "standard"}
                        />
                        <div>
                          <p
                            style={{
                              fontSize: "0.88rem",
                              fontWeight: 600,
                              color: "var(--color-text)",
                            }}
                          >
                            {opt.label}
                            {opt.condition && (
                              <span
                                style={{
                                  color: "var(--color-success)",
                                  fontSize: "0.75rem",
                                  marginLeft: "0.4rem",
                                }}
                              >
                                ✓ You qualify!
                              </span>
                            )}
                          </p>
                          <p
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            {opt.sub}
                          </p>
                        </div>
                      </div>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          color:
                            opt.price === "FREE"
                              ? "var(--color-success)"
                              : "var(--color-text)",
                        }}
                      >
                        {opt.price}
                      </span>
                    </label>
                  ))}
                </Section>

                <button
                  onClick={nextStep}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "0.85rem",
                    fontSize: "0.95rem",
                  }}
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* STEP 1: Payment─ */}
            {step === 1 && (
              <div className="animate-fade-up">
                <Section title="💳 Payment Method">
                  {/* Method tabs */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {[
                      {
                        id: "card",
                        icon: <FaCreditCard className="text-blue-300" />,
                        label: "Card",
                      },
                      {
                        id: "paypal",
                        icon: <FaPaypal className="text-blue-400" />,
                        label: "PayPal",
                      },
                      {
                        id: "crypto",
                        icon: <MdCurrencyBitcoin className="text-yellow-300" />,
                        label: "Crypto",
                      },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPayMethod(m.id)}
                        style={{
                          flex: 1,
                          padding: "0.6rem",
                          borderRadius: "0.55rem",
                          border: `1px solid ${payMethod === m.id ? "var(--color-primary)" : "var(--color-surface-3)"}`,
                          backgroundColor:
                            payMethod === m.id
                              ? "rgba(249,115,22,0.1)"
                              : "var(--color-surface-3)",
                          color:
                            payMethod === m.id
                              ? "var(--color-primary)"
                              : "var(--color-text-muted)",
                          cursor: "pointer",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          fontFamily: "var(--font-body)",
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.35rem",
                        }}
                      >
                        {m.icon} {m.label}
                      </button>
                    ))}
                  </div>

                  {payMethod === "card" && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.85rem",
                      }}
                    >
                      <Field
                        label="Name on Card"
                        value={payment.cardName}
                        onChange={setP("cardName")}
                        placeholder="John Doe"
                      />
                      <Field
                        label="Card Number"
                        value={payment.cardNum}
                        onChange={(v) => setP("cardNum")(formatCard(v))}
                        placeholder="1234 5678 9012 3456"
                      />
                      <Field
                        label="Expiry Date"
                        value={payment.expiry}
                        onChange={(v) => setP("expiry")(formatExpiry(v))}
                        placeholder="MM/YY"
                        half
                      />
                      <Field
                        label="CVV"
                        value={payment.cvv}
                        onChange={(v) =>
                          setP("cvv")(v.replace(/\D/g, "").slice(0, 4))
                        }
                        placeholder="123"
                        type="password"
                        half
                      />
                    </div>
                  )}

                  {payMethod === "paypal" && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        color: "var(--color-text-muted)",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                      }}
                    >
                      <div
                        style={{ fontSize: "3rem", marginBottom: "0.75rem" }}
                      >
                        <FaPaypal className="text-blue-600 inline" />
                      </div>
                      <p>
                        You will be redirected to PayPal to complete your
                        payment securely.
                      </p>
                    </div>
                  )}

                  {payMethod === "crypto" && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        color: "var(--color-text-muted)",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                      }}
                    >
                      <div
                        style={{ fontSize: "3rem", marginBottom: "0.75rem" }}
                      >
                        <MdCurrencyBitcoin className="text-yellow-500 inline" />
                      </div>
                      <p>
                        Pay with Bitcoin, Ethereum, or other cryptocurrencies.
                      </p>
                    </div>
                  )}
                </Section>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={prevStep}
                    className="btn-ghost"
                    style={{ padding: "0.85rem 1.5rem", fontSize: "0.9rem" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="btn-primary"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      padding: "0.85rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Confirm─ */}
            {step === 2 && (
              <div className="animate-fade-up">
                <Section title="✅ Order Review">
                  {/* Items list */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.85rem",
                        }}
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "contain",
                            borderRadius: "0.5rem",
                            backgroundColor: "#fff",
                            padding: "4px",
                            border: "1px solid var(--color-surface-3)",
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: "0.88rem",
                              fontWeight: 600,
                              color: "var(--color-text)",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.title}
                          </p>
                          <p
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span
                          style={{
                            fontWeight: 700,
                            color: "var(--color-text)",
                            fontSize: "0.9rem",
                            flexShrink: 0,
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping summary */}
                  <div
                    style={{
                      backgroundColor: "var(--color-surface-3)",
                      borderRadius: "0.6rem",
                      padding: "0.85rem",
                      fontSize: "0.82rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    📦 Ships to:{" "}
                    <strong style={{ color: "var(--color-text)" }}>
                      {shipping.address || "—"}, {shipping.city || "—"},{" "}
                      {shipping.state || "—"} {shipping.zip || ""}
                    </strong>
                  </div>
                </Section>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={prevStep}
                    className="btn-ghost"
                    style={{ padding: "0.85rem 1.5rem", fontSize: "0.9rem" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="btn-primary"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      padding: "0.85rem",
                      fontSize: "0.95rem",
                      opacity: placing ? 0.75 : 1,
                      cursor: placing ? "not-allowed" : "pointer",
                      backgroundColor: placing
                        ? "var(--color-success)"
                        : undefined,
                    }}
                  >
                    {placing
                      ? "⏳ Placing Order…"
                      : `Place Order · $${grandTotal.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: compact order summary */}
          <div
            style={{
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-surface-3)",
              borderRadius: "var(--radius-card)",
              padding: "1.25rem",
              position: "sticky",
              top: "84px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "var(--color-text)",
                marginBottom: "1rem",
                paddingBottom: "0.65rem",
                borderBottom: "1px solid var(--color-surface-3)",
              }}
            >
              Your Order ({totalQty})
            </h3>

            {/* Item thumbnails */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                marginBottom: "1rem",
              }}
            >
              {items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt=""
                    style={{
                      width: "36px",
                      height: "36px",
                      objectFit: "contain",
                      borderRadius: "0.4rem",
                      backgroundColor: "#fff",
                      padding: "2px",
                      border: "1px solid var(--color-surface-3)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-text-muted)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-text)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    ×{item.quantity}
                  </span>
                </div>
              ))}
              {items.length > 4 && (
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-faint)",
                    textAlign: "center",
                  }}
                >
                  +{items.length - 4} more items
                </p>
              )}
            </div>

            {/* Totals */}
            {[
              { label: "Subtotal", value: `$${totalPrice.toFixed(2)}` },
              {
                label: "Shipping",
                value:
                  shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`,
              },
              { label: "Tax (8%)", value: `$${tax.toFixed(2)}` },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.82rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.45rem",
                }}
              >
                <span>{label}</span>
                <span
                  style={{
                    color:
                      value === "FREE"
                        ? "var(--color-success)"
                        : "var(--color-text)",
                    fontWeight: 500,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}

            <div
              style={{
                borderTop: "1px solid var(--color-surface-3)",
                paddingTop: "0.75rem",
                marginTop: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 800,
                fontSize: "1rem",
                color: "var(--color-text)",
              }}
            >
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <Link
              to="/cart"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "0.85rem",
                fontSize: "0.78rem",
                color: "var(--color-text-faint)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-faint)")
              }
            >
              ← Edit cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
