const express = require("express");
const { ObjectId } = require("mongodb");
const mongoUtil = require("../utils/mongoUtil");
var db = mongoUtil.getDB();

const router = express.Router();

router.get("/channels", async (req, res) => {
  try {
    const channels = await db.collection("channels").find({}).toArray();
    res.status(200).json(channels);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

router.post("/channels", async (req, res) => {
  try {
    data = req.body;
    const channel = await db.collection("channels").insertOne(data);
    if (channel.acknowledged) {
      const newChannel = await db
        .collection("channels")
        .findOne({ _id: channel.insertedId });
      res.status(200).json(newChannel);
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

router.patch("/channel/edit/:id", async (req, res) => {
  try {
    const data = req.body;
    const _id = req.params.id;
    const editedChannel = await db
      .collection("channels")
      .updateOne({ _id: ObjectId(_id) }, { $set: data });
    if (editedChannel.acknowledged) {
      const channel = await db
        .collection("channels")
        .findOne({ _id: ObjectId(_id) });
      res.status(200).json(channel);
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

router.delete("/channel/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    await db.collection("channels").deleteOne({ _id: ObjectId(_id) });
    res.status(200);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
