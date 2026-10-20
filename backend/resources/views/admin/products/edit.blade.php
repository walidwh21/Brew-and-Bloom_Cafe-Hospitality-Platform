@extends('admin.layouts.app')

@section('title', 'Edit Product')

@section('content')
    <h1 class="page-title">Edit Product</h1>

    <div class="card" style="max-width:560px">
        <form method="POST" action="/admin/products/{{ $product->id }}">
            @csrf @method('PUT')
            <div class="form-group">
                <label>Category *</label>
                <select name="category_id" required>
                    @foreach($categories as $cat)
                        <option value="{{ $cat->id }}" {{ old('category_id', $product->category_id) == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label>Product Name *</label>
                <input type="text" name="name" value="{{ old('name', $product->name) }}" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description">{{ old('description', $product->description) }}</textarea>
            </div>
            <div class="form-group">
                <label>Price ($) *</label>
                <input type="number" name="price" value="{{ old('price', $product->price) }}" step="1" min="0" required>
            </div>
            <div class="form-group">
                <label>Image URL (optional)</label>
                <input type="text" name="image" value="{{ old('image', $product->image) }}" placeholder="/images/... or https://...">
            </div>
            <label class="checkbox"><input type="checkbox" name="is_featured" {{ $product->is_featured ? 'checked' : '' }}> Featured</label>
            <label class="checkbox"><input type="checkbox" name="is_available" {{ $product->is_available ? 'checked' : '' }}> Available</label>
            <div class="actions">
                <button type="submit" class="btn btn-primary">Update Product</button>
                <a href="/admin/products" class="btn btn-gold">Cancel</a>
            </div>
        </form>
    </div>
@endsection
