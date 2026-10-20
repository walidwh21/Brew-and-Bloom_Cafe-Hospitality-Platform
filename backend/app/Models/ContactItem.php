<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/** Contact cards & hours — Admin → Contact */
class ContactItem extends Model
{
    protected $fillable = ['title', 'content', 'type', 'sort_order', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
