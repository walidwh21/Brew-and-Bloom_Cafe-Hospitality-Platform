<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RewardTransactionResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\RewardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RewardController extends Controller
{
    public function __construct(private RewardService $rewardService) {}

    public function myRewards(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'reward_points' => $user->reward_points,
            'transactions' => RewardTransactionResource::collection(
                $user->rewardTransactions()->latest()->get()
            ),
        ]);
    }

    public function redeem(Request $request): JsonResponse
    {
        $data = $request->validate([
            'points' => ['required', 'integer', 'min:10'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $user = $this->rewardService->redeem(
            $request->user(),
            $data['points'],
            $data['description'] ?? 'Points redeemed'
        );

        return response()->json([
            'message' => 'Points redeemed successfully.',
            'user' => new UserResource($user),
        ]);
    }

    public function addBonus(Request $request, User $user): JsonResponse
    {
        $data = $request->validate([
            'points' => ['required', 'integer', 'min:1'],
            'description' => ['required', 'string', 'max:255'],
        ]);

        $user = $this->rewardService->addBonus($user, $data['points'], $data['description']);

        return response()->json([
            'message' => 'Bonus points added.',
            'user' => new UserResource($user),
        ]);
    }
}
