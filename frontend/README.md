# Brew & Bloom Frontend

React single-page application powered by Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` in `.env` to the Laravel API base URL (default: `http://localhost:8000/api`).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build
- `npm run lint` — run Oxlint

## Customization

- Brand and contact details: `src/config/site.js`
- Theme tokens and global styles: `src/index.css`
- Page components: `src/pages/`
- Shared UI: `src/components/`

Keep local `.env` files out of version control. Replace placeholder business details and review image usage before deploying.
