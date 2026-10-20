<?php

namespace Database\Seeders;

use App\Enums\CouponType;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => UserRole::Admin,
            'phone' => '+1 555 010 1000',
        ]);

        User::create([
            'name' => 'Sample Customer',
            'email' => 'customer@example.com',
            'password' => Hash::make('password'),
            'role' => UserRole::Customer,
            'phone' => '+1 555 010 1001',
            'reward_points' => 120,
        ]);

        $categories = [
            ['name' => 'Artisan Pastries', 'description' => 'Handcrafted pastries baked fresh every morning.', 'sort_order' => 1],
            ['name' => 'Specialty Coffee', 'description' => 'Filter kaapi, espresso, and artisan brews.', 'sort_order' => 2],
            ['name' => 'Fine Teas', 'description' => 'Masala chai and curated loose-leaf teas.', 'sort_order' => 3],
            ['name' => 'Gourmet Brunch', 'description' => 'Brunch plates with seasonal global flavours.', 'sort_order' => 4],
            ['name' => 'Snacks', 'description' => 'Light bites and savoury pairings.', 'sort_order' => 5],
        ];

        foreach ($categories as $cat) {
            Category::create([
                ...$cat,
                'slug' => \Illuminate\Support\Str::slug($cat['name']),
                'is_active' => true,
            ]);
        }

        // Prices — edit anytime from Admin → Products
        $products = [
            ['category' => 'Artisan Pastries', 'name' => 'Almond Croissant', 'price' => 180, 'description' => 'Buttery layers with almond cream and toasted flakes.', 'is_featured' => true],
            ['category' => 'Artisan Pastries', 'name' => 'Brew Macaron Box', 'price' => 450, 'description' => 'Six delicate macarons in seasonal flavours.', 'is_featured' => true],
            ['category' => 'Artisan Pastries', 'name' => 'Pain au Chocolat', 'price' => 150, 'description' => 'Classic chocolate pastry.', 'is_featured' => false],
            ['category' => 'Specialty Coffee', 'name' => 'Espresso', 'price' => 120, 'description' => 'Bold single shot, rich crema, pure intensity.', 'is_featured' => true, 'image' => 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80'],
            ['category' => 'Specialty Coffee', 'name' => 'Cappuccino', 'price' => 150, 'description' => 'Velvety microfoam over a double espresso.', 'is_featured' => true, 'image' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80'],
            ['category' => 'Specialty Coffee', 'name' => 'Mocha', 'price' => 180, 'description' => 'Dark chocolate meets espresso perfection.', 'is_featured' => true, 'image' => 'https://images.unsplash.com/photo-1577887239367-54d94d0927fd?auto=format&fit=crop&w=600&q=80'],
            ['category' => 'Specialty Coffee', 'name' => 'Hazelnut Latte', 'price' => 195, 'description' => 'Roasted hazelnut syrup with silky steamed milk.', 'is_featured' => true, 'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80'],
            ['category' => 'Specialty Coffee', 'name' => 'House Filter Coffee', 'price' => 90, 'description' => 'rich coffee decoction with frothy milk.', 'is_featured' => true],
            ['category' => 'Specialty Coffee', 'name' => 'Caramel Affogato', 'price' => 220, 'description' => 'Espresso poured over vanilla gelato.', 'is_featured' => false],
            ['category' => 'Specialty Coffee', 'name' => 'Cold Brew Reserve', 'price' => 160, 'description' => '24-hour steeped, served over ice.', 'is_featured' => false],
            ['category' => 'Fine Teas', 'name' => 'Masala Chai', 'price' => 80, 'description' => 'House-ground spices, simmered slow.', 'is_featured' => true],
            ['category' => 'Fine Teas', 'name' => 'Chamomile Garden', 'price' => 120, 'description' => 'Soothing herbal blend with honey notes.', 'is_featured' => false],
            ['category' => 'Fine Teas', 'name' => 'Jasmine Pearl', 'price' => 140, 'description' => 'Delicate green tea with floral jasmine aroma.', 'is_featured' => false],
            ['category' => 'Fine Teas', 'name' => 'English Breakfast', 'price' => 110, 'description' => 'Robust black tea blend, perfect with milk.', 'is_featured' => false],
            ['category' => 'Gourmet Brunch', 'name' => 'Masala Eggs Benedict', 'price' => 320, 'description' => 'Poached eggs, spiced hollandaise, brioche.', 'is_featured' => true],
            ['category' => 'Gourmet Brunch', 'name' => 'Avocado Tartine', 'price' => 280, 'description' => 'Sourdough, smashed avocado, poached egg.', 'is_featured' => false],
            ['category' => 'Snacks', 'name' => 'Cheese & Chutney Board', 'price' => 350, 'description' => 'Local cheeses, mango chutney, and crackers.', 'is_featured' => true],
            ['category' => 'Snacks', 'name' => 'Truffle Fries', 'price' => 220, 'description' => 'Hand-cut fries with truffle oil and parmesan.', 'is_featured' => false],
            ['category' => 'Snacks', 'name' => 'Mixed Nuts & Olives', 'price' => 180, 'description' => 'Marcona almonds, cashews, and marinated olives.', 'is_featured' => false],
        ];

        foreach ($products as $product) {
            $category = Category::where('name', $product['category'])->first();
            Product::create([
                'category_id' => $category->id,
                'name' => $product['name'],
                'slug' => \Illuminate\Support\Str::slug($product['name']),
                'description' => $product['description'],
                'price' => $product['price'],
                'image' => $product['image'] ?? null,
                'is_featured' => $product['is_featured'],
                'is_available' => true,
            ]);
        }

        Coupon::create([
            'code' => 'WELCOME10',
            'description' => '10% off your first order',
            'type' => CouponType::Percentage,
            'value' => 10,
            'min_order' => 500,
            'max_uses' => 100,
            'is_active' => true,
        ]);

        Coupon::create([
            'code' => 'MELT50',
            'description' => 'Discount on qualifying orders',
            'type' => CouponType::Fixed,
            'value' => 50,
            'min_order' => 500,
            'is_active' => true,
        ]);

        $this->call(ContentSeeder::class);
    }
}
