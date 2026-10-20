/**
 * LOGIN PAGE
 *
 * Step 1: User fills email + password
 * Step 2: Form submits → loginUser() sends AJAX to Laravel
 * Step 3: Save token in localStorage → update AuthContext → redirect
 *
 * Files to read together:
 *   Login.jsx → api/auth.js → backend AuthController
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import AuthLayout from '../components/layout/AuthLayout';
import { loginUser } from '../api/auth';
import { saveAuthSession } from '../utils/storage';
import { getAjaxErrorMessage } from '../utils/ajax';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserAfterLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      saveAuthSession(result.user, result.token);
      setUserAfterLogin(result.user);

      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(getAjaxErrorMessage(err, 'Login failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout subtitle="Welcome Back" title="Sign In">
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-burgundy">{error}</p>}
        <Button type="submit" variant="gold" className="w-full" loading={loading}>Sign In</Button>
      </form>

      <p className="mt-6 text-center text-sm text-espresso/60">
        New to Brew & Bloom?{' '}
        <Link to="/register" className="text-gold hover:underline">Create an account</Link>
      </p>

      <div className="mt-6 rounded-xl border border-gold/20 bg-gold/5 p-4 text-xs text-espresso/60">
        <p className="font-medium text-espresso">Demo Accounts</p>
        <p className="mt-1">Admin: admin@example.com / password</p>
        <p>Customer: customer@example.com / password</p>
      </div>
    </AuthLayout>
  );
}
