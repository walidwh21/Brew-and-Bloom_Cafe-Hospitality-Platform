# Frontend Beginner Guide — Brew & Bloom

**Brew & Bloom** is an **welcoming neighborhood café** (Brew = sweet in Hindi).  
This guide explains the React app in simple terms.

---

## Project Structure

```
frontend/src/
├── config/
│   └── site.js           ← ★ EDIT HERE: name, address, phone, menu links
├── api/                  ← AJAX calls to Laravel (one file per feature)
│   ├── client.js         ← shared axios + auth token
│   ├── auth.js           ← login, register
│   ├── menu.js           ← categories, products
│   ├── orders.js         ← cart checkout
│   ├── reservations.js
│   ├── rewards.js
│   └── admin.js
├── pages/                ← One file = one screen (matches Navbar)
│   ├── Home.jsx          ← lists homepage sections only
│   ├── Menu.jsx, About.jsx, Contact.jsx, ...
│   └── admin/            ← React admin dashboard
├── components/
│   ├── layout/           ← Navbar, Footer, AnnouncementBar
│   ├── HeroSection.jsx   ← homepage sections (one file each)
│   └── GalleryGrid.jsx   ← shared gallery (Home + Gallery page)
├── data/
│   └── galleryItems.js   ← gallery photos & titles
├── context/
│   ├── AuthContext.jsx   ← who is logged in?
│   └── CartContext.jsx   ← shopping cart
└── utils/
    ├── formatPrice.js    ← shows formatted prices
    ├── storage.js        ← save token in browser
    └── ajax.js           ← show API errors
```

---

## Navbar Pages (same on every screen)

| Menu link | File | What it does |
|-----------|------|--------------|
| Home | `pages/Home.jsx` | Homepage sections |
| About | `pages/About.jsx` | Brand story |
| Menu | `pages/Menu.jsx` | All products from API |
| Reservations | `pages/Reservations.jsx` | Book a table |
| Events | `pages/Events.jsx` | Events info |
| Gallery | `pages/Gallery.jsx` | Photo grid |
| Contact | `pages/Contact.jsx` | Address & phone |

**Tip:** Change address/phone once in `config/site.js` — Footer, Contact, and Navbar update automatically.

---

## Homepage Sections (in order)

Open `pages/Home.jsx` — it only imports sections. Edit each file separately:

1. `HeroSection.jsx` — top banner  
2. `SignatureBrews.jsx` — 4 coffee cards  
3. `AboutSection.jsx` — story  
4. `MenuPreviewSection.jsx` — menu tabs  
5. `ReservationSection.jsx` — book table form  
6. `SpecialOffersSection.jsx` — offers slider  
7. `TestimonialsSection.jsx` — reviews  
8. `MembershipSection.jsx` — loyalty club  
9. `ExperienceSection.jsx`, `GallerySection.jsx`, `EventsSection.jsx`, `NewsletterSection.jsx`

---

## Custom AJAX Login

Open `pages/Login.jsx`:

```javascript
e.preventDefault();
const result = await loginUser(form.email, form.password);
saveAuthSession(result.user, result.token);
setUserAfterLogin(result.user);
navigate('/');
```

HTTP call is in `api/auth.js` → backend `routes/api/auth.php`.

---

## API ↔ Backend Map

| Frontend `api/` | Backend `routes/api/` |
|-----------------|----------------------|
| `auth.js` | `auth.php` |
| `menu.js` | `menu.php` |
| `orders.js` | `orders.php` |
| `reservations.js` | `reservations.php` |
| `rewards.js` | `rewards.php` |
| `admin.js` | `admin.php` |

---

## Branding & Prices

- **Brand text:** `config/site.js`  
- **Colours & fonts:** `index.css` → `@theme`  
- **Prices:** use `formatPrice(150)` → `150` from `utils/formatPrice.js`  
- **Do not** hardcode `$` or old address in components — use `SITE` from config

---

## Running the App

```bash
# Terminal 1 — Laravel API
cd backend
php artisan serve

# Terminal 2 — React frontend
cd frontend
npm install
npm run dev
```

- Website: http://localhost:5173  
- API: http://localhost:8000/api  
- Laravel admin (Blade): http://localhost:8000/admin/login  

**Demo login:** `customer@example.com` / `password`  
**Admin:** `admin@example.com` / `password`

---

## React Admin (`/admin`)

| URL | File |
|-----|------|
| `/admin` | `pages/admin/Dashboard.jsx` |
| `/admin/products` | `pages/admin/Products.jsx` |
| `/admin/orders` | `pages/admin/Orders.jsx` |
| `/admin/reservations` | `pages/admin/AdminReservations.jsx` |

Only `role: admin` users can access (see `ProtectedRoute.jsx`).
