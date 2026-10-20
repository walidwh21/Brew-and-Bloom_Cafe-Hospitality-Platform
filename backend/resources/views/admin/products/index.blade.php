@extends('admin.layouts.app')

@section('title', 'Products')

@section('content')
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
            <h1 class="page-title">Products</h1>
            <p class="page-sub">Manage menu items — add coffee, pastries, brunch, etc.</p>
        </div>
        <a href="/admin/products/create" class="btn btn-primary">+ Add Product</a>
    </div>

    <div class="card">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Featured</th>
                    <th>Available</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($products as $product)
                    <tr>
                        <td><strong>{{ $product->name }}</strong></td>
                        <td>{{ $product->category->name ?? '-' }}</td>
                        <td>{{ format_money($product->price) }}</td>
                        <td>{{ $product->is_featured ? 'Yes' : 'No' }}</td>
                        <td>{{ $product->is_available ? 'Yes' : 'No' }}</td>
                        <td>
                            <a href="/admin/products/{{ $product->id }}/edit" class="btn btn-sm btn-gold">Edit</a>
                            <form action="/admin/products/{{ $product->id }}" method="POST" style="display:inline" onsubmit="return confirm('Delete this product?')">
                                @csrf @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6" style="text-align:center;color:#999">No products yet. Add a category first, then add products.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
