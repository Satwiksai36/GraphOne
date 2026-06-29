<div align="center">
  <br />
  <span style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 16px; background-color: #09090b; border: 1px solid #27272a;">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 18H19 M10 11V18 M14 15V18" stroke="#27272a" stroke-width="1.2" stroke-linecap="round" />
      <path d="M5 17L10 11L14 15L19 7" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="19" cy="7" r="2.5" fill="#f43f5e" />
      <circle cx="19" cy="7" r="1" fill="#09090b" />
    </svg>
  </span>
  <h1 style="border-bottom: none; margin-bottom: 0;">Graph<span style="color: #f43f5e;">One</span></h1>
  <p>The Global Intelligence Layer for the AI Economy</p>
  <br />
</div>

---

**GraphOne** is a production-grade market intelligence platform for tracking the AI economy. Inspired by the high-fidelity design languages of Linear, Vercel, and Stripe, the application provides detailed analytics on startup metrics, VC funding rounds, founder networks, capital flows, and product momentum.

This is a complete full-stack web application consisting of a **Next.js 16** frontend client and a robust **Express.js + Prisma ORM** backend connected to a **Supabase PostgreSQL** instance.

---

## 🛠️ Architecture & Tech Stack

### Frontend Client (`/`)
* **Framework**: Next.js 16 (App Router with dynamic server-rendered segments)
* **Styling**: TailwindCSS v4 (Custom HSL theme tokens, dark mode, linear gradients, and responsive layouts)
* **Animations**: Framer Motion (Ecosystem graphs, layout transitions, and catalog sliders)
* **Data Visualization**: Recharts (Pie/Donut charts for Ownership, Bar charts for Investment Velocity)
* **API Layer**: Axios client with dynamic JWT interception and error formatting

### Backend Server (`/server`)
* **Runtime & Framework**: Node.js, Express, and TypeScript
* **Database**: Supabase PostgreSQL database
* **ORM**: Prisma ORM (Relational schemas, cascaded constraints, indexes, and type-safe Client generation)
* **Caching**: Node-Cache routing middleware with a 5-minute TTL to accelerate queries
* **Documentation**: Interactive OpenAPI/Swagger UI endpoints
* **Security & Logger**: CORS configuration, Helmet header protection, Morgan logger, and Express Rate Limiting

---

## 🚀 Key Features

1. **Explore Directory (Homepage)**: Interactive search and catalog filters across 60+ AI companies, with trending charts and category counts.
2. **Company Profiles**: Timeline events, Recharts capitalization charts, acquisitions, investments, and an interactive **Ecosystem Graph** visualizer.
3. **VC Discovery**: Carousel lists of active syndicates, capital trends, and a capital flow diagram mapping VC-to-startup networks.
4. **Investor Profiles**: Historical deal velocity graphs, lead stats, co-investor syndicates, and market influence metrics.
5. **AI Products Directory**: A split-pane directory with live upvote feeds, tags, search indexing, and profile bookmarks.
6. **Unified Search Command Palette**: Global search index powered by the backend search APIs, triggered with the `/` shortcut.

---

## ⚙️ How to Setup & Run

### 1. Configure the Environment
Create a **`.env`** file inside the **`server`** directory:
```ini
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres.auxdageuzfcraxrvapla:[YOUR-PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?connection_limit=15&pool_timeout=15"
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN=7d
```

### 2. Deploy Schema & Seed Mock Data
From the **`server`** directory, run database pushes and the seed scripts:
```bash
cd server
npm install

# Push database schema tables to Supabase
npx prisma db push

# Generate Prisma Client models
npx prisma generate

# Populate the database with core records
npm run seed
```

### 3. Run the Backend Server
```bash
npm run dev
```
*The API server will listen on `http://localhost:5000` (Swagger docs available at `/api-docs`).*

### 4. Run the Next.js Frontend Client
Open another terminal in the root directory:
```bash
npm install
npm run dev
```
*The user interface will start at `http://localhost:3000`.*
