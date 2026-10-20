import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../../api/orders';
import { formatPrice } from '../../utils/formatPrice';

const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => getOrders().then(setOrders);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-espresso">Orders</h1>

      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card-luxury">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium">{order.order_number}</p>
                <p className="text-sm text-espresso/60">{order.user?.name} · {new Date(order.created_at).toLocaleString()}</p>
              </div>
              <p className="font-display text-2xl">{formatPrice(order.total)}</p>
              <select
                className="input-luxury !w-auto !py-2"
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
              >
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="mt-3 border-t border-espresso/5 pt-3">
              {order.items?.map((item) => (
                <p key={item.id} className="text-sm text-espresso/70">
                  {item.quantity}x {item.product?.name} — {formatPrice(item.subtotal)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
