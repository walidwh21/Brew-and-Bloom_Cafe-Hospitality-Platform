<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/** Café events — Admin → Events */
class CafeEvent extends Model
{
    protected $table = 'cafe_events';

    protected $fillable = [
        'title', 'description', 'schedule', 'image', 'icon', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
