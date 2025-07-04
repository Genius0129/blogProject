import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updatePost, fetchPosts } from "../store/postsSlice"; // Import actions

function UpdatePost() {
  const { id } = useParams(); // Get the postId from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the Redux state (posts and loading/error status)
  const { posts, loading, error } = useSelector((state) => state.posts);

  // Find the post that matches the ID from the URL
  const post = posts.find((post) => post._id === id);

  // State for form fields
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts()); // Fetch all posts if the post is not found in Redux state
    }
  }, [dispatch, post]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check if the form is valid
    if (!title || !content) return;

    // Dispatch update action with the updated data
    const updatedPost = { title, content };
    const res = await dispatch(updatePost({ postId: id, updatedPost }));

    // Check if update was successful and redirect to the updated post
    if (res.type === "posts/updatePost/fulfilled") {
      navigate(`/`);
    } else {
      alert("Failed to update post");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!post) {
    return <div className="text-center mt-5">Post not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Update Blog Post</h3>

          {/* Show error message if there's an error */}
          {error && <div className="text-danger">{error}</div>}

          <form onSubmit={handleUpdate}>
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
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
