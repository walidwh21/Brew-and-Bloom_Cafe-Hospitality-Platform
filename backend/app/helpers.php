<?php

/**
 * Simple price helper for Blade admin views.
 * Matches frontend: src/utils/formatPrice.js
 */
if (! function_exists('format_money')) {
    function format_money(float|int|string|null $amount): string
    {
        return '$'.number_format((float) $amount, 0, '.', ',');
    }
}
