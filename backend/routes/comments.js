const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const verifyToken = require("../middleware/auth");

router.get("/:topicId", async (req, res) => {
  try {
    const comments = await Comment.find({ topicId: req.params.topicId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { topicId, text } = req.body;
    const newComment = new Comment({
      topicId,
      text,
      user: {
        id: req.user.id,
        username: req.user.username || "Anonymous",
        avatar: req.user.avatar || "",
      },
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
      replies: [],
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/reaction", verifyToken, async (req, res) => {
  try {
    const { type } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const userId = req.user.id;

    comment.likedBy = comment.likedBy || [];
    comment.dislikedBy = comment.dislikedBy || [];

    const liked = comment.likedBy.includes(userId);
    const disliked = comment.dislikedBy.includes(userId);

    if (type === "like") {
      if (liked) {
        comment.likedBy = comment.likedBy.filter((id) => id !== userId);
      } else {
        comment.likedBy.push(userId);
        if (disliked) {
          comment.dislikedBy = comment.dislikedBy.filter((id) => id !== userId);
        }
      }
    } else if (type === "dislike") {
      if (disliked) {
        comment.dislikedBy = comment.dislikedBy.filter((id) => id !== userId);
      } else {
        comment.dislikedBy.push(userId);
        if (liked) {
          comment.likedBy = comment.likedBy.filter((id) => id !== userId);
        }
      }
    }

    comment.likes = comment.likedBy.length;
    comment.dislikes = comment.dislikedBy.length;

    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/:id/reply", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const newReply = {
      _id: new Date().getTime().toString(),
      user: {
        id: req.user.id,
        username: req.user.username || "Anonymous",
        avatar: req.user.avatar || "",
      },
      text,
      createdAt: new Date(),
    };

    comment.replies = comment.replies || [];
    comment.replies.push(newReply);

    await comment.save();
    res.json(newReply);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
