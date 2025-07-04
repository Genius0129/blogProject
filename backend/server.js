import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; // Updated to ES module import

import postRoutes from "./routes/postRoutes.js"; // Updated to ES module import
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing x-www-form-urlencoded

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
