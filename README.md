# Brew & Bloom — Café Management Platform

A full-stack café website and management dashboard built with **Laravel**, **React**, and **Tailwind CSS**. The project includes a public-facing café experience alongside tools for managing products, orders, reservations, coupons, rewards, and site content.

> **Before publishing:** review the license and provenance of every dependency and source file you use. This repository does not include a project-specific license file; do not assume that code without a clear license is automatically reusable. Add a license only when you have the right to do so.

## Highlights

- Responsive café storefront with menu, story, gallery, events, and contact pages
- Customer registration, login, profile, and order history
- Product and category management
- Cart, order processing, coupons, and rewards
- Table reservations
- Admin dashboard for day-to-day operations
- Editable site content and seed data
- Laravel API with Sanctum authentication
- React single-page application with Vite, Tailwind CSS, Framer Motion, and Lucide icons

## Technology

| Area | Stack |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS 4 |
| UI / motion | Framer Motion, Lucide React |
| API | Laravel 12, PHP 8.2+ |
| Authentication | Laravel Sanctum |
| Database | SQLite or MySQL |
| HTTP | Axios |

## Repository layout

```text
.
├── backend/                 # Laravel application and API
│   ├── app/                 # Controllers, models, services, middleware
│   ├── database/            # Migrations, factories, seeders
│   ├── routes/              # API and web routes
│   └── .env.example         # Backend environment template
├── frontend/                # React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── api/             # API client and request helpers
│   │   ├── components/      # Shared UI components
│   │   ├── config/site.js   # Brand, contact details, navigation
│   │   └── pages/           # Public and admin pages
│   └── .env.example         # Frontend environment template
└── README.md
```

## Requirements

- PHP 8.2 or newer
- Composer
- Node.js and npm compatible with the Vite version in `frontend/package.json`
- SQLite (simple local setup) or MySQL

## Local setup

### 1. Configure and start the backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configure the database in `backend/.env`. For a local SQLite database, create the file expected by the Laravel configuration if it does not exist, then run:

```bash
php artisan migrate --seed
php artisan serve
```

The API is typically available at `http://localhost:8000`.

### 2. Configure and start the frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend is typically available at `http://localhost:5173`. Set `VITE_API_URL` in `frontend/.env` if your API uses a different URL.

### 3. Demo access

The database seeder creates local demonstration accounts:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@example.com` | `password` |
| Customer | `customer@example.com` | `password` |

**Local development only:** change these credentials before deploying, and never seed predictable passwords into a public or production environment. The seed data is illustrative and should be replaced with your own menu, contact details, and business content.

## Branding and customization

- **Brand and contact information:** edit `frontend/src/config/site.js`.
- **Display currency:** set `VITE_CURRENCY` in `frontend/.env` to a three-letter ISO currency code (for example `USD`, `EUR`, or `MAD`); the default is `USD`.
- **Browser title and metadata:** edit `frontend/index.html`.
- **Colors and typography:** edit the theme tokens in `frontend/src/index.css`.
- **Products, categories, and demo accounts:** edit the seeders under `backend/database/seeders/`.
- **Business rules:** review the services and API controllers under `backend/app/`.
- **Backend configuration:** use `backend/.env`; do not commit local environment files or secrets.

Replace placeholder address and phone details in the site configuration before presenting the site as a real business. Review the seeded copy and imagery and ensure you have permission to use all assets before deployment.

## Useful commands

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run lint
```

Backend:

```bash
cd backend
php artisan test
php artisan route:list
```

## Security checklist

- Keep `.env` files and credentials out of version control.
- Replace demo passwords and remove demo users before deployment.
- Set `APP_DEBUG=false` in production.
- Configure `APP_URL`, database credentials, CORS, and allowed frontend origins for your deployment.
- Use HTTPS in production and review authentication, authorization, validation, and rate limiting.
- Confirm asset licenses and add appropriate notices before publishing.

## Project status

This repository is a starter foundation. Run the frontend build and backend test suite in your environment before deployment; environment-specific configuration and integration testing may still be required.
