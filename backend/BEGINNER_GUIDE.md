# Backend Beginner Guide — Brew & Bloom

This guide explains the Laravel API in simple terms.

## How Frontend Talks to Backend

```
React Page  →  AJAX (fetch/axios)  →  Laravel Route  →  Controller  →  Database
```

Example: When user clicks **Sign In** on `Login.jsx`:

1. React sends `POST http://localhost:8000/api/login` with `{ email, password }`
2. Laravel receives it in `routes/api/auth.php`
3. `AuthController@login` checks the database
4. Laravel returns JSON: `{ success, message, data: { user, token } }`
5. React saves the token and shows the user as logged in

---

## Folder Map (matches frontend pages)

| Backend File | Frontend Page |
|---|---|
| `routes/api/auth.php` | Login, Register, Profile |
| `routes/api/menu.php` | Home, Menu |
| `routes/api/orders.php` | Cart, Profile (orders) |
| `routes/api/reservations.php` | Reservations |
| `routes/api/rewards.php` | Profile (rewards) |
| `routes/api/admin.php` | All admin pages |

---

## Key Files Explained

### `routes/api.php`
Main file that loads all route files. Start here to find any API URL.

### `app/Http/Controllers/Api/AuthController.php`
**Read this first!** Login and register logic is written step-by-step with comments.
No hidden magic — you can see exactly what happens.

### `app/Http/Controllers/Api/BaseApiController.php`
All API responses use the same JSON shape:

```json
{
  "success": true,
  "message": "Login successful.",
  "data": { "user": {}, "token": "..." }
}
```

### `app/Models/`
Each model = one database table. `User.php`, `Product.php`, etc.

### `app/Services/`
Business logic for orders and rewards. Keeps controllers short.

---

## Adding a New Feature (example)

Want to add a "Reviews" feature?

1. **Migration** — `php artisan make:migration create_reviews_table`
2. **Model** — `app/Models/Review.php`
3. **Controller** — `app/Http/Controllers/Api/ReviewController.php`
4. **Routes** — add to `routes/api/reviews.php` and include in `api.php`
5. **Frontend** — create `src/api/reviews.js` and a new page

---

## Running the Backend

```bash
cd backend
php artisan migrate --seed    # create tables + demo data
php artisan serve             # start at http://localhost:8000
```

## Demo Login

- Admin: `admin@example.com` / `password`
- Customer: `customer@example.com` / `password`

---

## Admin Dashboard (step by step)

**API:** `GET /api/admin/dashboard`  
**Frontend:** `pages/admin/Dashboard.jsx`

### Request flow

1. Admin is logged in → React sends token in `Authorization: Bearer ...` header
2. `routes/api/admin.php` → middleware checks `auth:sanctum` + `EnsureUserIsAdmin`
3. `DashboardController@index` calls `DashboardService@stats`
4. Service counts rows from `orders`, `users`, `reservations` tables
5. Returns JSON:

```json
{
  "success": true,
  "message": "Dashboard loaded.",
  "data": {
    "stats": {
      "total_orders": 0,
      "today_revenue": 0,
      "total_customers": 1
    },
    "recent_orders": []
  }
}
```

### Key files

| File | What it does |
|------|----------------|
| `routes/api/admin.php` | Defines `/admin/dashboard` URL |
| `DashboardController.php` | Receives request, returns JSON |
| `DashboardService.php` | Counts database records |
| `EnsureUserIsAdmin.php` | Blocks non-admin users (403 error) |

### Test in browser or terminal

After login as admin, open: http://localhost:5173/admin

Or test API directly (replace `YOUR_TOKEN`):

```bash
curl http://localhost:8000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```
