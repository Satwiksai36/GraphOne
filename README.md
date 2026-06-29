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
*The application will be served locally at `http://localhost:3000`.*

---

## 📈 Open-Ended Challenge: Trending Score Formula

We compute a dynamic `trendingScore` for each company inside the backend service mapper layer (`mapCompanyToFrontend`). 

### Formula
$$\text{Trending Score} = (\text{views7d} \times 1.5) + (\text{growthRate} \times 2.0) + (\text{productVotes} \times 0.4) + (\text{confidenceScore} \times 15)$$

### Reasoning:
- **`views7d` (1.5x weight)**: Represents immediate user interest and velocity of traffic on the platform.
- **`growthRate` (2.0x weight)**: Heavily weights operational momentum (employee headcount growth velocity), which is the strongest signal of commercial scale.
- **`productVotes` (0.4x weight)**: Factors in developer and community interest in products launched by the company.
- **`confidenceScore` (15x weight)**: Acts as a quality modifier, rewarding verified, high-confidence profiles to prevent unverified entries from spamming the top trending feed.

---

## 🕸️ Graph Database Modeling & Relationship Layer

GraphOne implements a relational-to-graph mapping layer that bridges the **Supabase PostgreSQL** relational tables with the interactive frontend SVG **Ecosystem Graph**:

1. **Relation Modeling**:
   - **Competitors**: Modeled as a self-referential many-to-many relationship on `Company` via the `Competitor` junction table, supporting both direct and adjacent classifications (`isAdjacent: boolean`).
   - **Investors**: Modeled as a many-to-many link between `Company` and `Investor` via the `CompanyInvestor` junction table, categorizing funding round types (e.g. `seed`, `series`, `growth`).
   - **Founders & Products**: Modeled as one-to-many structures mapped dynamically inside the schema.

2. **The 1-Hop Ecosystem API (`GET /api/companies/:slug/graph`)**:
   - The query automatically maps nested relations (co-investors, competitors, founders, and products) of a given target company node, returning a clean graph layout of vertices and connection edges in a single request:
     ```json
     {
       "nodes": [
         { "id": "openai", "label": "OpenAI", "type": "company" },
         { "id": "anthropic", "label": "Anthropic", "type": "competitor" }
       ],
       "links": [
         { "source": "openai", "target": "anthropic", "type": "competitor" }
       ]
     }
     ```

3. **Frontend Vector Projection**:
   - The React ecosystem graph maps these nodes onto dynamic SVG nodes and edges, drawing spring-like animations with Framer Motion, and enabling hover cards for interactive relationship queries.


