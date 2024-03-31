import mongoose, { mongo } from "mongoose";

// define schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = new mongoose.model("blog", blogSchema);

export default Blog;
