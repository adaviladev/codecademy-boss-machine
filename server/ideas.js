const express = require("express");
const ideasRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("ideas"));
});

ideasRouter.get("/:ideaId", (req, res) => {
  const idea = getFromDatabaseById("ideas", req.params.ideaId);
  if (!idea) {
    res.status(404).send();
  } else {
    res.send(idea);
  }
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res) => {
  res.status(201).send(addToDatabase("ideas", req.body));
});

ideasRouter.put("/:ideaId", (req, res) => {
  const idea = updateInstanceInDatabase("ideas", req.body);
  if (idea === null) {
    res.status(404).send();
  } else {
    res.send(idea);
  }
});

ideasRouter.delete("/:ideaId", (req, res) => {
  const idea = getFromDatabaseById("ideas", req.params.ideaId);
  if (!idea) {
    res.sendStatus(404);
  } else {
    deleteFromDatabasebyId("ideas", req.params.ideaId);
    res.sendStatus(204);
  }
});

module.exports = ideasRouter;
