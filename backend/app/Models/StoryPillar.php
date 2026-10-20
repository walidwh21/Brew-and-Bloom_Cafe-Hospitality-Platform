<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/** About section pillars — Admin → Our Story */
class StoryPillar extends Model
{
    protected $fillable = ['label', 'text', 'sort_order', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
