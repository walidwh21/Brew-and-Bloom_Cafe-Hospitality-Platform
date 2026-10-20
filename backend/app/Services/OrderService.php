<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Enums\RewardType;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\RewardTransaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{
    private const TAX_RATE = 0.05;
    private const POINTS_PER_DOLLAR = 1;

    public function create(User $user, array $data): Order
    {
        return DB::transaction(function () use ($user, $data) {
            $items = collect($data['items']);
            $productIds = $items->pluck('product_id');
            $products = Product::whereIn('id', $productIds)->where('is_available', true)->get()->keyBy('id');

            if ($products->count() !== $productIds->unique()->count()) {
                throw ValidationException::withMessages([
                    'items' => ['One or more products are unavailable.'],
                ]);
            }

            $subtotal = 0;
            $orderItems = [];

            foreach ($items as $item) {
                $product = $products[$item['product_id']];
                $quantity = (int) $item['quantity'];
                $lineTotal = round((float) $product->price * $quantity, 2);
                $subtotal += $lineTotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $product->price,
                    'subtotal' => $lineTotal,
                ];
            }

            $discount = 0;
            $coupon = null;

            if (! empty($data['coupon_code'])) {
                $coupon = Coupon::where('code', strtoupper($data['coupon_code']))->first();

                if (! $coupon) {
                    throw ValidationException::withMessages([
                        'coupon_code' => ['Invalid coupon code.'],
                    ]);
                }

                $discount = $coupon->calculateDiscount($subtotal);

                if ($discount <= 0) {
                    throw ValidationException::withMessages([
                        'coupon_code' => ['This coupon cannot be applied to this order.'],
                    ]);
                }
            }

            $tax = round(($subtotal - $discount) * self::TAX_RATE, 2);
            $total = round($subtotal - $discount + $tax, 2);

            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => 'MM-' . strtoupper(uniqid()),
                'status' => OrderStatus::Pending,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'tax' => $tax,
                'total' => $total,
                'coupon_id' => $coupon?->id,
                'payment_method' => $data['payment_method'] ?? 'cash',
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($orderItems as $orderItem) {
                $order->items()->create($orderItem);
            }

            if ($coupon) {
                $coupon->increment('used_count');
            }

            $pointsEarned = (int) floor($total * self::POINTS_PER_DOLLAR);

            if ($pointsEarned > 0) {
                RewardTransaction::create([
                    'user_id' => $user->id,
                    'order_id' => $order->id,
                    'points' => $pointsEarned,
                    'type' => RewardType::Earned,
                    'description' => "Points earned from order {$order->order_number}",
                ]);

                $user->increment('reward_points', $pointsEarned);
            }

            return $order->load(['items.product', 'coupon']);
        });
    }

    public function updateStatus(Order $order, string $status): Order
    {
        $order->update(['status' => $status]);

        return $order->fresh(['items.product', 'user', 'coupon']);
    }
}
