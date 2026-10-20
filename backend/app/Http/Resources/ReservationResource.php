<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'guests' => $this->guests,
            'reservation_date' => $this->reservation_date?->format('Y-m-d'),
            'reservation_time' => $this->reservation_time,
            'status' => $this->status?->value ?? $this->status,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
