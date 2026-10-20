# Frontend Beginner Guide — Brew & Bloom

**URL:** http://localhost:5173  
**Start command:** `cd frontend` then `npm run dev`

This guide explains the React website in simple terms — no advanced patterns.

---

## The One Pattern (used on every page)

```
User opens page  →  Page component loads  →  API call to Laravel  →  Show data
```

### Example: Menu page

1. User visits http://localhost:5173/menu
2. `App.jsx` shows `Menu.jsx` inside `PublicLayout` (navbar + footer)
3. `Menu.jsx` runs `useEffect` → calls `getProducts()` and `getCategories()`
4. Laravel returns JSON → saved in `useState`
5. React re-renders → shows product cards

---

## Files to read first (in order)

| # | File | What it does |
|---|------|--------------|
| 1 | `src/main.jsx` | React starts here |
| 2 | `src/App.jsx` | All URLs / routes listed |
| 3 | `src/pages/Login.jsx` | Best example of form + API |
| 4 | `src/api/auth.js` | AJAX login call |
| 5 | `src/api/client.js` | Shared HTTP client (adds token) |
| 6 | `src/context/AuthContext.jsx` | Who is logged in |
| 7 | `src/pages/Menu.jsx` | Load list + filter + display |

---

## Folder map

```
frontend/src/
  App.jsx              ← all routes
  main.jsx             ← entry point
  pages/               ← one file per page (Home, Menu, Login...)
  components/          ← reusable pieces (ProductCard, Navbar...)
  api/                 ← AJAX calls to Laravel (one file per topic)
  context/             ← shared state (auth, cart)
  utils/               ← small helpers (storage, errors)
```

---

## All customer pages

| Page | File | API used |
|------|------|----------|
| Home | `pages/Home.jsx` | `api/menu.js` |
| Menu | `pages/Menu.jsx` | `api/menu.js` |
| Cart | `pages/Cart.jsx` | `api/orders.js` |
| Login | `pages/Login.jsx` | `api/auth.js` |
| Register | `pages/Register.jsx` | `api/auth.js` |
| Profile | `pages/Profile.jsx` | `api/auth.js`, `api/orders.js` |
| About | `pages/About.jsx` | `api/content.js` |
| Contact | `pages/Contact.jsx` | `api/content.js` |
| Gallery | `pages/Gallery.jsx` | `api/content.js` |

Homepage sections (Gallery, Testimonials, Events, etc.) each load their own data in `components/`.

---

## React basics used in this project

### useState — store data that can change

```jsx
const [products, setProducts] = useState([]);
setProducts(dataFromApi);  // update → page re-renders
```

### useEffect — run code when page loads

```jsx
useEffect(() => {
  async function load() {
    const data = await getProducts();
    setProducts(data);
  }
  load();
}, []);  // empty [] = run once on mount
```

### Props — pass data from parent to child

```jsx
// Parent
<SignatureBrews products={signatureBrews} />

// Child (SignatureBrews.jsx)
export default function SignatureBrews({ products }) { ... }
```

---

## API layer (simple)

Each `api/*.js` file has plain functions:

```js
// api/menu.js
export async function getProducts() {
  const response = await api.get('/products');
  return response.data.data;
}
```

No magic — just `api.get()` or `api.post()` with a URL.

---

## Auth flow (login)

1. User submits login form in `Login.jsx`
2. `loginUser(email, password)` → POST `/api/login`
3. Laravel returns `{ user, token }`
4. `saveAuthSession()` saves to localStorage
5. `setUserAfterLogin()` updates AuthContext
6. Redirect to home or admin

On page refresh, `AuthContext` reads token and calls `/api/me` to restore user.

---

## Cart flow

1. User clicks "Add" on Menu → `addItem(product)` in CartContext
2. Cart saved in localStorage automatically
3. Cart page shows items, totals, checkout
4. `placeOrder()` sends order to Laravel → `clearCart()`

---

## Admin: two options

| Option | URL | Best for |
|--------|-----|----------|
| **Blade admin (recommended for beginners)** | http://localhost:8000/admin | Plain PHP + HTML forms |
| React admin | http://localhost:5173/admin | Same as customer site stack |

Read `backend/ADMIN_BEGINNER_GUIDE.md` for the simpler Blade admin.

React admin pages are in `src/pages/admin/` — same pattern as customer pages but call `api/admin.js`.

---

## How to add a new page

1. Create `src/pages/MyPage.jsx`
2. Add route in `App.jsx`:
   ```jsx
   <Route path="/my-page" element={<PublicLayout><MyPage /></PublicLayout>} />
   ```
3. Add link in `Navbar.jsx`
4. If you need data from Laravel, add a function in `api/` and call it in `useEffect`

---

## Run the project

```bash
# Terminal 1 — Laravel backend
cd backend
php artisan serve

# Terminal 2 — React frontend
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

**Demo login:** admin@example.com / password

---

## What we removed to keep code simple

- No `framer-motion` in main components (plain `<div>` instead)
- No `useMemo` / `useCallback` (plain loops and functions)
- No config-driven components
- Each API function has its own URL (no lookup tables)
- Login uses separate `email` and `password` state (not one `form` object)

Duplicated code is OK — easier to read than clever abstractions.
