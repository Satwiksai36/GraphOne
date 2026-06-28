# GraphOne Backend - Production Express Server

This is the production-grade backend for the GraphOne platform. Built using Node.js, Express, TypeScript, Supabase PostgreSQL, and Prisma ORM.

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase PostgreSQL & Prisma ORM
- **Security**: JWT Authentication, Helmet, CORS, Express Rate Limit, bcryptjs
- **Caching**: Node-Cache (5-minute TTL on stats and trending queries)
- **Validation**: Zod Request Validation schemas
- **Logging**: Morgan HTTP Request Logger & Custom Error Handlers
- **API Docs**: Swagger / OpenAPI 3.0

---

## ⚙️ Installation & Local Setup

### 1. Clone & Install Dependencies
Navigate to the `server` directory and install the packages:

```bash
cd server
npm install
```

### 2. Configure Environment Variables
Copy or rename the `.env` file in the `server` directory and replace the database placeholder with your actual Supabase connection string:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT_ID]:[YOUR_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
JWT_SECRET=your-secure-jwt-secret-key
CORS_ORIGIN=http://localhost:3000
```

### 3. Initialize Prisma Database Client
Apply the schema structure and push it to your Supabase PostgreSQL instance:

```bash
# Push schema structure to PostgreSQL
npx prisma db push

# Generate the type-safe Prisma client
npm run prisma:generate
```

### 4. Seed Database
Execute the database seed script to generate 60 Companies, 30 Investors, 50 Founders, 40 Products, 150 News, 30 Funding Rounds, and 15 Categories:

```bash
npm run seed
```

### 5. Run Local Server
Start the development server with nodemon auto-reloads:

```bash
npm run dev
```

The server will run on `http://localhost:5000` and the interactive OpenAPI documentation will be served at `http://localhost:5000/api-docs`.

---

## 🔒 Default Credentials (Seeded)

- **Admin Account**: `admin@graphone.com` / `Password123`
- **Demo User Account**: `user@graphone.com` / `Password123`

---

## 📂 Deployment

- **Railway / Render**: Connect this folder, set the Build Command to `npm run build` and Start Command to `npm start`. Ensure environment variables (`DATABASE_URL`, `JWT_SECRET`, etc.) are configured.
- **Vercel**: Run `vercel` inside this directory to deploy as Serverless functions using the provided `vercel.json` config.
