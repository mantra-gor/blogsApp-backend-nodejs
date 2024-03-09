const Post = require("../models/post.model.js");
const Comment = require("../models/comment.model.js");

exports.createComments = async (req, res) => {
  try {
    const { post, user, commentBody } = req.body;
    const comment = new Comment({ post, user, commentBody });
    const savedComment = await comment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: savedComment._id },
      },
      { new: true }
    )
      .populate("comments")
      .exec();
    if (!updatedPost) {
      return res.status(500).json({
        success: false,
        message: " Internal Server Error",
        error: error,
      });
    }
    res.status(200).json({
      success: true,
      message: "Comment Added",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Internal Server Error",
      error: error,
    });
  }
};
