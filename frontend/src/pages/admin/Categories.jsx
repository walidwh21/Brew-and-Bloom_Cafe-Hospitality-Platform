import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getCategories } from '../../api/menu';
import { createCategory, updateCategory, deleteCategory } from '../../api/admin';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', is_active: true, sort_order: 0 });

  const load = () => getCategories().then(setCategories);
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (editing) await updateCategory(editing.id, form);
    else await createCategory(form);
    setShowForm(false);
    load();
  };

  const remove = async (id) => {
    if (confirm('Delete this category?')) {
      await deleteCategory(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-espresso">Categories</h1>
        <Button onClick={() => { setEditing(null); setForm({ name: '', description: '', is_active: true, sort_order: 0 }); setShowForm(true); }}>
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      {showForm && (
        <div className="mt-6 card-luxury space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input label="Sort Order" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
            Active
          </label>
          <div className="flex gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.id} className="card-luxury">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl">{cat.name}</h3>
                <p className="mt-1 text-sm text-espresso/60">{cat.description}</p>
                <p className="mt-2 text-xs text-gold">{cat.products_count ?? 0} products</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(cat); setForm(cat); setShowForm(true); }}><Pencil className="h-4 w-4 text-gold" /></button>
                <button onClick={() => remove(cat.id)}><Trash2 className="h-4 w-4 text-burgundy/60" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
