import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch('/api/v1/users/isLoggedIn', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();

      if (res.ok && data.loggedIn) {
        setLoggedIn(true);
        setUser(data.user);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    } catch {
      setLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/v1/users/logout', {
        method: 'GET',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setLoggedIn(false);
      setUser(null);
      window.location.href = '/';
    }
  };

  const isAdmin = loggedIn && user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ loggedIn, user, isAdmin, loading, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
