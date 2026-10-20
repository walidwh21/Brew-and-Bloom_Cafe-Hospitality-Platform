@extends('admin.layouts.app')

@section('title', 'Add Product')

@section('content')
    <h1 class="page-title">Add Product</h1>
    <p class="page-sub">Add a new item to your café menu.</p>

    <div class="card" style="max-width:560px">
        <form method="POST" action="/admin/products">
            @csrf
            <div class="form-group">
                <label>Category *</label>
                <select name="category_id" required>
                    <option value="">-- Choose category --</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat->id }}" {{ old('category_id') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label>Product Name *</label>
                <input type="text" name="name" value="{{ old('name') }}" required placeholder="e.g. Velvet Latte">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description" placeholder="What's special about this item?">{{ old('description') }}</textarea>
            </div>
            <div class="form-group">
                <label>Price ($) *</label>
                <input type="number" name="price" value="{{ old('price') }}" step="1" min="0" required placeholder="150">
            </div>
            <div class="form-group">
                <label>Image URL (optional)</label>
                <input type="text" name="image" value="{{ old('image') }}" placeholder="/images/... or https://...">
                <small style="color:#888">Paste a link to a photo. Featured products show on the homepage.</small>
            </div>
            <label class="checkbox"><input type="checkbox" name="is_featured"> Featured on homepage</label>
            <label class="checkbox"><input type="checkbox" name="is_available" checked> Available to order</label>
            <div class="actions">
                <button type="submit" class="btn btn-primary">Save Product</button>
                <a href="/admin/products" class="btn btn-gold">Cancel</a>
            </div>
        </form>
    </div>
@endsection
