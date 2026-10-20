<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\RewardService;
use Illuminate\Http\Request;

/**
 * CUSTOMERS ADMIN — http://localhost:8000/admin/customers
 */
class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('role', UserRole::Customer)
            ->withCount('orders')
            ->latest()
            ->get();

        return view('admin.customers.index', compact('customers'));
    }

    public function addBonus(Request $request, $id, RewardService $rewardService)
    {
        $user = User::findOrFail($id);

        if ($user->role !== UserRole::Customer) {
            return back()->with('error', 'This user is not a customer.');
        }

        $request->validate([
            'points' => 'required|integer|min:1|max:10000',
            'description' => 'required',
        ]);

        $rewardService->addBonus($user, $request->points, $request->description);

        return back()->with('success', "Added {$request->points} bonus points to {$user->name}.");
    }
}
