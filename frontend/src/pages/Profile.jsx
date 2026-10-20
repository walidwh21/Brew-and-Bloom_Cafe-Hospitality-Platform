import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, User } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import PageLayout from '../components/layout/PageLayout';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../api/auth';
import { getOrders } from '../api/orders';
import { getMyRewards, redeemPoints } from '../api/rewards';
import { formatPrice } from '../utils/formatPrice';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [rewards, setRewards] = useState({ reward_points: 0, transactions: [] });
  const [profile, setProfile] = useState({ name: '', phone: '', address: '' });
  const [redeemAmount, setRedeemAmount] = useState(50);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name, phone: user.phone || '', address: user.address || '' });
      getOrders().then(setOrders);
      getMyRewards().then(setRewards);
    }
  }, [user]);

  const saveProfile = async () => {
    const updatedUser = await updateProfile(profile);
    updateUser(updatedUser);
    setMessage('Profile updated!');
  };

  const redeem = async () => {
    try {
      const updatedUser = await redeemPoints(redeemAmount, 'Redeemed for café credit');
      updateUser(updatedUser);
      const rewardData = await getMyRewards();
      setRewards(rewardData);
      setMessage('Points redeemed successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Redemption failed.');
    }
  };

  const statusColors = {
    pending: 'bg-gold/20 text-espresso',
    confirmed: 'bg-sage/20 text-sage',
    preparing: 'bg-rose/20 text-burgundy',
    ready: 'bg-gold/30 text-espresso',
    completed: 'bg-espresso/10 text-espresso',
    cancelled: 'bg-burgundy/10 text-burgundy',
  };

  return (
    <PageLayout
      subtitle="Your Account"
      title={user?.name || 'Profile'}
      description="Manage your profile, orders, and reward points."
      image="/images/experience/cozy-interiors.png"
      wide
    >
      <div className="flex flex-wrap justify-center gap-2">
        {['profile', 'orders', 'rewards'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`profile-tab ${tab === t ? 'profile-tab-active' : 'profile-tab-inactive'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {message && <p className="mt-6 text-center text-sm text-sage">{message}</p>}

      {tab === 'profile' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inner-card mx-auto mt-8 max-w-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-espresso/5 pb-4">
            <div className="inner-icon-wrap">
              <User className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-xl">Edit Profile</h3>
          </div>
          <Input label="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <Input label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          <Input label="Address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
          <Button variant="gold" onClick={saveProfile}>Save Profile</Button>
        </motion.div>
      )}

      {tab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-4">
          {orders.length === 0 ? (
            <div className="inner-card text-center text-espresso/50">No orders yet. <a href="/menu" className="text-gold hover:underline">Browse menu</a></div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="inner-card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{order.order_number}</p>
                    <p className="text-sm text-espresso/50">{new Date(order.created_at).toLocaleDateString('en-US')}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs capitalize ${statusColors[order.status]}`}>{order.status}</span>
                </div>
                <div className="mt-3 flex justify-between border-t border-espresso/5 pt-3">
                  <span className="text-sm text-espresso/60">{order.items?.length} items</span>
                  <span className="font-display text-lg">{formatPrice(order.total)}</span>
                </div>
              </div>
            ))
          )}
        </motion.div>
      )}

      {tab === 'rewards' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
          <div className="inner-card mx-auto max-w-md text-center">
            <Star className="mx-auto h-10 w-10 text-gold" />
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold">Reward Points</p>
            <p className="font-display text-5xl text-espresso">{rewards.reward_points}</p>
          </div>

          <div className="inner-card mx-auto mt-6 max-w-md">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-gold" />
              <h3 className="font-display text-lg">Redeem Points</h3>
            </div>
            <div className="mt-4 flex gap-3">
              <Input type="number" min={10} value={redeemAmount} onChange={(e) => setRedeemAmount(Number(e.target.value))} />
              <Button variant="gold" onClick={redeem}>Redeem</Button>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-md space-y-2">
            {rewards.transactions?.map((tx) => (
              <div key={tx.id} className="flex justify-between rounded-xl border border-espresso/5 bg-white px-4 py-3 text-sm shadow-sm">
                <span>{tx.description}</span>
                <span className={tx.points > 0 ? 'text-sage' : 'text-burgundy'}>{tx.points > 0 ? '+' : ''}{tx.points}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </PageLayout>
  );
}
