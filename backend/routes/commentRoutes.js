const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// GET /comments/:postId
router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
  res.json(comments);
});

// POST /comments/:postId
router.post('/:postId', async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Name and message are required' });
  }

  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ message: 'Name and message are required' });

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const newComment = new Comment({
    postId: req.params.postId,
    name,
    message,
  });

  await newComment.save();
  res.status(201).json(newComment);
});

module.exports = router;