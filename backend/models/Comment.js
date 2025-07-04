import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;