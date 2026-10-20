@extends('admin.layouts.app')

@section('title', 'Edit Coupon')

@section('content')
    <h1 class="page-title">Edit Coupon</h1>

    <div class="card" style="max-width:560px">
        <form method="POST" action="/admin/coupons/{{ $coupon->id }}">
            @csrf @method('PUT')
            <div class="form-group">
                <label>Coupon Code *</label>
                <input type="text" name="code" value="{{ old('code', $coupon->code) }}" required style="text-transform:uppercase">
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" name="description" value="{{ old('description', $coupon->description) }}">
            </div>
            <div class="form-group">
                <label>Type *</label>
                <select name="type" required>
                    <option value="percentage" {{ old('type', $coupon->type->value ?? $coupon->type) === 'percentage' ? 'selected' : '' }}>Percentage (%)</option>
                    <option value="fixed" {{ old('type', $coupon->type->value ?? $coupon->type) === 'fixed' ? 'selected' : '' }}>Fixed amount ($)</option>
                </select>
            </div>
            <div class="form-group">
                <label>Value *</label>
                <input type="number" name="value" value="{{ old('value', $coupon->value) }}" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label>Minimum Order ($)</label>
                <input type="number" name="min_order" value="{{ old('min_order', $coupon->min_order) }}" step="0.01" min="0">
            </div>
            <div class="form-group">
                <label>Max Uses (leave empty = unlimited)</label>
                <input type="number" name="max_uses" value="{{ old('max_uses', $coupon->max_uses) }}" min="1">
            </div>
            <label class="checkbox"><input type="checkbox" name="is_active" {{ $coupon->is_active ? 'checked' : '' }}> Active</label>
            <div class="actions">
                <button type="submit" class="btn btn-primary">Update Coupon</button>
                <a href="/admin/coupons" class="btn btn-gold">Cancel</a>
            </div>
        </form>
    </div>
@endsection
