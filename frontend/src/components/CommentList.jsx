import React from 'react';

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) return <div className="text-sm text-gray-500 mt-2">No comments</div>;
  return (
    <div className="mt-3 space-y-3">
      {comments.map(c => (
        <div key={c.id} className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-700">{c.content}</div>
          <div className="text-xs text-gray-400 mt-1">By {c.author_name} • {new Date(c.created_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
