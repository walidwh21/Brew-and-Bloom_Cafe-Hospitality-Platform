import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { AdminError, AdminLoading } from '../../components/admin/AdminStatus';
import { getCoupons, createCoupon, updateCoupon, deleteCoupon } from '../../api/admin';
import { formatPrice } from '../../utils/formatPrice';
import { getAjaxErrorMessage } from '../../utils/ajax';

const EMPTY_FORM = {
  code: '', description: '', type: 'percentage', value: '', min_order: 0, max_uses: '', is_active: true,
};

/**
 * ADMIN COUPONS PAGE
 * Coupons created here appear on the homepage Special Offers section.
 */
export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setCoupons(await getCoupons());
    } catch (err) {
      setError(getAjaxErrorMessage(err, 'Could not load coupons.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (coupon) => {
    setEditing(coupon);
    setForm({
      code: coupon.code,
      description: coupon.description || '',
      type: coupon.type,
      value: coupon.value,
      min_order: coupon.min_order || 0,
      max_uses: coupon.max_uses || '',
      is_active: coupon.is_active,
    });
    setShowForm(true);
  };

  const save = async () => {
    try {
      const payload = {
        ...form,
        value: parseFloat(form.value),
        min_order: parseFloat(form.min_order) || 0,
        max_uses: form.max_uses ? parseInt(form.max_uses, 10) : null,
      };
      if (editing) await updateCoupon(editing.id, payload);
      else await createCoupon(payload);
      setShowForm(false);
      load();
    } catch (err) {
      alert(getAjaxErrorMessage(err, 'Could not save coupon.'));
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete coupon?')) return;
    try {
      await deleteCoupon(id);
      load();
    } catch (err) {
      alert(getAjaxErrorMessage(err, 'Could not delete coupon.'));
    }
  };

  if (loading) return <AdminLoading label="Loading coupons..." />;
  if (error) return <AdminError message={error} />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-espresso">Coupons</h1>
          <p className="text-sm text-espresso/60">Active coupons show on the homepage offers slider.</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Add Coupon</Button>
      </div>

      {showForm && (
        <div className="mt-6 card-luxury grid gap-4 sm:grid-cols-2">
          <h2 className="font-display text-xl sm:col-span-2">{editing ? 'Edit' : 'New'} Coupon</h2>
          <Input label="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div>
            <label className="mb-2 block text-sm">Type</label>
            <select className="input-luxury" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed amount ($)</option>
            </select>
          </div>
          <Input label="Value" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
          <Input label="Min Order ($)" type="number" value={form.min_order} onChange={(e) => setForm({ ...form, min_order: e.target.value })} />
          <Input label="Max Uses" type="number" value={form.max_uses} onChange={(e) => setForm({ ...form, max_uses: e.target.value })} />
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
            Active (show on homepage)
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <Button onClick={save}>Save</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {coupons.length === 0 ? (
          <p className="text-espresso/50">No coupons yet. Create one to show offers on the homepage.</p>
        ) : coupons.map((c) => (
          <div key={c.id} className="card-luxury flex items-center justify-between">
            <div>
              <p className="font-display text-xl text-gold">{c.code}</p>
              <p className="text-sm text-espresso/60">{c.description}</p>
              <p className="mt-1 text-sm">
                {c.type === 'percentage' ? `${c.value}% off` : `${formatPrice(c.value)} off`} · Min {formatPrice(c.min_order)}
              </p>
              <p className="text-xs text-espresso/40">
                {c.is_active ? 'Active' : 'Inactive'} · Used: {c.used_count}{c.max_uses ? `/${c.max_uses}` : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(c)} className="text-gold hover:text-espresso"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(c.id)} className="text-burgundy/60 hover:text-burgundy"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
