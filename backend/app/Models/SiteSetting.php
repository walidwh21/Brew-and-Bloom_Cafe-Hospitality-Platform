<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/** Brand text (tagline, etc.) — key/value store */
class SiteSetting extends Model
{
    protected $fillable = ['key', 'value'];

    /** Get one setting by key */
    public static function getValue(string $key, ?string $default = null): ?string
    {
        return static::where('key', $key)->value('value') ?? $default;
    }

    /** Save one setting */
    public static function setValue(string $key, ?string $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
