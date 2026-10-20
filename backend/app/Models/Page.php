<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/** About & Our Story pages — Admin → Pages */
class Page extends Model
{
    protected $fillable = [
        'slug', 'title', 'subtitle', 'lead', 'body',
        'image_1', 'image_2', 'image_3', 'is_active',
    ];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
