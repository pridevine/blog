import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';

export default function CreateEditPost({ user, onSaved }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const p = await api.getPost(id);
        setTitle(p.title);
        setContent(p.content);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert('Title and content required');
    try {
      if (id) {
        await api.updatePost(id, { title, content });
      } else {
        await api.createPost({ title, content });
      }
      if (onSaved) onSaved();
      else nav('/');
    } catch (e) { console.error(e); alert('Save failed'); }
  }

  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{id ? 'Edit post' : 'Create post'}</h2>
      {loading ? <div>Loading...</div> : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full p-2 border rounded" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
          <textarea className="w-full p-2 border rounded" rows="10" value={content} onChange={e=>setContent(e.target.value)} placeholder="Write your post..." />
          <div>
            <button className="px-4 py-2 bg-green-600 text-white rounded">{id ? 'Update' : 'Create'}</button>
          </div>
        </form>
      )}
    </div>
  );
}
