const express = require("express");
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

minionsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.get("/:minionId", (req, res) => {
  const minion = getFromDatabaseById("minions", req.params.minionId);
  if (!minion) {
    res.status(404).send();
  } else {
    res.send(minion);
  }
});

minionsRouter.post("/", (req, res) => {
  res.status(201).send(addToDatabase("minions", req.body));
});

minionsRouter.put("/:minionId", (req, res) => {
  const minion = updateInstanceInDatabase("minions", req.body);
  if (minion === null) {
    res.status(404).send();
  } else {
    res.send(minion);
  }
});

minionsRouter.delete("/:minionId", (req, res) => {
  const minion = getFromDatabaseById("minions", req.params.minionId);
  if (!minion) {
    res.sendStatus(404);
  } else {
    deleteFromDatabasebyId("minions", req.params.minionId);
    res.sendStatus(204);
  }
});

module.exports = minionsRouter;
