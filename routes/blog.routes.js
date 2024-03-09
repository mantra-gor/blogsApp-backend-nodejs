const express = require("express");
const router = express.Router();

const { createComments } = require("../controllers/comment.controller.js");
const {
  createPost,
  getAllPosts,
} = require("../controllers/post.controller.js");
const { likePost, unlikePost } = require("../controllers/like.controller.js");

router.post("/comments/create", createComments);
router.post("/posts/create", createPost);
router.get("/posts/", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

module.exports = router;
