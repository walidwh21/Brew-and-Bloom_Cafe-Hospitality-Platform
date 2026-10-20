<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

/**
 * COUPONS ADMIN — http://localhost:8000/admin/coupons
 */
class CouponController extends Controller
{
    public function index()
    {
        $coupons = Coupon::latest()->get();

        return view('admin.coupons.index', compact('coupons'));
    }

    public function create()
    {
        return view('admin.coupons.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required',
            'type' => 'required',
            'value' => 'required|numeric|min:0',
        ]);

        Coupon::create([
            'code' => strtoupper($request->code),
            'description' => $request->description,
            'type' => $request->type,
            'value' => $request->value,
            'min_order' => $request->min_order ?? 0,
            'max_uses' => $request->max_uses,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect('/admin/coupons')->with('success', 'Coupon created!');
    }

    public function edit($id)
    {
        $coupon = Coupon::findOrFail($id);

        return view('admin.coupons.edit', compact('coupon'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'code' => 'required',
            'type' => 'required',
            'value' => 'required|numeric|min:0',
        ]);

        $coupon = Coupon::findOrFail($id);
        $coupon->code = strtoupper($request->code);
        $coupon->description = $request->description;
        $coupon->type = $request->type;
        $coupon->value = $request->value;
        $coupon->min_order = $request->min_order ?? 0;
        $coupon->max_uses = $request->max_uses;
        $coupon->is_active = $request->has('is_active');
        $coupon->save();

        return redirect('/admin/coupons')->with('success', 'Coupon updated!');
    }

    public function destroy($id)
    {
        Coupon::findOrFail($id)->delete();

        return redirect('/admin/coupons')->with('success', 'Coupon deleted.');
    }
}
