const express = require("express");
const { ObjectId } = require("mongodb");
const mongoUtil = require("../utils/mongoUtil");
var db = mongoUtil.getDB();

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.query.userId) {
    const userId = req.query.userId;
    try {
      const adminChannels = await db
        .collection("channels")
        .find({ userId: userId })
        .toArray();
      res.status(200).json(adminChannels);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    try {
      const channels = await db.collection("channels").find({}).toArray();
      res.status(200).json(channels);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const singleChannel = await db
      .collection("channels")
      .findOne({ _id: ObjectId(_id) });
    res.status(200).json(singleChannel);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

router.post("/", async (req, res) => {
  try {
    data = req.body;
    const channel = await db.collection("channels").insertOne(data);
    if (channel.acknowledged) {
      try {
        const newChannel = await db
          .collection("channels")
          .findOne({ _id: channel.insertedId });
        res.status(200).json(newChannel);
      } catch (error) {
        res.status(400).json({ success: false });
      }
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

router.patch("/edit/:id", async (req, res) => {
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

router.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const channel = await db
      .collection("channels")
      .deleteOne({ _id: ObjectId(_id) });
    if (channel.acknowledged) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
