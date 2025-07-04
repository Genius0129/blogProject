import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../store/postsSlice";

function PostList() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };
  
  if (loading) {
    return <div className="text-center mt-5">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Blog Posts</h2>
        <Link to="/create" className="btn btn-primary">
          + Create Post
        </Link>
      </div>

      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6 mb-3" key={post._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                  {post.content.length > 100
                    ? `${post.content.slice(0, 100)}...`
                    : post.content}
                </p>
                <div className="d-flex justify-content-between">
                  <Link to={`/posts/${post._id}`} className="btn btn-primary">
                    Read More
                  </Link>
                  <div>
                    <Link
                      to={`/edit/${post._id}`} // Navigate to the edit page
                      className="btn btn-warning mx-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
