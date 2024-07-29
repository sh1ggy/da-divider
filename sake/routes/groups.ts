import express from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Group } from "../models/Group";

const groupsCollectionName = "groups";
const groupsRouter = express.Router();

// GET - all Groups
groupsRouter.get("/", async (_, res) => {
  const collection = db.collection(groupsCollectionName);
  const groups = await collection.find({}).toArray();
  if (groups.length === 0) res.sendStatus(404);
  res.send(groups).status(200);
});

// GET - Group by ID
groupsRouter.get("/:id", async (req, res) => {
  const collection = db.collection(groupsCollectionName);
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const group = await collection.findOne(query);
  res.send(group).status(200);
});

// POST - add new Group
groupsRouter.post("/", async (req, res) => {
  const collection = db.collection(groupsCollectionName);
  let groupToAdd: Group = req.body as Group;
  await collection.insertOne(groupToAdd);
  res.send(groupToAdd).status(200);
});

// PUT - edit Group
groupsRouter.put("/:id", async (req, res) => {
  const collection = db.collection(groupsCollectionName);
  const { id } = req.params;
  const groupToUpdate: Group = req.body as Group;
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: groupToUpdate }
  );
  res.send(groupToUpdate).status(200);
});

export { groupsRouter };