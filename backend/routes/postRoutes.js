import express from 'express';
import Post from '../models/Post.js';
import postSchema from '../validateSchema/postSchema.js';
import { validateInput } from '../utils/validate.js';

const router = express.Router();

// GET /posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// GET /posts/:id
router.get("/:id", async (req, res) => {
  await Post.findById(req.params.id)
    .then((post) => {
      res.json(post);
    })
    .catch(() => {
      return res.status(404).json({ message: "Post not found" });
    });
});

// POST /posts
router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const validation = validateInput(postSchema, req.body);  // Use helper function
  if (!validation.success) {
    return res.status(400).json({ message: validation.message });
  }

  const { title, content } = req.body;

  const newPost = new Post({ title, content });
  await newPost.save();
  res.status(201).json(newPost);
});

// PUT /posts/:id
router.put("/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const validation = validateInput(postSchema, req.body);  // Use helper function
  if (!validation.success) {
    return res.status(400).json({ message: validation.message });
  }

  const { title, content } = req.body;
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /posts/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    await Comment.deleteMany({ postId: req.params.id }); // clean up comments
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("============>err.message", err.message);
  }
});

export default router;
