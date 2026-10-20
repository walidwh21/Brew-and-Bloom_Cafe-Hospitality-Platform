/**
 * AUTH CONTEXT
 *
 * This only stores WHO is logged in.
 * Login and Register are handled directly in Login.jsx / Register.jsx using AJAX.
 * After a successful AJAX login, those pages call setUser() to update this context.
 */
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCurrentUser } from '../api/auth';
import { clearAuthSession, getStoredUser, getToken, updateStoredUser } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);

  // On app load: if token exists, ask Laravel "who am I?"
  useEffect(() => {
    async function loadUser() {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchCurrentUser();
        setUser(userData);
        updateStoredUser(userData);
      } catch {
        clearAuthSession();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  /** Called from Login.jsx / Register.jsx after successful AJAX */
  function setUserAfterLogin(userData) {
    setUser(userData);
  }

  /** Called from Navbar.jsx after logout AJAX */
  function clearUser() {
    setUser(null);
    clearAuthSession();
  }

  /** Called from Profile.jsx after profile update */
  function updateUser(userData) {
    setUser(userData);
    updateStoredUser(userData);
  }

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ user, loading, setUserAfterLogin, clearUser, updateUser, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
