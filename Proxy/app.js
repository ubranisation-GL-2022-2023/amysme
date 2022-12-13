const express = require("express");
const axios = require("axios");
const cors = require("cors")
const bodyParser = require('body-parser')

var { Publisher } = require("./rabbitmq/publisher");

const CLOUDAMQP_URL =
  "amqps://ssloczgx:Ga1orj494MmGG5R5FYTr5orsvVQY6rh5@stingray.rmq.cloudamqp.com/ssloczgx";

var publisherHrOptions = {
  exchange: "HR_Exchange",
  type: "topic",
  url: CLOUDAMQP_URL,
};

var publisherHr = new Publisher(publisherHrOptions);

var publisherDocumentsOptions = {
  exchange: "Documents_Exchange",
  type: "topic",
  url: CLOUDAMQP_URL,
};

var publisherDocuments = new Publisher(publisherDocumentsOptions);

var publisherReportsOptions = {
  exchange: "Reports_Exchange",
  type: "topic",
  url: CLOUDAMQP_URL,
};

var publisherReports = new Publisher(publisherReportsOptions);

const app = express();
const port = 3010;
app.use(cors())
app.use(bodyParser.json());

app.get("/demand", async (req, res) => {
  // const message = req.params.message;
  const demand = {
    _id: "63962732c6fd4e09ae9de60r",
    demandId: "36a14bf0-4c2f-43be-bb2d-0a673d0fb151",
    userId: "5684",
    reason: "1",
    comment: "Its a demand",
    status: "2",
  };

  await publisherHr.publish("demands", JSON.stringify(demand));
  res.send(`you message is : demand`);
});

app.post("/reclammation", async (req, res) => {
  // const message = req.params.message;
  console.log(req.body)

  await publisherHr.publish("reclammations", JSON.stringify(req.body));
  res.send(`you message is : reclammation`);
});

app.get("/candidature", async (req, res) => {
  // const message = req.params.message;
  const candidature = {
    _id: "63962569c6fd4e09ae9dz608",
    languages: ["Arabe", "English", null, null],
    softSkills: ["Negotiation", "TALK"],
    technicalSkills: ["C#"],
    education: ["INSAT", "BAC"],
    workExperience: ["5"],
    rating: 1.5,
    status: "0",
    candidatureId: "98b96304-014e-4841-a6b7-a33013cfc68f",
    userId: "026c48bc-5679-447a-a031-6f0d4068928",
  };

  axios
    .get("http://localhost/5000/pdf/cv/cv.pdf")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  await publisherHr.publish("candidatures", JSON.stringify(candidature));
  res.send(`you message is : candidature`);
});

app.post("/projectDemand", async (req, res) => {
  const clientDemand = req.body;
  console.log(req.body)
  // const clientDemand = {
  //   userId: "58",
  //   surface: "10000",
  //   max_budget: "100000",
  //   rooms: "5",
  // };

  await publisherDocuments.publish(
    "generated_data",
    JSON.stringify({ type: "other", content: clientDemand })
  );
  res.send(`you message is : client demand`);
});

app.get("/contract", async (req, res) => {
  // const message = req.params.message;

  axios
    .get("http://localhost/5000/pdf/contract/contract.pdf")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  res.send(`you message is : client contract`);
});

app.listen(port, async () => {
  await publisherHr.start();
  await publisherDocuments.start();
  console.log(`Example app listening on port ${port}`);
});
