const Post = require("../models/post.model.js");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();
    if (!savedPost) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error,
      });
    }
    res.status(200).json({
      success: true,
      message: "New Blog Added",
      data: savedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("likes").populate("comments");
    if (!posts) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error,
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetched All Posts",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
