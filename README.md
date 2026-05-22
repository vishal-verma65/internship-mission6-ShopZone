<div align="center">

# 🛍️ ShopZone

### A Modern Full-Featured E-Commerce Single Page Application

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![CSS](https://img.shields.io/badge/CSS-Custom_Properties-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.2-FF6B35?style=for-the-badge)](https://zustand-demo.pmnd.rs)
[![React Router](https://img.shields.io/badge/React_Router-6.28-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com)

_Shop Smarter, Live Better._

</div>

---

Live link : https://internship-mission6-shop-zone.vercel.app/

Home page ScreenShot
<img width="1917" height="883" alt="image" src="https://github.com/user-attachments/assets/e91bb868-3acc-439c-97f4-41e9123198b6" />




## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Styling Approach](#-styling-approach)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Pages & Routes](#-pages--routes)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Theme System](#-theme-system)
- [Component Reference](#-component-reference)
- [Design System](#-design-system)
- [localStorage Persistence](#-localstorage-persistence)
- [Authentication Flow](#-authentication-flow)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**ShopZone** is a production-structured, fully responsive e-commerce frontend built as a Single Page Application. It features real-world SPA architecture with dynamic client-side routing, protected routes, Zustand-powered global state, persistent cart/auth across page refreshes, a dark/light theme toggle, and a hand-crafted CSS design system — all without a single page reload.

Styling is done entirely with **vanilla CSS** — using CSS Custom Properties (variables) for the design system, inline `style` props in JSX for component-level styles, and a global `index.css` file for reusable utility classes, keyframe animations, and theme switching. No CSS framework or utility library is used.

The app consumes live product data from the [DummyJSON Products API](https://dummyjson.com/products) and simulates a complete shopping experience from product discovery through to checkout.

---

## 🚀 Live Demo

> Clone the repo, run `npm install && npm run dev`, and visit `http://localhost:5173`

---

## ✨ Features

### 🛒 Shopping Experience

- Browse **100+ real products** fetched from DummyJSON API
- **Product image gallery** with clickable thumbnails on detail pages
- **Quantity selector** on product detail page (capped to stock level)
- **Add to Cart** with instant visual feedback ("✓ Added!")
- **Discount badges** auto-calculated from API's `discountPercentage` field
- **"In Cart" indicator** shown on product cards already added

### 🔍 Shop & Discovery

- **Live search** — filters products by title, description, and category as you type
- **Category filter** — dropdown populated from the API's `/categories` endpoint
- **Sort options** — price (low→high, high→low), rating (best first), name (A→Z)
- **URL-driven category** — `/shop?category=smartphones` pre-selects the filter
- **Result count** — always shows how many products match current filters

### 🛍️ Cart Management

- **Add, remove, and update quantity** for any product
- **Animated item removal** — items fade and slide out before being removed
- **Quantity stepper** — decrementing to 0 removes the item gracefully
- **Order summary** with subtotal, dynamic shipping (free over $50), 8% tax, and grand total
- **Free shipping nudge** — shows exactly how much more to spend
- **Clear cart** with confirmation dialog

### 🔒 Authentication & Security

- **Mock login system** — email/password form or one-click "Guest" login
- **Protected routes** — `/checkout` requires authentication
- **Redirect after login** — remembers where the user was going and returns them there
- **Persistent session** — login survives hard refresh via localStorage
- **Logout** clears both auth state and cart

### 📦 Checkout (3-Step Wizard)

- **Step 1 — Shipping**: Full address form, pre-filled from auth user data
- **Step 2 — Payment**: Card (with live formatting), PayPal, or Crypto tabs
- **Step 3 — Confirm**: Order review with item list, shipping address summary
- **Animated step bar** with completed/active/pending states
- **Sticky order summary** panel throughout all steps

### 🎨 UI & Theme

- **Dark / Light theme toggle** — persisted in localStorage, applied via CSS custom properties
- **Smooth theme transition** — all colors cross-fade over 350ms
- **Mobile-responsive** — hamburger nav, stacked layouts, touch-friendly
- **Skeleton loading screens** — shimmer placeholders match actual card layout
- **Empty states** — contextual messages for cart, search, errors, and categories
- **Animated hero section** — entrance animations, floating badges, animated stat counters
- **Staggered product grid** — cards cascade in with 40ms per-card delay

### 📬 Contact Page

- Full form with **real-time validation** — name, email format, subject, 20-char min message
- **Live character counter** on message field
- **Success screen** with personalised confirmation message
- Contact info cards + Quick FAQ section

---

## 🧰 Tech Stack

| Technology                                   | Version | Purpose                                                        |
| -------------------------------------------- | ------- | -------------------------------------------------------------- |
| [React](https://react.dev)                   | 18.3.1  | UI library — functional components + hooks                     |
| [Vite](https://vitejs.dev)                   | 6.0.5   | Build tool — instant HMR dev server                            |
| [React Router DOM](https://reactrouter.com)  | 6.28    | Client-side routing — no page reloads                          |
| [Zustand](https://github.com/pmndrs/zustand) | 5.0.2   | Global state — cart, auth, theme                               |
| **Vanilla CSS**                              | Native  | Inline styles + CSS custom properties + global utility classes |
| [DummyJSON API](https://dummyjson.com)       | —       | Mock product data source                                       |

> **Zero CSS frameworks or UI libraries.** No Tailwind, no Bootstrap, no MUI, no styled-components — all styling is hand-written using native CSS and React's inline `style` prop.

---

## 🎨 Styling Approach

ShopZone uses a **two-layer CSS architecture** — no CSS framework of any kind.

### Layer 1 — Global `index.css`

The `src/index.css` file is the foundation of the design system. It contains:

**CSS Custom Properties (Design Tokens)**
All colors, fonts, spacing, radius, and shadow values are defined as CSS variables on `:root` (dark theme) and overridden under `[data-theme="light"]` for light mode:

```css
:root {
  --color-surface: #0f0f0f;
  --color-surface-2: #1a1a1a;
  --color-text: #f5f5f5;
  --color-primary: #f97316;
  --font-display: "Syne", sans-serif;
  --font-body: "DM Sans", sans-serif;
  --radius-card: 1rem;
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  /* ...and more */
}

[data-theme="light"] {
  --color-surface: #f8f8f8;
  --color-surface-2: #ffffff;
  --color-text: #111111;
  /* ...overrides only what changes */
}
```

**Reusable Utility Classes**
A small set of shared CSS classes are defined globally and used directly in JSX via `className`:

```css
.btn-primary {
  /* orange CTA button with hover lift */
}
.btn-ghost {
  /* outlined button with orange hover */
}
.btn-danger {
  /* red outlined button for destructive actions */
}
.card {
  /* dark surface card with hover glow + lift */
}
.container-page {
  /* max-width 1280px centered wrapper */
}
.badge {
  /* cart count circle — absolute positioned */
}
.skeleton {
  /* shimmer animation for loading states */
}
.animate-fade-up {
  /* entrance animation: fade + translateY */
}
.theme-toggle {
  /* icon button for dark/light switch */
}
```

**Keyframe Animations**

```css
@keyframes fadeUp {
  /* slide-up entrance used across all pages */
}
@keyframes shimmer {
  /* loading skeleton shimmer effect */
}
@keyframes floatOrb {
  /* hero orb bobbing animation */
}
@keyframes spin {
  /* loading spinner rotation */
}
@keyframes pulse {
  /* pulsing dot in navbar badge */
}
```

---

### Layer 2 — Inline `style` Props in JSX

All component-level and layout styles are written as JavaScript objects passed directly to React's `style` prop. This gives each component full control over its own styles without needing separate CSS files or class naming conventions:

```jsx
// Example from ProductCard.jsx
<div style={{
  backgroundColor: 'var(--color-surface-2)',   // ← uses a CSS variable
  border:          '1px solid var(--color-border)',
  borderRadius:    'var(--radius-card)',
  padding:         '1rem',
  display:         'flex',
  flexDirection:   'column',
  gap:             '0.5rem',
  transition:      'transform 0.25s var(--ease-smooth)',
}}>
```

**Hover and focus effects** that can't be expressed in static inline styles are handled with `onMouseEnter` / `onMouseLeave` / `onFocus` / `onBlur` event handlers:

```jsx
<button
  onMouseEnter={e => {
    e.currentTarget.style.borderColor = 'var(--color-primary)'
    e.currentTarget.style.color = 'var(--color-primary)'
  }}
  onMouseLeave={e => {
    e.currentTarget.style.borderColor = 'var(--color-border)'
    e.currentTarget.style.color = 'var(--color-text-muted)'
  }}
>
```

**Responsive breakpoints** that require media queries are injected via `<style>` tags rendered inside the component itself:

```jsx
<style>{`
  @media (max-width: 768px) {
    .product-layout { grid-template-columns: 1fr !important; }
  }
`}</style>
```

---

### Why This Approach?

| Decision                           | Reason                                                                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| CSS custom properties for tokens   | Single source of truth for all colors/fonts — swapping the entire theme is just flipping one `data-theme` attribute                |
| Inline styles for components       | No class name collisions, styles live next to the JSX they describe, no build-time dependency                                      |
| Global classes only for reusables  | Buttons, cards, and animations are used everywhere — a global class is cleaner than repeating identical inline objects             |
| `onMouseEnter`/`Leave` for hover   | Inline styles can't express `:hover` — event handlers are the React-idiomatic alternative without needing a CSS file per component |
| Injected `<style>` for breakpoints | Media queries can't be written in inline styles — injecting them directly in the component keeps responsive logic co-located       |

---

## 📁 Project Structure

```
shopzone/
│
├── index.html                  # Vite HTML shell — mounts React at #root
├── vite.config.js              # Vite + React plugin config
├── package.json                # Dependencies & npm scripts
├── .gitignore
│
├── public/
│   └── favicon.svg             # Brand icon (SVG, scales perfectly)
│
└── src/
    ├── main.jsx                # React entry point — createRoot()
    ├── App.jsx                 # BrowserRouter + all Routes + Layout wrapper
    ├── index.css               # Global CSS: custom properties, utility classes, animations
    │
    ├── api/
    │   └── products.js         # All DummyJSON fetch calls — separated from UI
    │
    ├── store/
    │   ├── cartStore.js        # Zustand: cart items, qty, price, add/remove/clear
    │   ├── authStore.js        # Zustand: isAuthenticated, user, login, logout
    │   └── themeStore.js       # Zustand: theme (dark/light), toggle, DOM apply
    │
    ├── components/
    │   ├── Navbar.jsx          # Sticky header, nav links, cart badge, theme toggle
    │   ├── Footer.jsx          # Site footer with link groups and social icons
    │   ├── HeroSection.jsx     # Animated landing hero with stat counters
    │   ├── ProductCard.jsx     # Individual product card with add-to-cart
    │   ├── ProductGrid.jsx     # Responsive CSS Grid wrapper for ProductCard list
    │   ├── CartItem.jsx        # Single cart row — qty stepper, remove animation
    │   ├── Loader.jsx          # Spinner, SkeletonCard, SkeletonGrid, PageLoader
    │   ├── EmptyState.jsx      # Zero-data UI — cart empty, no results, errors
    │   └── ProtectedRoute.jsx  # Route guard — redirects to /login if not authed
    │
    └── pages/
        ├── Home.jsx            # Landing page: hero + categories + featured + why us
        ├── Shop.jsx            # Product listing: search + filter + sort + grid
        ├── ProductDetail.jsx   # Full product: gallery + info + qty + add to cart
        ├── Cart.jsx            # Cart items + order summary + checkout CTA
        ├── Login.jsx           # Guest login + email form + redirect-after-login
        ├── Contact.jsx         # Validated contact form + info cards + FAQ
        └── Checkout.jsx        # 3-step wizard: shipping → payment → confirm
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher (comes with Node.js)

Check your versions:

```bash
node --version   # should be >= 18
npm --version    # should be >= 9
```

### Installation

```bash
# 1. Clone or download the project
git clone https://github.com/yourusername/shopzone.git
cd shopzone

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser. The app hot-reloads on every file save.

---

## 📜 Available Scripts

| Command           | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `npm run dev`     | Start development server at `http://localhost:5173` with HMR |
| `npm run build`   | Build optimised production bundle to `/dist`                 |
| `npm run preview` | Serve the production build locally to test before deploying  |

---

## 🗺️ Pages & Routes

| Route                    | Page            | Access        | Description                                                    |
| ------------------------ | --------------- | ------------- | -------------------------------------------------------------- |
| `/`                      | `Home`          | Public        | Hero section, category grid, featured products, why-us section |
| `/shop`                  | `Shop`          | Public        | Full product listing with search, filter by category, sort     |
| `/shop?category=laptops` | `Shop`          | Public        | Pre-filtered category view (URL-driven)                        |
| `/product/:id`           | `ProductDetail` | Public        | Full product info, image gallery, add to cart                  |
| `/cart`                  | `Cart`          | Public        | Cart items, quantity management, order summary                 |
| `/login`                 | `Login`         | Public        | Mock authentication — guest login or email form                |
| `/contact`               | `Contact`       | Public        | Validated contact form + info cards                            |
| `/checkout`              | `Checkout`      | **Protected** | 3-step order wizard — requires login                           |
| `*`                      | 404             | Public        | Inline not-found page with link home                           |

> **Protected routes** use the `<ProtectedRoute>` component. Unauthenticated users are redirected to `/login` with the original destination saved, then returned there after login.

---

## 🗄️ State Management

ShopZone uses **Zustand** for all global state. Three separate stores, all with `persist` middleware for localStorage hydration.

### `cartStore.js`

```js
// State
items; // Array of { id, title, price, thumbnail, category, quantity }
totalQty; // Sum of all item quantities
totalPrice; // Sum of price × quantity for all items

// Actions
addToCart(product); // Add new item or increment existing
removeFromCart(productId); // Remove item entirely
updateQuantity(id, qty); // Set exact quantity (removes if qty <= 0)
clearCart(); // Empty the entire cart
```

### `authStore.js`

```js
// State
isAuthenticated; // boolean
user; // { name, email } | null

// Actions
login(userData); // Set authenticated + store user object
logout(); // Clear auth state
```

### `themeStore.js`

```js
// State
theme; // 'dark' | 'light'

// Actions
toggleTheme(); // Flip between dark and light + update DOM
setTheme(theme); // Explicitly set theme + update DOM
initTheme(); // Restore persisted theme to DOM on app mount
```

**Usage in any component — no Provider needed:**

```jsx
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";

// Selector pattern — component only re-renders when this value changes
const totalQty = useCartStore((s) => s.totalQty);
const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
const { toggleTheme, theme } = useThemeStore();
```

---

## 🌐 API Integration

All network calls live in `src/api/products.js` — **never** inside components.

### Base URL

```
https://dummyjson.com
```

### Available Functions

| Function                        | Endpoint                       | Used By       |
| ------------------------------- | ------------------------------ | ------------- |
| `fetchAllProducts(limit, skip)` | `GET /products?limit=100`      | Shop, Home    |
| `fetchProductById(id)`          | `GET /products/:id`            | ProductDetail |
| `fetchProductsByCategory(slug)` | `GET /products/category/:slug` | Future use    |
| `fetchCategories()`             | `GET /products/categories`     | Shop, Home    |
| `searchProducts(query)`         | `GET /products/search?q=...`   | Future use    |

### Error Handling Pattern

```js
// Every function throws a descriptive error on non-2xx responses
if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
```

Components catch these errors and render `<EmptyState icon="error" onRetry={...} />`.

---

## 🎨 Theme System

ShopZone supports **dark mode** (default) and **light mode**, switchable via the sun/moon toggle in the Navbar.

### How It Works

1. **CSS Custom Properties** for all colors are defined in `index.css`
2. **Dark theme** — default values set on `:root`
3. **Light theme** — overrides set on `[data-theme="light"]` selector
4. **`themeStore`** toggles the `data-theme` attribute on `document.documentElement`
5. **Persisted** to `localStorage` under key `"shopzone-theme"` — survives refresh
6. **`initTheme()`** called on app mount to re-apply the saved theme to the DOM before first render
7. **Smooth transitions** — `body`, `header`, `input`, `.card` etc. all have `transition: background-color 0.3s, color 0.3s`

### Theme CSS Variable Table

| CSS Variable         | Dark Value                     | Light Value                   |
| -------------------- | ------------------------------ | ----------------------------- |
| `--color-surface`    | `#0f0f0f`                      | `#f8f8f8`                     |
| `--color-surface-2`  | `#1a1a1a`                      | `#ffffff`                     |
| `--color-surface-3`  | `#242424`                      | `#f0f0f0`                     |
| `--color-text`       | `#f5f5f5`                      | `#111111`                     |
| `--color-text-muted` | `#a3a3a3`                      | `#555555`                     |
| `--color-text-faint` | `#525252`                      | `#999999`                     |
| `--color-border`     | `#2a2a2a`                      | `#e0e0e0`                     |
| `--shadow-card`      | `0 16px 40px rgba(0,0,0,0.45)` | `0 8px 32px rgba(0,0,0,0.10)` |
| `--color-primary`    | `#f97316`                      | `#f97316` _(unchanged)_       |
| `--color-success`    | `#22c55e`                      | `#22c55e` _(unchanged)_       |
| `--color-danger`     | `#ef4444`                      | `#ef4444` _(unchanged)_       |

---

## 🧩 Component Reference

### Layout Components

| Component        | Props      | Description                                                         |
| ---------------- | ---------- | ------------------------------------------------------------------- |
| `Navbar`         | —          | Sticky header with nav links, cart badge, theme toggle, auth button |
| `Footer`         | —          | Full footer with link groups, social icons, copyright               |
| `ProtectedRoute` | `children` | Renders children if authenticated, else redirects to `/login`       |

### Product Components

| Component     | Props                    | Description                                                   |
| ------------- | ------------------------ | ------------------------------------------------------------- |
| `ProductCard` | `product`                | Card with image, title, price, rating, add-to-cart button     |
| `ProductGrid` | `products`, `searchTerm` | CSS Grid of ProductCards with stagger animation + empty state |

### Cart Components

| Component  | Props  | Description                                                  |
| ---------- | ------ | ------------------------------------------------------------ |
| `CartItem` | `item` | Cart row with image, info, quantity stepper, animated remove |

### UI Utility Components

| Component     | Props                                               | Description                                               |
| ------------- | --------------------------------------------------- | --------------------------------------------------------- |
| `Loader`      | `variant`, `count`, `message`                       | `"page"` \| `"grid"` \| `"spinner"` loading variants      |
| `EmptyState`  | `icon`, `title`, `description`, `action`, `onRetry` | Zero-data / error UI                                      |
| `HeroSection` | —                                                   | Animated full-viewport landing section with stat counters |

### Loader Variants

```jsx
<Loader variant="grid"    count={8} />              // Skeleton shimmer product grid
<Loader variant="page"    message="Loading…" />     // Centered spinner + message
<Loader variant="spinner" />                        // Inline spinning arc only
```

### EmptyState Presets

```jsx
<EmptyState icon="cart"   title="Your cart is empty"   action={{ label: 'Shop Now', to: '/shop' }} />
<EmptyState icon="search" title="No results found"     description="Try a different term" />
<EmptyState icon="error"  title="Something went wrong" onRetry={() => refetch()} />
<EmptyState icon="box"    title="No products here" />
```

---

## 🎨 Design System

### Brand Colors

| CSS Variable            | Value     | Usage                                               |
| ----------------------- | --------- | --------------------------------------------------- |
| `--color-primary`       | `#f97316` | Brand orange — buttons, accents, badges, highlights |
| `--color-primary-dark`  | `#ea580c` | Button hover/active state                           |
| `--color-primary-light` | `#fed7aa` | Subtle tinted backgrounds                           |
| `--color-success`       | `#22c55e` | In-cart indicator, free shipping, positive states   |
| `--color-danger`        | `#ef4444` | Remove buttons, error messages, low stock warning   |

### Typography

Google Fonts are imported in `index.css`:

| Font        | Weights            | Usage                                                   |
| ----------- | ------------------ | ------------------------------------------------------- |
| **Syne**    | 600, 700, 800      | `--font-display` — headings, titles, logo, prices       |
| **DM Sans** | 300, 400, 500, 600 | `--font-body` — body copy, labels, inputs, descriptions |

### Global CSS Utility Classes

Defined in `index.css`, used via `className` in JSX:

| Class              | What it does                                                     |
| ------------------ | ---------------------------------------------------------------- |
| `.btn-primary`     | Orange filled button — hover lifts + orange glow shadow          |
| `.btn-ghost`       | Outlined button — hover turns orange border + text               |
| `.btn-danger`      | Red outlined button — for destructive actions like remove/delete |
| `.card`            | Surface-2 background card — hover lifts + orange border glow     |
| `.container-page`  | Centered layout wrapper, max-width 1280px, horizontal padding    |
| `.badge`           | Absolute-positioned orange pill — used for cart item count       |
| `.skeleton`        | Animated shimmer effect for loading placeholders                 |
| `.animate-fade-up` | `fadeUp` keyframe — fade in while sliding up 20px                |
| `.theme-toggle`    | Square icon button for the dark/light theme switch               |

### Spacing & Radius

| CSS Variable    | Value                          | Usage                          |
| --------------- | ------------------------------ | ------------------------------ |
| `--radius-card` | `1rem`                         | All card components            |
| `--radius-btn`  | `0.6rem`                       | All buttons                    |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | All transitions and animations |

---

## 💾 localStorage Persistence

Three keys are written to `localStorage` automatically by Zustand's `persist` middleware:

| Key              | Store        | Saved Data                        |
| ---------------- | ------------ | --------------------------------- |
| `shopzone-cart`  | `cartStore`  | `{ items, totalQty, totalPrice }` |
| `shopzone-auth`  | `authStore`  | `{ isAuthenticated, user }`       |
| `shopzone-theme` | `themeStore` | `{ theme }`                       |

The `partialize` option on each store ensures **only data fields are persisted** — not the action functions. State is automatically rehydrated on every page load, so cart contents, login session, and theme preference all survive hard refresh.

---

## 🔐 Authentication Flow

ShopZone uses **mock authentication** — no real backend required.

```
User visits /checkout directly OR clicks "Checkout" in Cart
          │
          ├── isAuthenticated = true
          │       └──→  render <Checkout /> normally
          │
          └── isAuthenticated = false
                  └──→  <Navigate to="/login" state={{ from: '/checkout' }} replace />
                                │
                         User sees Login page
                                │
                         Clicks "Guest Login" or submits email form
                                │
                         login() → Zustand auth state updated → persisted to localStorage
                                │
                         navigate(from) → back to /checkout ✓
```

The `ProtectedRoute` component guards the route at the router level — even direct URL bar access to `/checkout` redirects correctly.

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Contribution Ideas

- [ ] Real backend integration (Node.js / Supabase / Firebase)
- [ ] Product reviews and ratings submission
- [ ] Wishlist / saved items feature
- [ ] Order history page
- [ ] Email notifications (SendGrid / Resend)
- [ ] Payment gateway (Stripe)
- [ ] Search with debounce (300ms delay)
- [ ] Infinite scroll / pagination on Shop page
- [ ] PWA support (service worker + manifest)
- [ ] Unit tests (Vitest + React Testing Library)
- [ ] Migrate styles to CSS Modules for better scalability

---

## 📄 License

This project is licensed under the **MIT License** — free to use for personal or commercial projects.

```
MIT License

Copyright (c) 2025 ShopZone

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

Built with ❤️ using React, Vite, Zustand & Vanilla CSS

**[⬆ Back to Top](#️-shopzone)**

</div>
