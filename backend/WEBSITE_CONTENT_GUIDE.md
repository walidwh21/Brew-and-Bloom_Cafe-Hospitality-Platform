# Website Content — Updated Guide

> **Note:** The old config-driven system (`website_sections.php` + `WebsiteController`) was removed.  
> Read **`ADMIN_BEGINNER_GUIDE.md`** instead — it explains the simple approach.

Each website section now has its **own controller** and **own views**:

- Gallery → `GalleryController` + `views/admin/gallery/`
- Testimonials → `TestimonialController` + `views/admin/testimonials/`
- Events → `EventController` + `views/admin/events/`
- Pages → `PageController` + `views/admin/pages/`
- Story → `StoryController` + `views/admin/story/`
- Contact → `ContactController` + `views/admin/contact/`

Start with `GalleryController.php` — every other section works the same way.
