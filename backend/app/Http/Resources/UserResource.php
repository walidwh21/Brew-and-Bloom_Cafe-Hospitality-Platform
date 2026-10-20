<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role?->value ?? $this->role,
            'phone' => $this->phone,
            'avatar' => $this->avatar,
            'address' => $this->address,
            'reward_points' => $this->reward_points,
            'orders_count' => $this->whenCounted('orders'),
            'created_at' => $this->created_at,
        ];
    }
}
