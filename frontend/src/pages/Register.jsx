import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import AuthLayout from '../components/layout/AuthLayout';
import { registerUser } from '../api/auth';
import { saveAuthSession } from '../utils/storage';
import { getAjaxErrorMessage } from '../utils/ajax';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserAfterLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await registerUser(form);
      saveAuthSession(result.user, result.token);
      setUserAfterLogin(result.user);
      navigate('/');
    } catch (err) {
      setError(getAjaxErrorMessage(err, 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout subtitle="Join Us" title="Create Account" hint="Earn 50 welcome reward points!">
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 010 1000" />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Input label="Confirm Password" type="password" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} required />
        {error && <p className="text-sm text-burgundy">{error}</p>}
        <Button type="submit" variant="gold" className="w-full" loading={loading}>Create Account</Button>
      </form>

      <p className="mt-6 text-center text-sm text-espresso/60">
        Already have an account?{' '}
        <Link to="/login" className="text-gold hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
