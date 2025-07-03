// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import CommentForm from './CommentForm';

// function PostDetail() {
//   const { id } = useParams();
//   const [post, setPost] = useState({});
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/posts/${id}`)
//       .then(res => setPost(res.data));

//     axios.get(`http://localhost:5000/api/comments/${id}`)
//       .then(res => setComments(res.data));
//   }, [id]);

//   const handleAddComment = (newComment) => {
//     setComments([newComment, ...comments]);
//   };

//   return (
//     <div>
//       <h2>{post.title}</h2>
//       <p>{post.content}</p>

//       <h3>Comments</h3>
//       <CommentForm postId={id} onAdd={handleAddComment} />

//       {comments.map(comment => (
//         <div key={comment._id}>
//           <strong>{comment.name}</strong>: {comment.message}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default PostDetail;

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data));
    axios.get(`http://localhost:5000/api/comments/${id}`)
      .then(res => setComments(res.data));
  }, [id]);

  const addComment = (newComment) => {
    setComments(prev => [newComment, ...prev]);
  };

  if (!post) return <div className="text-center mt-5">Loading post...</div>;

  return (
    <div className="container mt-5">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">{post.content}</p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h4 className="mb-3">Add a Comment</h4>
          <CommentForm postId={id} onAdd={addComment} />
        </div>
      </div>

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