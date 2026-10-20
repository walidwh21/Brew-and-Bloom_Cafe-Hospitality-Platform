<?php

namespace Database\Seeders;

use App\Models\CafeEvent;
use App\Models\ContactItem;
use App\Models\GalleryItem;
use App\Models\Page;
use App\Models\SiteSetting;
use App\Models\StoryPillar;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

/**
 * Default website content — same data that was hardcoded in React.
 * Safe to run more than once (uses updateOrCreate, no duplicates).
 */
class ContentSeeder extends Seeder
{
    public function run(): void
    {
        SiteSetting::setValue('tagline', 'Modern Café & Hospitality');
        SiteSetting::setValue('short_story', 'A homegrown neighborhood café where specialty coffee, masala chai, and fresh bakes come together. Brew means sweet — every visit should feel warm, familiar, and memorable.');

        Page::updateOrCreate(
            ['slug' => 'about'],
            [
                'title' => 'The Story of Brew & Bloom',
                'subtitle' => 'Our Story',
                'lead' => 'A neighborhood café where every visit feels like a quiet celebration — crafted with care, served with genuine hospitality.',
                'body' => "Brew & Bloom started with a simple dream: create a café that feels like home. A place where friends meet over chai, students work over cold brew, and families celebrate over cake.\n\nFrom filter coffee and masala chai to fusion pastries and seasonal plates, everything is prepared fresh daily using local ingredients and flavours inspired by local and global influences.",
                'image_1' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
                'image_2' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80',
                'image_3' => 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=500&q=80',
                'is_active' => true,
            ]
        );

        Page::updateOrCreate(
            ['slug' => 'our-story'],
            [
                'title' => 'About Brew & Bloom',
                'subtitle' => 'Our Story',
                'lead' => 'A welcoming neighborhood café born in your city — where every cup feels like a sweet melody.',
                'body' => "Brew & Bloom started with a simple dream: create a café that feels like home. A place where friends meet over chai, students work over cold brew, and families celebrate over cake.\n\nFrom filter coffee and masala chai to fusion pastries and seasonal plates, everything is prepared fresh daily using local ingredients and flavours inspired by local and global influences.",
                'image_1' => '/images/experience/private-dining.png',
                'is_active' => true,
            ]
        );

        foreach ([
            ['label' => 'Brand Vision', 'text' => 'Brew & Bloom was born in your city from a simple belief — every cup should feel like a sweet melody. We blend warm hospitality with café craft.', 'sort_order' => 1],
            ['label' => 'Fresh Ingredients', 'text' => 'We source local dairy, seasonal produce, and premium coffee beans daily. Our chai masala is ground in-house.', 'sort_order' => 2],
            ['label' => 'Artisan Coffee', 'text' => 'From slow-brewed filter coffee to velvety cappuccinos, our baristas honour both coffee traditions and modern technique.', 'sort_order' => 3],
        ] as $pillar) {
            StoryPillar::updateOrCreate(
                ['label' => $pillar['label']],
                [...$pillar, 'is_active' => true]
            );
        }

        foreach ([
            ['title' => 'Crema Perfection', 'category' => 'Coffee Shots', 'image' => 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80', 'size' => 'tall', 'sort_order' => 1],
            ['title' => 'Velvet Lounge', 'category' => 'Interior', 'image' => '/images/experience/cozy-interiors.png', 'size' => 'medium', 'sort_order' => 2],
            ['title' => 'Artisan Pastries', 'category' => 'Food', 'image' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', 'size' => 'short', 'sort_order' => 3],
            ['title' => 'Jazz Evening', 'category' => 'Events', 'image' => '/images/experience/live-music.png', 'size' => 'tall', 'sort_order' => 4],
            ['title' => 'Silk Latte', 'category' => 'Coffee Shots', 'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80', 'size' => 'medium', 'sort_order' => 5],
        ] as $item) {
            GalleryItem::updateOrCreate(
                ['title' => $item['title']],
                [...$item, 'is_active' => true]
            );
        }

        foreach ([
            ['name' => 'Priya Sharma', 'role' => 'Regular Guest', 'review' => 'The hazelnut latte here is my Sunday ritual. Brew & Bloom feels like a second home.', 'photo' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 'rating' => 5, 'sort_order' => 1],
            ['name' => 'Arjun Mehta', 'role' => 'Coffee Lover', 'review' => 'Finally a café in your city that takes espresso seriously. The filter coffee reminds me of my grandmother\'s kitchen.', 'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 'rating' => 5, 'sort_order' => 2],
            ['name' => 'Ananya Reddy', 'role' => 'Event Host', 'review' => 'We celebrated my birthday here and the team made it magical.', 'photo' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80', 'rating' => 5, 'sort_order' => 3],
        ] as $t) {
            Testimonial::updateOrCreate(
                ['name' => $t['name']],
                [...$t, 'is_active' => true]
            );
        }

        foreach ([
            ['title' => 'Live Music Night', 'description' => 'Acoustic evenings every Friday at our café.', 'schedule' => 'Every Friday · 7 PM', 'image' => '/images/experience/live-music.png', 'icon' => 'music', 'sort_order' => 1],
            ['title' => 'Couple Dinner', 'description' => 'An intimate table for two with candlelit ambiance.', 'schedule' => 'By reservation', 'image' => '/images/table-preview.png', 'icon' => 'heart', 'sort_order' => 2],
            ['title' => 'Birthday Parties', 'description' => 'Celebrate with custom cakes and a dedicated host.', 'schedule' => 'Weekends available', 'image' => '/images/experience/special-events.png', 'icon' => 'cake', 'sort_order' => 3],
        ] as $event) {
            CafeEvent::updateOrCreate(
                ['title' => $event['title']],
                [...$event, 'is_active' => true]
            );
        }

        foreach ([
            ['title' => 'Visit Us', 'content' => 'Add your business address here', 'type' => 'visit', 'sort_order' => 1],
            ['title' => 'Call Us', 'content' => '+1 555 010 1000', 'type' => 'phone', 'sort_order' => 2],
            ['title' => 'Email', 'content' => 'hello@example.com', 'type' => 'email', 'sort_order' => 3],
            ['title' => 'Mon – Fri', 'content' => '8:00 AM – 11:00 PM', 'type' => 'hours', 'sort_order' => 4],
            ['title' => 'Saturday', 'content' => '8:00 AM – 12:00 AM', 'type' => 'hours', 'sort_order' => 5],
            ['title' => 'Sunday', 'content' => '8:00 AM – 8:00 PM', 'type' => 'hours', 'sort_order' => 6],
        ] as $c) {
            ContactItem::updateOrCreate(
                ['title' => $c['title'], 'type' => $c['type']],
                [...$c, 'is_active' => true]
            );
        }

        $this->command?->info('Website content seeded (existing rows were updated, not duplicated).');
    }
}
