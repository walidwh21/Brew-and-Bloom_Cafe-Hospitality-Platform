# How to Access the Backend Admin Dashboard

This is a **browser admin panel** built into Laravel.  
You do **NOT** need React for this — just open your browser.

---

## Step 1: Start Laravel

Open terminal in the backend folder:

```bash
cd d:\xampp\htdocs\laravel\cafe\backend
php artisan serve
```

You should see: `Server running on http://127.0.0.1:8000`

---

## Step 2: Open Admin Login

In your browser go to:

### **http://localhost:8000/admin/login**

(or http://127.0.0.1:8000/admin/login)

---

## Step 3: Log In

| Field | Value |
|-------|-------|
| Email | `admin@example.com` |
| Password | `password` |

Click **Sign In to Admin**.

---

## Step 4: Manage Your Café

After login you will see the **Dashboard** at:

### **http://localhost:8000/admin**

Use the **left sidebar** to:

| Menu | What you can do |
|------|-----------------|
| **Dashboard** | See stats & recent orders |
| **Categories** | Add/edit menu categories |
| **Products** | Add/edit coffee, food, etc. |
| **Orders** | Change order status |
| **Reservations** | Confirm or cancel bookings |
| **Customers** | View customers & add loyalty bonus points |
| **Coupons** | Create, edit & activate discount codes |

### What updates the website automatically

| Admin change | Shows on website |
|--------------|------------------|
| Product marked **Featured** + image URL | Homepage → Signature Brews |
| **Categories** & **Products** | Menu page & Menu Preview section |
| **Active coupons** | Homepage → Special Offers slider |
| All prices | Prices use the configured currency |

---

## Two Admin Panels (don't confuse them!)

| Panel | URL | Technology |
|-------|-----|------------|
| **Backend Admin (this one)** | http://localhost:8000/admin | Laravel Blade — simple forms |
| React Admin (optional) | http://localhost:5173/admin | React frontend — needs `npm run dev` |

**For beginners, use the backend admin at port 8000.**

---

## First time setup

If database is empty:

```bash
cd backend
php artisan migrate --seed
php artisan serve
```

Make sure XAMPP MySQL is running (your `.env` uses database `cafe`).

---

## File locations (if you want to customize)

```
backend/
├── routes/web.php                    ← admin URLs
├── app/Http/Controllers/Admin/       ← admin logic
└── resources/views/admin/            ← admin HTML pages
```

---

## Troubleshooting

**"Wrong email or password"** → Run `php artisan db:seed` to create admin user.

**Page not found** → Make sure `php artisan serve` is running.

**Database error** → Start MySQL in XAMPP, check `.env` DB settings.
