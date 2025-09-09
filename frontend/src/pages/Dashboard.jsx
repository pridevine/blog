// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/dashboard", { withCredentials: true })
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <div className="space-y-4">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold">My Posts</h2>
          <p>{summary.postsCount} posts</p>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold">My Likes</h2>
          <p>{summary.likesCount} likes</p>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold">My Comments</h2>
          <p>{summary.commentsCount} comments</p>
        </div>
      </div>
    </div>
  );
}
