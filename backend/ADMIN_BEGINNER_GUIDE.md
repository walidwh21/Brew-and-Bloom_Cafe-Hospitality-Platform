# Admin Panel — Beginner Guide

**URL:** http://localhost:8000/admin/login  
**Login:** admin@example.com / password

This admin panel uses **plain, simple code**. No config files. No magic loops.  
Read one file from top to bottom and you see exactly what happens.

---

## The One Pattern (used everywhere)

Every admin page works the same way:

```
Browser URL  →  routes/web.php  →  Controller  →  Blade view  →  HTML form
                                                      ↓
                                              Database table
```

### Example: Add a gallery photo

1. You open **http://localhost:8000/admin/gallery/create**
2. `routes/web.php` sends you to `GalleryController@create`
3. Controller returns `admin/gallery/create.blade.php` (the HTML form)
4. You click **Save** → form POSTs to `/admin/gallery`
5. `GalleryController@store` saves to `gallery_items` table
6. Redirect back to `/admin/gallery` with "Photo saved!"

---

## Files to read (in this order)

| Step | File | What it does |
|------|------|--------------|
| 1 | `routes/web.php` | Every admin URL listed with comments |
| 2 | `app/Http/Controllers/Admin/GalleryController.php` | Best example — read this first |
| 3 | `resources/views/admin/gallery/index.blade.php` | Table of all photos |
| 4 | `resources/views/admin/gallery/create.blade.php` | Add form (plain HTML inputs) |
| 5 | `app/Models/GalleryItem.php` | Database table name + columns |

Every other section (categories, products, testimonials, etc.) uses **the same 6 functions**:

- `index()` — show list
- `create()` — show empty form
- `store()` — save new row
- `edit($id)` — show form with old data
- `update($id)` — save changes
- `destroy($id)` — delete row

---

## All admin pages

| Page | URL | Controller |
|------|-----|------------|
| Dashboard | `/admin` | `DashboardController` |
| Categories | `/admin/categories` | `CategoryController` |
| Products | `/admin/products` | `ProductController` |
| Coupons | `/admin/coupons` | `CouponController` |
| Orders | `/admin/orders` | `OrderController` |
| Reservations | `/admin/reservations` | `ReservationController` |
| Customers | `/admin/customers` | `CustomerController` |
| Gallery | `/admin/gallery` | `GalleryController` |
| Testimonials | `/admin/testimonials` | `TestimonialController` |
| Events | `/admin/events` | `EventController` |
| About pages | `/admin/pages` | `PageController` |
| Story pillars | `/admin/story` | `StoryController` |
| Contact info | `/admin/contact` | `ContactController` |

---

## Website content tips

- **Gallery** — photos on homepage and gallery page
- **Testimonials** — customer reviews on homepage
- **Events** — live music, workshops, etc.
- **About & Story** (`/admin/pages`) — use slug `about` for homepage, `our-story` for About page
- **Story pillars** — the 3 text blocks in homepage About section
- **Contact** — address, phone, email, hours on Contact page

After you save in admin, the React website at http://localhost:5173 loads data from the API automatically.

---

## How to add a new admin page (copy-paste method)

1. Copy `GalleryController.php` → rename to `MyThingController.php`
2. Copy `resources/views/admin/gallery/` folder → rename to `my-thing/`
3. Add 6 routes in `routes/web.php` (copy gallery routes, change names)
4. Add a link in `resources/views/admin/layouts/app.blade.php` sidebar

No abstractions needed. Duplicated code is OK for learning.

---

## Blade form basics

Every form needs:

```html
<form method="POST" action="/admin/gallery">
    @csrf                          <!-- security token (always include) -->
    <input type="text" name="title">
    <button type="submit">Save</button>
</form>
```

For **edit** and **delete**, add:

```html
@method('PUT')     <!-- for update -->
@method('DELETE')  <!-- for delete -->
```

---

## Run the backend

```bash
cd backend
php artisan migrate --seed
php artisan serve
```

Then open http://localhost:8000/admin/login
