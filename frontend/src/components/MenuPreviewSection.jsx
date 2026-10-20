/**
 * MENU PREVIEW (homepage)
 *
 * Shows 5 products per category tab.
 * Data from Admin → Categories + Products
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProducts } from '../api/menu';
import Button from './ui/Button';
import { formatPrice } from '../utils/formatPrice';

export default function MenuPreviewSection() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    async function load() {
      const cats = await getCategories({ active_only: true });
      const prods = await getProducts({ available_only: true });
      setCategories(cats);
      setProducts(prods);
      if (cats.length > 0) {
        setActiveCategoryId(cats[0].id);
      }
    }
    load();
  }, []);

  // Find active category name
  let activeCategoryName = 'Menu';
  for (const cat of categories) {
    if (cat.id === activeCategoryId) {
      activeCategoryName = cat.name;
      break;
    }
  }

  // Filter products for active tab (max 5)
  const items = [];
  for (const p of products) {
    if (p.category_id === activeCategoryId && items.length < 5) {
      items.push(p);
    }
  }

  return (
    <section className="menu-preview-section">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32 lg:py-40">
        <div className="text-center">
          <p className="section-subtitle">Taste the Selection</p>
          <h2 className="section-title">Menu Preview</h2>
        </div>

        <div className="menu-board mx-auto mt-14 max-w-3xl">
          <div className="menu-board-frame" aria-hidden="true" />

          <div className="menu-board-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`menu-board-tab ${activeCategoryId === cat.id ? 'menu-board-tab-active' : ''}`}
              >
                {cat.name.split(' ').pop()}
              </button>
            ))}
          </div>

          <div className="menu-board-header">
            <span className="menu-board-ornament" aria-hidden="true">✦</span>
            <h3 className="menu-board-title">{activeCategoryName}</h3>
            <span className="menu-board-ornament" aria-hidden="true">✦</span>
          </div>

          <ul className="menu-board-list">
            {items.length === 0 ? (
              <li className="py-8 text-center text-sm text-cream/50">
                No items in this category yet. Add products in the admin panel.
              </li>
            ) : (
              items.map((item) => (
                <li key={item.id} className="menu-board-item">
                  <div className="menu-board-item-row">
                    <span className="menu-board-item-name">{item.name}</span>
                    <span className="menu-board-item-dots" aria-hidden="true" />
                    <span className="menu-board-item-price">{formatPrice(item.price)}</span>
                  </div>
                  {item.description && <p className="menu-board-item-desc">{item.description}</p>}
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <Link to="/menu"><Button variant="gold">View Full Menu</Button></Link>
        </div>
      </div>
    </section>
  );
}
