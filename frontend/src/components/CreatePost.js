import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../store/postsSlice';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const res = await dispatch(createPost({ title, content }));
      console.log("============>res", res);

      navigate(`/`);
    } catch (err) {
      console.log("===========>err", err);
      alert('Failed to create post');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Create New Blog Post</h3>
          
          {/* Show loading spinner when request is in progress */}
          {loading && <div>Loading...</div>}

          {/* Show error message if there's an error */}
          {error && <div className="text-danger">{error}</div>}

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
            <button className="btn btn-primary" type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
