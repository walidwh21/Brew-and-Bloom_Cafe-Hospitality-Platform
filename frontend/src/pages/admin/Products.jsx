import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { AdminError, AdminLoading } from '../../components/admin/AdminStatus';
import { getCategories, getProducts } from '../../api/menu';
import { createProduct, updateProduct, deleteProduct } from '../../api/admin';
import { formatPrice } from '../../utils/formatPrice';
import { getAjaxErrorMessage } from '../../utils/ajax';

const EMPTY_FORM = {
  category_id: '', name: '', description: '', price: '', image: '', is_featured: false, is_available: true,
};

/**
 * ADMIN PRODUCTS PAGE
 * URL: /admin/products
 *
 * Data flow: load() → getProducts() + getCategories() → save → createProduct/updateProduct API
 */
export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [productList, categoryList] = await Promise.all([getProducts(), getCategories()]);
      setProducts(productList);
      setCategories(categoryList);
    } catch (err) {
      setError(getAjaxErrorMessage(err, 'Could not load products.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, category_id: categories[0]?.id || '' });
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      category_id: product.category_id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: product.image || '',
      is_featured: product.is_featured,
      is_available: product.is_available,
    });
    setShowForm(true);
  };

  const save = async () => {
    try {
      const data = { ...form, price: parseFloat(form.price), category_id: Number(form.category_id) };
      if (editing) await updateProduct(editing.id, data);
      else await createProduct(data);
      setShowForm(false);
      load();
    } catch (err) {
      alert(getAjaxErrorMessage(err, 'Could not save product.'));
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      load();
    } catch (err) {
      alert(getAjaxErrorMessage(err, 'Could not delete product.'));
    }
  };

  if (loading) return <AdminLoading label="Loading products..." />;
  if (error) return <AdminError message={error} hint="Make sure Laravel is running and you are logged in as admin." />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-espresso">Products</h1>
          <p className="text-sm text-espresso/60">Changes here update the public menu and homepage instantly.</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Add Product</Button>
      </div>

      {showForm && (
        <div className="mt-6 card-luxury space-y-4">
          <h2 className="font-display text-xl">{editing ? 'Edit' : 'New'} Product</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm">Category</label>
              <select className="input-luxury" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Price ($)" type="number" step="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <Input label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images/... or https://..." />
            <Input label="Description" className="sm:col-span-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              Featured on homepage
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_available} onChange={(e) => setForm({ ...form, is_available: e.target.checked })} />
              Available to order
            </label>
          </div>
          <div className="flex gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-espresso/5 bg-white/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-espresso/5 text-left text-espresso/60">
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-espresso/40">No products yet. Add a category first.</td></tr>
            ) : products.map((p) => (
              <tr key={p.id} className="border-b border-espresso/5">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">{p.category?.name}</td>
                <td className="p-4">{formatPrice(p.price)}</td>
                <td className="p-4">{p.is_featured ? 'Yes' : '—'}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2 py-1 text-xs ${p.is_available ? 'bg-sage/20 text-sage' : 'bg-burgundy/10 text-burgundy'}`}>
                    {p.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-gold hover:text-espresso"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => remove(p.id)} className="text-burgundy/60 hover:text-burgundy"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
