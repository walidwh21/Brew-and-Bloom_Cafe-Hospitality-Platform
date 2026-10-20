<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\OrderResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * ADMIN DASHBOARD API
 * Matches frontend: pages/admin/Dashboard.jsx, Customers.jsx
 *
 * Flow (same pattern as login):
 * 1. React sends AJAX GET /api/admin/dashboard (with admin token)
 * 2. Middleware checks user is logged in AND role = admin
 * 3. DashboardService counts data from database
 * 4. Laravel returns JSON with stats + recent orders
 * 5. React displays the numbers on screen
 */
class DashboardController extends BaseApiController
{
    public function __construct(private DashboardService $dashboardService) {}

    /**
     * GET /api/admin/dashboard
     * Used by: frontend/src/pages/admin/Dashboard.jsx
     */
    public function index(): JsonResponse
    {
        // Step 1: Get all numbers from database
        $stats = $this->dashboardService->stats();

        // Step 2: Send clean JSON to React
        return $this->success('Dashboard loaded.', [
            'stats' => [
                'total_orders' => $stats['total_orders'],
                'today_orders' => $stats['today_orders'],
                'total_revenue' => $stats['total_revenue'],
                'today_revenue' => $stats['today_revenue'],
                'total_customers' => $stats['total_customers'],
                'pending_reservations' => $stats['pending_reservations'],
                'total_products' => $stats['total_products'],
                'total_categories' => $stats['total_categories'],
                'active_coupons' => $stats['active_coupons'],
            ],
            'recent_orders' => OrderResource::collection($stats['recent_orders']),
        ]);
    }

    /**
     * GET /api/admin/customers
     * Used by: frontend/src/pages/admin/Customers.jsx
     */
    public function customers(): JsonResponse
    {
        $customers = User::where('role', 'customer')
            ->withCount('orders')
            ->latest()
            ->get();

        return $this->success('Customers loaded.', [
            'customers' => UserResource::collection($customers),
        ]);
    }

    /**
     * PUT /api/admin/customers/{user}
     * Used by: frontend/src/pages/admin/Customers.jsx
     */
    public function updateCustomer(Request $request, User $user): JsonResponse
    {
        if ($user->role->value !== 'customer') {
            return $this->error('User is not a customer.');
        }

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:500'],
        ]);

        $user->update($data);

        return $this->success('Customer updated.', [
            'customer' => new UserResource($user->fresh()),
        ]);
    }
}
