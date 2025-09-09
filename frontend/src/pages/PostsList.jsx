import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function PostsList({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await api.getPosts();
      setPosts(res);
    } catch(e) {
      console.error(e);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function toggleLike(post) {
    if (!user) { window.location.href = '/login'; return; }
    try {
      if (post.user_liked) {
        await api.unlikePost(post.id);
      } else {
        await api.likePost(post.id);
      }
      // refresh posts (cheap)
      await load();
    } catch (e) { console.error(e); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        {user && <Link to="/create" className="px-3 py-1 bg-green-600 text-white rounded">New Post</Link>}
      </div>

      {loading ? <div>Loading...</div> : posts.length === 0 ? <div>No posts yet</div> : (
        <div className="space-y-4">
          {posts.map(p => (
            <article key={p.id} className="bg-white p-4 rounded shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold"><Link to={`/posts/${p.id}`}>{p.title}</Link></h3>
                  <p className="text-xs text-gray-500">By {p.author_name} • {new Date(p.created_at).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm">{p.likes_count} likes</div>
                  <button onClick={() => toggleLike(p)} className="mt-2 px-2 py-1 text-sm bg-gray-100 rounded">
                    {p.user_liked ? 'Unlike' : 'Like'}
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">{p.content?.slice(0, 200)}{p.content?.length > 200 ? '...' : ''}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
