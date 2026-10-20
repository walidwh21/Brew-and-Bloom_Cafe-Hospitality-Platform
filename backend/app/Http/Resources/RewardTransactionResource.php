<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RewardTransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'points' => $this->points,
            'type' => $this->type?->value ?? $this->type,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'order_id' => $this->order_id,
        ];
    }
}
