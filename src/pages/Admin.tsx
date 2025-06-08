
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import AdminLogin from '@/components/Admin/AdminLogin';
import AdminDashboard from '@/components/Admin/AdminDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username: string, password: string) => {
    // Simple authentication check - in production this would be handled by backend
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <AdminLogin onLogin={handleLogin} />
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminDashboard onLogout={handleLogout} />
    </Layout>
  );
};

export default Admin;
