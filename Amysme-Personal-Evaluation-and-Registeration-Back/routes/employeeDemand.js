var express = require('express');
var router = express.Router();
const employeeDemand = require("../models/employeeDemand.models")
const { v4: uuidv4 } = require('uuid');

router.post("/add", async (req, res) => {
    const demand = new employeeDemand({
        demandId: uuidv4(),
        userId: req.body.userId,
        reason: req.body.reason,
        comment: req.body.comment,
        status: 0
    });
    try {
        await demand.save();
        res.send(demand);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/", async (req, res) => {
    const demands = await employeeDemand.find({});

    try {
        res.send(demands);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/update", async (req, res) => {
    try {
        await employeeDemand.updateOne({_id: req.body._id}, {$set: req.body})
        res.send("updated successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;