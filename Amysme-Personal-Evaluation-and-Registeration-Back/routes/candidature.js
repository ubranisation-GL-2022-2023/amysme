const express = require("express");
const router = express.Router();
const Candidature = require('../models/candidature');
const uuid = require('uuid');


router.post('/register', async (req, res) => {
    console.log("req.body")
    try {
        console.log(req.body)
        let data = req.body;
        console.log(data);
        let candidature = new Candidature(data);
        candidature.candidatureId = uuid.v4();
        candidature.userId = uuid.v4();
        console.log(candidature);
        let savedCandidature = await candidature.save();
        res.send(savedCandidature)
        console.log(savedCandidature)

    } catch (error) {
        console.log(error)
        res.send(error)
    }

});

router.get('/all-candidature', async (req, res) => {
    console.log("req.body")
    try {
        candidatures = await Candidature.find();


        res.send(candidatures);

    } catch (error) {
        res.send(error)
    }

});


module.exports = router;