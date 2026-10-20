<?php

namespace App\Services;

use App\Enums\RewardType;
use App\Models\RewardTransaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class RewardService
{
    public function redeem(User $user, int $points, string $description = 'Points redeemed'): User
    {
        if ($points <= 0) {
            throw ValidationException::withMessages([
                'points' => ['Points must be greater than zero.'],
            ]);
        }

        if ($user->reward_points < $points) {
            throw ValidationException::withMessages([
                'points' => ['Insufficient reward points.'],
            ]);
        }

        return DB::transaction(function () use ($user, $points, $description) {
            RewardTransaction::create([
                'user_id' => $user->id,
                'points' => -$points,
                'type' => RewardType::Redeemed,
                'description' => $description,
            ]);

            $user->decrement('reward_points', $points);

            return $user->fresh();
        });
    }

    public function addBonus(User $user, int $points, string $description): User
    {
        return DB::transaction(function () use ($user, $points, $description) {
            RewardTransaction::create([
                'user_id' => $user->id,
                'points' => $points,
                'type' => RewardType::Bonus,
                'description' => $description,
            ]);

            $user->increment('reward_points', $points);

            return $user->fresh();
        });
    }
}
