import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import CommentList from '../components/CommentList';

export default function PostDetail({ user }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const p = await api.getPost(id);
      setPost(p);
      const c = await api.getComments(id);
      setComments(c || []);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, [id]);

  async function handleDelete() {
    if (!confirm('Delete this post?')) return;
    await api.deletePost(id);
    nav('/');
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!user) { nav('/login'); return; }
    if (!commentText.trim()) return;
    await api.addComment(id, commentText);
    setCommentText('');
    await load();
  }

  async function toggleLike() {
    if (!user) { nav('/login'); return; }
    try {
      if (post.user_liked) await api.unlikePost(id);
      else await api.likePost(id);
      await load();
    } catch(e) { console.error(e); }
  }

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="text-sm text-gray-500">By {post.author_name} • {new Date(post.created_at).toLocaleString()}</div>
        </div>
        <div>
          {user && post.author_id === user.id && (
            <>
              <Link to={`/edit/${post.id}`} className="mr-2 px-2 py-1 bg-yellow-300 rounded">Edit</Link>
              <button onClick={handleDelete} className="px-2 py-1 bg-red-400 text-white rounded">Delete</button>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 text-gray-800 whitespace-pre-wrap">{post.content}</div>

      <div className="mt-6 flex items-center space-x-3">
        <div>{post.likes_count ?? 0} likes</div>
        <button onClick={toggleLike} className="px-2 py-1 bg-gray-100 rounded">{post.user_liked ? 'Unlike' : 'Like'}</button>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold">Comments</h3>
        <CommentList comments={comments} />
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mt-3">
            <textarea className="w-full p-2 border rounded" rows="3" value={commentText} onChange={e=>setCommentText(e.target.value)} />
            <div className="mt-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded">Add comment</button>
            </div>
          </form>
        ) : (
          <div className="mt-3"><Link to="/login" className="text-blue-600">Sign in to comment</Link></div>
        )}
      </section>
    </div>
  );
}
