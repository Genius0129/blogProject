import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const res = await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
      });
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Create New Blog Post</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}
