/**
 * MENU PAGE — shows all products with category filter + search
 *
 * Step 1: Load categories and products from API
 * Step 2: Filter by category and search text
 * Step 3: Show ProductCard for each item
 */
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import PageLayout from '../components/layout/PageLayout';
import { getCategories, getProducts } from '../api/menu';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    async function load() {
      const cats = await getCategories({ active_only: true });
      const prods = await getProducts({ available_only: true });
      setCategories(cats);
      setProducts(prods);
    }
    load();
  }, []);

  // Filter products (simple if checks)
  const filtered = [];
  for (const p of products) {
    const matchCategory = activeCategory === 'all' || p.category_id === Number(activeCategory);
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    if (matchCategory && matchSearch) {
      filtered.push(p);
    }
  }

  return (
    <PageLayout
      subtitle="Café & Hospitality"
      title="The Menu"
      description="Coffee, chai, desserts & snacks — freshly made, with clearly displayed prices"
      image="/images/experience/cozy-interiors.png"
      wide
    >
      <div className="menu-toolbar">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                activeCategory === 'all' ? 'bg-espresso text-cream shadow-md' : 'bg-cream text-espresso/70 hover:bg-gold/15'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(String(cat.id))}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  activeCategory === String(cat.id) ? 'bg-espresso text-cream shadow-md' : 'bg-cream text-espresso/70 hover:bg-gold/15'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/40" />
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-luxury !pl-10 !py-2.5"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addItem} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-espresso/50">No items found. Try another category.</p>
      )}
    </PageLayout>
  );
}
