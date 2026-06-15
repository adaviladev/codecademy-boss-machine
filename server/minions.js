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

minionsRouter.get("/:minionId/work", (req, res) => {
  const minion = getFromDatabaseById("minions", req.params.minionId);
  if (!minion) {
    res.status(404).send();
  } else {
    const allWork = getAllFromDatabase("work");
    const minionWork = allWork.filter((work) => {
      return work.minionId === req.params.minionId;
    });
    res.send(minionWork);
  }
});

minionsRouter.post("/:minionId/work", (req, res) => {
  const minion = getFromDatabaseById("minions", req.params.minionId);
  if (!minion) {
    res.status(404).send();
  } else {
    req.body.minionId = req.params.minionId;
    const newWork = addToDatabase("work", req.body);
    res.status(201).send(newWork);
  }
});

minionsRouter.post("/", (req, res) => {
  res.status(201).send(addToDatabase("minions", req.body));
});

minionsRouter.put("/:minionId/work/:workId", (req, res) => {
  const minion = getFromDatabaseById("minions", req.params.minionId);
  if (!minion) {
    return res.status(404).send();
  }
  const work = getFromDatabaseById("work", req.params.workId);
  if (!work) {
    return res.status(404).send();
  }
  if (work.minionId !== req.params.minionId) {
    return res.status(400).send();
  }
  req.body.id = req.params.workId;
  req.body.minionId = req.params.minionId;
  const updatedWork = updateInstanceInDatabase("work", req.body);
  res.send(updatedWork);
});

minionsRouter.put("/:minionId", (req, res) => {
  const minion = updateInstanceInDatabase("minions", req.body);
  if (minion === null) {
    res.status(404).send();
  } else {
    res.send(minion);
  }
});

minionsRouter.delete("/:minionId/work/:workId", (req, res) => {
  const minion = getFromDatabaseById("minions", req.params.minionId);
  if (!minion) {
    return res.status(404).send();
  }
  const work = getFromDatabaseById("work", req.params.workId);
  if (!work) {
    return res.status(404).send();
  }
  if (work.minionId !== req.params.minionId) {
    return res.status(400).send();
  }
  deleteFromDatabasebyId("work", req.params.workId);
  res.sendStatus(204);
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
