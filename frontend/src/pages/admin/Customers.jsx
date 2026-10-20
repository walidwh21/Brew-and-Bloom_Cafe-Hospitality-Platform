import { useEffect, useState } from 'react';
import { Star, Pencil } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { AdminError, AdminLoading } from '../../components/admin/AdminStatus';
import { getCustomers, updateCustomer } from '../../api/admin';
import { addBonusPoints } from '../../api/rewards';
import { getAjaxErrorMessage } from '../../utils/ajax';

/**
 * ADMIN CUSTOMERS PAGE
 * View customers, edit contact info, add loyalty bonus points.
 */
export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bonusForm, setBonusForm] = useState({ userId: null, points: 50, description: 'Loyalty bonus' });
  const [editForm, setEditForm] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setCustomers(await getCustomers());
    } catch (err) {
      setError(getAjaxErrorMessage(err, 'Could not load customers.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addBonus = async () => {
    try {
      await addBonusPoints(bonusForm.userId, bonusForm.points, bonusForm.description);
      setBonusForm({ userId: null, points: 50, description: 'Loyalty bonus' });
      load();
    } catch (err) {
      alert(getAjaxErrorMessage(err, 'Could not add bonus.'));
    }
  };

  const saveEdit = async () => {
    try {
      await updateCustomer(editForm.id, { name: editForm.name, phone: editForm.phone });
      setEditForm(null);
      load();
    } catch (err) {
      alert(getAjaxErrorMessage(err, 'Could not update customer.'));
    }
  };

  if (loading) return <AdminLoading label="Loading customers..." />;
  if (error) return <AdminError message={error} />;

  return (
    <div>
      <h1 className="font-display text-3xl text-espresso">Customers</h1>
      <p className="text-sm text-espresso/60">Registered users who order and earn reward points.</p>

      {bonusForm.userId && (
        <div className="mt-6 card-luxury flex flex-wrap items-end gap-4">
          <Input label="Points" type="number" value={bonusForm.points} onChange={(e) => setBonusForm({ ...bonusForm, points: Number(e.target.value) })} />
          <Input label="Description" value={bonusForm.description} onChange={(e) => setBonusForm({ ...bonusForm, description: e.target.value })} />
          <Button onClick={addBonus}>Add Bonus</Button>
          <Button variant="secondary" onClick={() => setBonusForm({ ...bonusForm, userId: null })}>Cancel</Button>
        </div>
      )}

      {editForm && (
        <div className="mt-6 card-luxury flex flex-wrap items-end gap-4">
          <Input label="Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
          <Input label="Phone" value={editForm.phone || ''} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
          <Button onClick={saveEdit}>Save</Button>
          <Button variant="secondary" onClick={() => setEditForm(null)}>Cancel</Button>
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-espresso/5 bg-white/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-espresso/5 text-left text-espresso/60">
              <th className="p-4">Customer</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Points</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-espresso/5">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4">
                  <p>{c.email}</p>
                  <p className="text-xs text-espresso/50">{c.phone || '—'}</p>
                </td>
                <td className="p-4">{c.orders_count ?? 0}</td>
                <td className="p-4">
                  <span className="flex items-center gap-1 text-gold">
                    <Star className="h-3 w-3" fill="currentColor" />
                    {c.reward_points}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <button onClick={() => setEditForm({ id: c.id, name: c.name, phone: c.phone })} className="text-sm text-espresso/70 hover:text-gold">
                      <Pencil className="inline h-3.5 w-3.5" /> Edit
                    </button>
                    <button onClick={() => setBonusForm({ ...bonusForm, userId: c.id })} className="text-sm text-gold hover:underline">
                      Add Bonus
                    </button>
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
