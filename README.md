# T-Lab

T-Lab is a full-stack application with a Laravel backend, a Next.js frontend, and a PostgreSQL database.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Laravel, PHP, Composer
- Database: PostgreSQL
- UI libraries: Framer Motion, Lucide React, Recharts
- Testing: PHPUnit

## Project Structure

```text
T-Lab/
├── backend/                 # Laravel backend (deployed to Railway)
│   ├── app/                 # Controllers, models, providers
│   ├── config/              # Laravel configuration
│   ├── database/            # Migrations and seeders
│   ├── public/              # Public entrypoint
│   ├── resources/           # Views, CSS, JS assets
│   ├── routes/              # Backend routes
│   ├── tests/               # Backend tests
│   ├── nixpacks.toml        # Railway build configuration
│   ├── railway.toml         # Railway deployment config
│   ├── .env.example         # Backend env template
│   └── composer.json        # PHP dependencies
├── frontend/                # Next.js frontend (deployed to Vercel)
│   ├── public/              # Static assets
│   ├── src/                 # Pages, components, context, etc.
│   ├── next.config.js       # Next.js config
│   ├── package.json         # Frontend dependencies
│   └── .env.example         # Frontend env template
├── run-dev.bat              # Quick start script for Windows
└── README.md                # Project instructions
```

## Prerequisites

Install these before starting the app locally:

- PHP 8.4+
- Composer
- Node.js 18+
- npm
- PostgreSQL server
- PHP PostgreSQL extension enabled (pdo_pgsql and pgsql)

## Local Development

### PostgreSQL Setup

Create a PostgreSQL database named `t_lab` and make sure your PostgreSQL user is available.

### Quick Start (Windows)

From the project root, run:

```bat
run-dev.bat
```

This opens two terminals:
- Laravel backend at http://127.0.0.1:8000
- Next.js frontend at http://localhost:3000

### Manual Start

Backend:

```bat
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Frontend:

```bat
cd frontend
npm install
npm run dev
```

## Deployment

### Architecture

- **Frontend** → Vercel (Next.js)
- **Backend** → Railway (Laravel + Nixpacks)
- **Database** → Railway PostgreSQL plugin

### Deploy Backend to Railway

1. Create a new project on [Railway](https://railway.app)
2. Add a **PostgreSQL** plugin — Railway will auto-provide `DATABASE_URL`
3. Add a new service → connect your GitHub repository
4. In the service settings, set **Root Directory** to `backend`
5. Add these environment variables in the Railway dashboard:

| Variable | Value |
|----------|-------|
| `APP_KEY` | Generate with `php artisan key:generate --show` |
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `APP_URL` | Your Railway backend URL (e.g. `https://t-lab-backend.up.railway.app`) |
| `FRONTEND_URL` | Your Vercel frontend URL (e.g. `https://t-lab.vercel.app`) |
| `DB_CONNECTION` | `pgsql` |
| `JWT_SECRET` | A random 64-character string |
| `OPENROUTER_API_KEY` | Your OpenRouter API key |
| `RESEND_API_KEY` | Your Resend API key |
| `MAIL_FROM_ADDRESS` | Your verified sender email |

Railway auto-provides `DATABASE_URL` from the PostgreSQL plugin. The backend reads it via `DB_URL=${DATABASE_URL}` in the env config.

### Deploy Frontend to Vercel

1. Import the repo on [Vercel](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Framework preset: **Next.js** (auto-detected)
4. Add this environment variable:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Your Railway backend URL (e.g. `https://t-lab-backend.up.railway.app`) |

5. Deploy

### Important Notes

- The backend CORS config reads `FRONTEND_URL` to allow requests from Vercel. Make sure this matches exactly.
- The backend uses `php artisan serve` on Railway (configured in `railway.toml`).
- Migrations run automatically on each deploy via the `preDeployCommand` in `railway.toml`.

## Test Accounts

| Role | Name | Email | Password |
|------|------|-------|----------|
| Administrator | Nimal Perera | admin1@tlab.com | Admin@123 |
| Administrator | Kasun Fernando | admin2@tlab.com | Admin@123 |
| Project Manager | Chamith Jayasinghe | manager@tlab.com | Manager@123 |
| Team Member | Sahan Wickramasinghe | member@tlab.com | Member@123 |

## Tech Versions

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2.10 | React framework (Pages Router) |
| React | 18.3.1 | UI library |
| TypeScript | 5.5.4 | Type safety |
| Tailwind CSS | 3.4.17 | Utility-first styling |
| Framer Motion | 11.5.4 | Animations |
| Lucide React | 0.522.0 | Icons |
| Recharts | 2.12.7 | Charts/data visualization |
| Sonner | 2.0.1 | Toast notifications |
| Laravel | 13.8 | PHP web framework |
| PHP | 8.4+ | Server-side language |
| JWT Auth | tymon/jwt-auth | Token authentication |
| Laravel Permission | spatie/laravel-permission | RBAC |
| Resend PHP SDK | 1.5+ | Transactional email |
| PHPUnit | 12.5.12 | Testing |
| PostgreSQL | — | Primary database |