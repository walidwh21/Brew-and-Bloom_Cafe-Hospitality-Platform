<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/** Customer reviews — Admin → Testimonials */
class Testimonial extends Model
{
    protected $fillable = [
        'name', 'role', 'review', 'photo', 'rating', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
