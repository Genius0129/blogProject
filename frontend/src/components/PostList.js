import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
    console.log("==========>posts", posts);
  }, []);

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
                <p className="card-text">{post.content.slice(0, 100)}...</p>
                <Link to={`/posts/${post._id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    //   <div className="container mt-4">
    //   <h1 className="mb-4">Blog Posts</h1>
    //   <div className="row">
    //     {posts.map(post => (
    //       <div className="col-md-6 mb-3" key={post._id}>
    //         <div className="card h-100">
    //           <div className="card-body">
    //             <h5 className="card-title">{post.title}</h5>
    //             <p className="card-text">{post.content.slice(0, 100)}...</p>
    //             <Link to={`/posts/${post._id}`} className="btn btn-primary">Read More</Link>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default PostList;
