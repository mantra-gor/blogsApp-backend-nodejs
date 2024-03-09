const Like = require("../models/like.model.js");
const Post = require("../models/post.model.js");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { likes: savedLike._id },
      },
      { new: true }
    ).populate("likes");

    res.status(200).json({
      success: true,
      message: "Successfuly Liked a Post",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    const unlike = await Like.findOneAndDelete({ post: post, _id: like });

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $pull: { likes: unlike._id },
      },
      { new: true }
    );
    if (!updatedPost) {
      res.status(500).json({
        success: false,
        message: " Internal Server Error",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post Unliked",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
