<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/** Gallery photos — Admin → Gallery */
class GalleryItem extends Model
{
    protected $fillable = [
        'title', 'category', 'image', 'size', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
