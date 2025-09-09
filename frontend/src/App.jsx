import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PostsList from './pages/PostsList';
import PostDetail from './pages/PostDetail';
import CreateEditPost from './pages/CreateEditPost';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { api } from './api';

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  async function fetchUser() {
    setLoadingUser(true);
    try {
      const u = await api.getMe();
      setUser(u);
    } catch (e) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={async ()=>{ await api.logout(); setUser(null); }} />
      <main className="max-w-3xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<PostsList user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:id" element={<PostDetail user={user} />} />
          <Route path="/create" element={user ? <CreateEditPost user={user} onSaved={() => { window.location.href = '/'; }} /> : <Navigate to="/login" replace />} />
          <Route path="/edit/:id" element={user ? <CreateEditPost user={user} /> : <Navigate to="/login" replace />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
