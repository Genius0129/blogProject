import express from 'express';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { validateInput } from "../utils/validate.js";
import commentSchema from "../validateSchema/commentSchema.js";

const router = express.Router();

// GET /comments/:postId
router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).sort({
    createdAt: -1,
  });
  res.json(comments);
});

// POST /comments/:postId
router.post("/:postId", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const validation = validateInput(commentSchema, req.body); // Use helper function
  if (!validation.success) {
    return res.status(400).json({ message: validation.message });
  }

  const { name, message } = req.body;
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const newComment = new Comment({
    postId: req.params.postId,
    name,
    message,
  });

  await newComment.save();
  res.status(201).json(newComment);
});

// PUT /comments/:id
router.put("/comments/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const validation = validateInput(commentSchema, req.body); // Use helper function
  if (!validation.success) {
    return res.status(400).json({ message: validation.message });
  }

  const { name, message } = req.body;
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { name, message },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Comment not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /comments/:id
router.delete("/comments/:id", async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
