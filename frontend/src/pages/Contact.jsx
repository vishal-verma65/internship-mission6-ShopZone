import { useState } from "react";
import {
  MdAttachEmail,
  MdCall,
  MdLocationPin,
  MdSupportAgent,
} from "react-icons/md";

function FormField({ label, required, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label
        style={{
          fontSize: "0.82rem",
          fontWeight: 600,
          color: error ? "var(--color-danger)" : "var(--color-text-muted)",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--color-primary)", marginLeft: "2px" }}>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: "0.75rem", color: "var(--color-danger)" }}>
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

function inputStyle(focused, error) {
  return {
    width: "100%",
    padding: "0.7rem 0.9rem",
    backgroundColor: "var(--color-surface-3)",
    border: `1px solid ${
      error
        ? "var(--color-danger)"
        : focused
          ? "var(--color-primary)"
          : "transparent"
    }`,
    borderRadius: "0.6rem",
    color: "var(--color-text)",
    fontSize: "0.9rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused && !error ? "0 0 0 3px rgba(249,115,22,0.12)" : "none",
    resize: "none",
  };
}

function ContactCard({ icon, title, value, sub }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "flex-start",
        padding: "1.1rem",
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-surface-3)",
        borderRadius: "var(--radius-card)",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "0.6rem",
          backgroundColor: "rgba(249,115,22,0.1)",
          border: "1px solid rgba(249,115,22,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--color-text-muted)",
            fontWeight: 600,
            marginBottom: "0.2rem",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-text)",
            fontWeight: 500,
          }}
        >
          {value}
        </p>
        {sub && (
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--color-text-faint)",
              marginTop: "0.15rem",
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field) => (val) => setForm((f) => ({ ...f, [field]: val }));

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.subject.trim()) e.subject = "Please choose a subject.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters.";
    return e;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  // Success screen
  if (submitted) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          className="animate-fade-up"
          style={{ textAlign: "center", maxWidth: "440px" }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.6rem",
              color: "var(--color-text)",
              marginBottom: "0.6rem",
            }}
          >
            Message Sent!
          </h2>
          <p
            style={{
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            Thanks,{" "}
            <strong style={{ color: "var(--color-text)" }}>{form.name}</strong>!
            We received your message and will get back to you at{" "}
            <strong style={{ color: "var(--color-primary)" }}>
              {form.email}
            </strong>{" "}
            within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", subject: "", message: "" });
            }}
            className="btn-ghost"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container-page">
        {/* Page header─ */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--color-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}
          >
            Get In Touch
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.025em",
              marginBottom: "0.6rem",
            }}
          >
            We'd love to hear from you
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--color-text-muted)",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Have a question, feedback, or just want to say hello? Fill out the
            form and we'll get back to you shortly.
          </p>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="contact-layout"
        >
          {/* Contact form */}
          <div
            style={{
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-surface-3)",
              borderRadius: "1.25rem",
              padding: "clamp(1.5rem, 4vw, 2rem)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.15rem",
                color: "var(--color-text)",
                marginBottom: "1.5rem",
              }}
            >
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
              }}
            >
              {/* Name + Email row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
                className="form-row"
              >
                <FormField label="Full Name" required error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder="John Doe"
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    style={inputStyle(focused === "name", errors.name)}
                  />
                </FormField>
                <FormField label="Email Address" required error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    placeholder="you@example.com"
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    style={inputStyle(focused === "email", errors.email)}
                  />
                </FormField>
              </div>

              {/* Subject */}
              <FormField label="Subject" required error={errors.subject}>
                <select
                  value={form.subject}
                  onChange={(e) => set("subject")(e.target.value)}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused("")}
                  style={{
                    ...inputStyle(focused === "subject", errors.subject),
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select a topic…</option>
                  <option value="order">Order Issue</option>
                  <option value="return">Returns & Refunds</option>
                  <option value="product">Product Question</option>
                  <option value="shipping">Shipping Info</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </FormField>

              {/* Message */}
              <FormField label="Message" required error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder="Tell us how we can help…"
                  rows={5}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  style={inputStyle(focused === "message", errors.message)}
                />
                <span
                  style={{
                    fontSize: "0.72rem",
                    color:
                      form.message.length < 20
                        ? "var(--color-text-faint)"
                        : "var(--color-success)",
                    alignSelf: "flex-end",
                    marginTop: "-0.2rem",
                  }}
                >
                  {form.message.length} / 20+ chars
                </span>
              </FormField>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{
                  justifyContent: "center",
                  padding: "0.8rem",
                  fontSize: "0.95rem",
                  opacity: loading ? 0.75 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                  marginTop: "0.25rem",
                }}
              >
                {loading ? "⏳ Sending…" : "Send Message →"}
              </button>
            </form>
          </div>

          {/* Right: info + FAQ─ */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <ContactCard
              icon=<MdAttachEmail className="text-yellow-200" />
              title="Email Us"
              value="support@shopzone.com"
              sub="We reply within 24 hours"
            />
            <ContactCard
              icon=<MdCall className="text-red-400" />
              title="Call Us"
              value="+1 (800) 555-0100"
              sub="Mon–Fri, 9am–6pm EST"
            />
            <ContactCard
              icon=<MdLocationPin className="text-blue-300" />
              title="Visit Us"
              value="123 Commerce St."
              sub="New York, NY 10001"
            />
            <ContactCard
              icon=<MdSupportAgent className="text-green-200" />
              title="Support Hours"
              value="24 / 7 Online Chat"
              sub="Always here to help"
            />

            {/* FAQ mini block */}
            <div
              style={{
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-surface-3)",
                borderRadius: "var(--radius-card)",
                padding: "1.25rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--color-text)",
                  marginBottom: "0.85rem",
                }}
              >
                Quick Answers
              </h3>
              {[
                {
                  q: "How long does shipping take?",
                  a: "3–7 business days standard, 1–2 days express.",
                },
                {
                  q: "Can I return a product?",
                  a: "30-day hassle-free returns on all orders.",
                },
                {
                  q: "Is my payment secure?",
                  a: "Yes — all transactions are SSL encrypted.",
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  style={{
                    padding: "0.65rem 0",
                    borderBottom: "1px solid var(--color-surface-3)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {q}
                  </p>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
