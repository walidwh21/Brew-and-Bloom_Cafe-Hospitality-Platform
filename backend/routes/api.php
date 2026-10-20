<?php

/**
 * MAIN API ROUTES FILE
 *
 * Routes are split into small files — one file per frontend section.
 * This makes it easy to find which backend code powers which page.
 *
 * Frontend Page          →  Backend Route File
 * ─────────────────────────────────────────────
 * Login / Register       →  routes/api/auth.php
 * Home / Menu            →  routes/api/menu.php
 * Cart / Orders          →  routes/api/orders.php
 * Reservations           →  routes/api/reservations.php
 * Profile (rewards)      →  routes/api/rewards.php
 * Admin pages            →  routes/api/admin.php
 */

require __DIR__.'/api/auth.php';
require __DIR__.'/api/menu.php';
require __DIR__.'/api/orders.php';
require __DIR__.'/api/reservations.php';
require __DIR__.'/api/rewards.php';
require __DIR__.'/api/content.php';
require __DIR__.'/api/admin.php';
