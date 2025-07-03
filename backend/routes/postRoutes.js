const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { body, validationResult } = require("express-validator");

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
router.post(
  "/",
  [
    body("title").isString().notEmpty().withMessage("Title is required"),
    body("content").isString().notEmpty().withMessage("Content is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "Missing title or content" });

    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  }
);

module.exports = router;
