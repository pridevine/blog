import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-lg">MyBlog</Link>
          <Link to="/" className="text-sm text-gray-600">Posts</Link>
          <Link to="/dashboard" className="text-sm text-gray-600">Dashboard</Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center space-x-3">
              <img src={user.avatar || '/placeholder.png'} alt="avatar" className="w-8 h-8 rounded-full" />
              <span className="text-sm text-gray-700">{user.name}</span>
              <button onClick={onLogout} className="ml-3 px-3 py-1 text-sm bg-red-500 text-white rounded">Logout</button>
            </div>
          ) : (
            <a href="/auth/google" className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Sign in with Google</a>
          )}
        </div>
      </div>
    </nav>
  );
}
