import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { getReservations, updateReservationStatus, deleteReservation } from '../../api/reservations';

const statuses = ['pending', 'confirmed', 'cancelled', 'completed'];

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  const load = () => getReservations().then(setReservations);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await updateReservationStatus(id, status);
    load();
  };

  const remove = async (id) => {
    if (confirm('Delete reservation?')) {
      await deleteReservation(id);
      load();
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-espresso">Reservations</h1>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-espresso/5 bg-white/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-espresso/5 text-left text-espresso/60">
              <th className="p-4">Guest</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Guests</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-b border-espresso/5">
                <td className="p-4">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-espresso/50">{r.email} · {r.phone}</p>
                </td>
                <td className="p-4">{r.reservation_date} at {r.reservation_time}</td>
                <td className="p-4">{r.guests}</td>
                <td className="p-4">
                  <select className="input-luxury !py-1 !text-xs" value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}>
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-4">
                  <button onClick={() => remove(r.id)} className="text-burgundy/60 hover:text-burgundy">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
