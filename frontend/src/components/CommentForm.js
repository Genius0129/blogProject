import React, { useState } from "react";
import axios from "axios";

function CommentForm({ postId, onAdd }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return alert("All fields are required.");

    const res = await axios.post(
      `http://localhost:5000/api/comments/${postId}`,
      { name, message }
    );
    onAdd(res.data);
    setName("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-success" type="submit">
        Add Comment
      </button>
    </form>
  );
}

export default CommentForm;
