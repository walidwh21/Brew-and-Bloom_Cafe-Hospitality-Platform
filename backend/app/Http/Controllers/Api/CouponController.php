<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CouponResource;
use App\Models\Coupon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => CouponResource::collection(Coupon::latest()->get()),
        ]);
    }

    /**
     * GET /api/coupons/active
     * Public — homepage Special Offers section loads active coupons from here.
     */
    public function active(): JsonResponse
    {
        $coupons = Coupon::where('is_active', true)->latest()->limit(6)->get();

        return response()->json([
            'data' => CouponResource::collection($coupons),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateCoupon($request);
        $data['code'] = strtoupper($data['code']);

        $coupon = Coupon::create($data);

        return response()->json([
            'message' => 'Coupon created successfully.',
            'data' => new CouponResource($coupon),
        ], 201);
    }

    public function validateCode(Request $request): JsonResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string'],
            'subtotal' => ['required', 'numeric', 'min:0'],
        ]);

        $coupon = Coupon::where('code', strtoupper($data['code']))->first();

        if (! $coupon || ! $coupon->isValidFor((float) $data['subtotal'])) {
            return response()->json([
                'valid' => false,
                'message' => 'This coupon is not valid for your order.',
            ]);
        }

        return response()->json([
            'valid' => true,
            'discount' => $coupon->calculateDiscount((float) $data['subtotal']),
            'coupon' => new CouponResource($coupon),
        ]);
    }

    public function update(Request $request, Coupon $coupon): JsonResponse
    {
        $data = $this->validateCoupon($request, true);

        if (isset($data['code'])) {
            $data['code'] = strtoupper($data['code']);
        }

        $coupon->update($data);

        return response()->json([
            'message' => 'Coupon updated successfully.',
            'data' => new CouponResource($coupon->fresh()),
        ]);
    }

    public function destroy(Coupon $coupon): JsonResponse
    {
        $coupon->delete();

        return response()->json(['message' => 'Coupon deleted successfully.']);
    }

    private function validateCoupon(Request $request, bool $isUpdate = false): array
    {
        return $request->validate([
            'code' => [$isUpdate ? 'sometimes' : 'required', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:255'],
            'type' => [$isUpdate ? 'sometimes' : 'required', 'in:percentage,fixed'],
            'value' => [$isUpdate ? 'sometimes' : 'required', 'numeric', 'min:0'],
            'min_order' => ['sometimes', 'numeric', 'min:0'],
            'max_uses' => ['nullable', 'integer', 'min:1'],
            'starts_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after:starts_at'],
            'is_active' => ['sometimes', 'boolean'],
        ]);
    }
}
