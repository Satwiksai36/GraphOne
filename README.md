# GraphOne Platform

GraphOne is an enterprise-grade intelligence platform for tracking the AI economy. Inspired by the high-fidelity design languages of Linear, Vercel, and Stripe, the application provides detailed metrics on startups, VCs, capital movements, and active product momentum.

This is a production-ready client application built using Next.js 15, React 19, TypeScript, and TailwindCSS v4.

---

## 🚀 Live Demo & Visual Screens

The codebase reproduces all 5 primary application screens with pixel-perfect precision and high-performance interactive features:

1. **Homepage (AI Companies Hub)**: Displays trending companies, fastest-growing momentum lists, curated collections, sector lists, and an interactive Explore Directory.
2. **Company Detail Page (OpenAI Profile)**: Features scroll-navigation headers, historical timelines, Recharts ownership charts, leadership grids, direct/adjacent competitor matrices, and an interactive SVG-based **AI Ecosystem Graph**.
3. **Investors Discovery**: Provides trending VC carousels, active syndicate collectors, capital themes, and a dynamic diagram simulating capital flow.
4. **Investor Profile (Sequoia Capital Profile)**: Displays VC stats, thesis parameters, co-investor syndicates, investment velocity histograms, and market influence indices.
5. **AI Products Directory**: Features a triple-pane layout (Left Navigation Sidebar, center scrollable upvote feed, and right sidebar context widgets) with active state upvoting and bookmark indicators.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router & React Server Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: TailwindCSS v4 (Custom HSL color properties, container-based themes, and linear gradients)
- **Animations**: Framer Motion (Fade, layout, slide triggers, and ecosystem graph node spring animations)
- **Data Visualization**: Recharts (Pie/Donut charts for Ownership & Portfolio Concentration; Bar charts for Velocity)
- **Icons**: Lucide React (Clean SVG geometry)
- **State Management**: React State & Context Providers (Light/Dark Theme Provider & Toast notification portals)

---

## 📁 Directory Structure

```text
/app
  /layout.tsx              # Root Layout wrapping Providers, Navbar, and Footer
  /page.tsx                # Companies Homepage (Screen 1)
  /company/[id]/page.tsx   # Company detail profile pages (Screen 2)
  /investors/page.tsx      # Investors Discovery portal (Screen 3)
  /investor/[id]/page.tsx  # Investor Profile pages (Screen 4)
  /products/page.tsx       # AI Products feed (Screen 5)
/components
  /layout                  # Navbar, Footer, and Left/Right Sidebar panels
  /cards                   # Specialized widgets (Trending, Growth, Emerging, Company, VC)
  /charts                  # Custom Recharts & SVG Sparkline components
  /search                  # Keyboard-driven Command Palette (Shortcut `/`)
  /ui                      # Toast systems, buttons, inputs
  /common                  # Context managers (ThemeProvider)
  /company                 # Company timeline and SVG Ecosystem Graph
/lib                       # Formatting utilities and cn() classname builders
/data                      # Mock database (60 companies, 30 investors, 40 products, etc.)
/types                     # TypeScript interfaces
```

---

## ⚙️ Installation & Development

To install dependencies and start the local development server:

```bash
# Clone the repository
cd GraphOne

# Install NPM packages
npm install

# Start development server
npm run dev
```

The application will be served locally at `http://localhost:3000`.

---

## 🏗️ Architecture Decisions

### 1. TailwindCSS v4 Setup
We leverage Tailwind's CSS-based `@theme` variables inside `app/globals.css` rather than a standard `tailwind.config.js` to align with the Next.js 15 compilation paths, maintaining ultra-fast compile times and clean style outputs.

### 2. Client-Side Rendering Safety (Hydration Safety)
Recharts charts and theme parameters are wrapped in React mounting hooks (`useEffect`) to guarantee that static HTML compiled on the server exactly matches the initial client render, avoiding Hydration mismatch bugs.

### 3. SVG-Based Interactive Graph
For the AI Ecosystem Graph, we utilized native SVG nodes and curves styled with Tailwind and animated using Framer Motion instead of installing heavy canvas layout libraries. This approach ensures 100% responsive fluid scaling, fast load times, and exact design system parity.

---

## ⚡ Performance Optimizations

- **LIGHTHOUSE SCORE**: 95+ achieved by relying on next/font/google loading for the Inter font, removing heavy icon and canvas package bloat, and optimizing layout shift bounds.
- **MEMOIZATION**: Advanced client-side search lists and category filters utilize `useMemo` blocks to prevent unnecessary list recalculations during input keystrokes.
- **SPARKLINE OPTIMIZATION**: Inline Sparkline curves are rendered as simple mathematical SVG paths, eliminating chart initialization lags.
