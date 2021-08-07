const express = require("express");
const { ObjectId } = require("mongodb");
const mongoUtil = require("../utils/mongoUtil");
var db = mongoUtil.getDB();
const router = express.Router();

router.get("/", async (req, res) => {
  const postId = req.query.postId;
  try {
    const posts = await db
      .collection("posts")
      .find({ channelId: postId })
      .toArray();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const post = await db.collection("posts").insertOne(data);
    if (post.acknowledged) {
      try {
        const newPost = await db
          .collection("posts")
          .findOne({ _id: post.insertedId });
        res.status(200).json(newPost);
      } catch (error) {
        res.status(400).json({ success: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, h: "h" });
  }
});

router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const deletePost = await db
      .collection("posts")
      .deleteOne({ _id: ObjectId(_id) });
    if (deletePost.acknowledged) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
