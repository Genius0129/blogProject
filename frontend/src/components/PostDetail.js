import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment } from "../store/commentsSlice";
import { fetchPosts } from "../store/postsSlice";
import CommentForm from "./CommentForm";

export default function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, loading: postsLoading, error: postsError } = useSelector((state) => state.posts);
  const { comments, loading: commentsLoading, error: commentsError } = useSelector((state) => state.comments);

  const post = posts.find((post) => post._id === id);

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts()); // Dispatch action to fetch all posts if not found in the Redux state
    }
    // Fetch comments for the specific post
    dispatch(fetchComments(id));
  }, [dispatch, id, post]);

  const addNewComment = (newComment) => {
    dispatch(addComment({ postId: id, ...newComment })); // Dispatch action to add comment
  };

  const handleBack = () => {
    navigate(`/`);
  };

  if (postsLoading || commentsLoading)
    return <div className="text-center mt-5">Loading post...</div>;

  if (postsError || commentsError)
    return <div className="text-center mt-5 text-danger">{postsError || commentsError}</div>;

  if (!post) return <div className="text-center mt-5">Post not found</div>;

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="back-button-container">
        <button className="btn btn-secondary mb-4" onClick={handleBack}>
          Back
        </button>
      </div>

      {/* Post details */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">{post.content}</p>
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="mb-3">Add a Comment</h4>
          <CommentForm postId={id} onAdd={addNewComment} />
        </div>
      </div>

      {/* Comments Section */}
      <div className="card">
        <div className="card-body">
          <h4 className="mb-3">Comments</h4>
          {comments.length === 0 ? (
            <p className="text-muted">No comments yet.</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="border-bottom pb-2 mb-2">
                <strong>{c.name}</strong>
                <p className="mb-1">{c.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
