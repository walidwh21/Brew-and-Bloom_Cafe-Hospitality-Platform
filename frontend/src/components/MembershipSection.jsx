import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Coffee, Crown, Gem } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Earn Points',
    description: 'Collect rewards on every order, visit, and referral. Redeem for exclusive treats.',
  },
  {
    icon: Coffee,
    title: 'Free Coffee',
    description: 'Unlock complimentary signature brews as you reach milestone tiers.',
  },
  {
    icon: Crown,
    title: 'VIP Access',
    description: 'Priority reservations, members-only events, and early access to seasonal menus.',
  },
];

export default function MembershipSection() {
  const { user } = useAuth();

  return (
    <section className="membership-section">
      <div className="membership-glow" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Gem className="mx-auto h-8 w-8 text-gold" strokeWidth={1.5} />
          <p className="section-subtitle mt-4 !text-gold">Brew & Bloom Club</p>
          <h2 className="mt-3 font-display text-4xl font-light tracking-wide text-cream md:text-5xl">
            Premium Membership
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm font-light leading-relaxed text-cream/60 md:text-base">
            Join our loyalty circle and turn every sip into something extraordinary — crafted for guests who return.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="membership-card mx-auto mt-14 max-w-5xl"
        >
          <div className="membership-card-frame" aria-hidden="true" />

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="membership-feature"
              >
                <div className="membership-feature-icon">
                  <feature.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="membership-feature-title">{feature.title}</h3>
                <p className="membership-feature-desc">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="membership-divider" />

          <div className="text-center">
            {user ? (
              <p className="mb-6 text-sm text-cream/50">
                Welcome back, <span className="text-gold">{user.name}</span>
                {user.reward_points != null && (
                  <> · <span className="text-cream/70">{user.reward_points} points</span></>
                )}
              </p>
            ) : (
              <p className="mb-6 text-sm text-cream/50">
                Sign up today and earn <span className="text-gold">50 welcome points</span>
              </p>
            )}

            <Link to={user ? '/profile' : '/register'}>
              <Button variant="gold" className="!px-10 !py-4 !text-sm !tracking-[0.2em]">
                {user ? 'View My Membership' : 'Join Membership'}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
