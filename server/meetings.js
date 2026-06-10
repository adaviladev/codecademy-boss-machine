const express = require("express");
const meetingsRouter = express.Router();
const {
  getAllFromDatabase,
  createMeeting,
  addToDatabase,
  deleteAllFromDatabase,
} = require("./db");

meetingsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res) => {
  const newMeeting = createMeeting();
  const savedMeeting = addToDatabase("meetings", newMeeting);
  res.status(201).send(savedMeeting);
});

meetingsRouter.delete("/", (req, res) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

module.exports = meetingsRouter;
