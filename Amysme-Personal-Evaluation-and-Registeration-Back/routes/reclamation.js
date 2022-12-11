var express = require('express');
var router = express.Router();
const Reclamation = require("../models/reclamation.models")
const { v4: uuidv4 } = require('uuid');

router.post("/add", async (req, res) => {
  const reclamation = new Reclamation({
    reclamationId: uuidv4(),
    userId: req.body.userId,
    content: req.body.content,
    status: 0
  });
  try {
    await reclamation.save();
    res.send(reclamation);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  const reclamations = await Reclamation.find({});

  try {
    res.send(reclamations);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    await Reclamation.updateOne({_id: req.body._id}, {$set: req.body})
    res.send("updated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;