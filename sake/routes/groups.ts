import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Group } from "../models/Group";

const groupsCollectionName = "groups";
const groupsRouter = express.Router();

// GET - all Groups
groupsRouter.get("/", async (_, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const groups: Group[] | undefined = (await collection
    .find({})
    .toArray()) as Group[];
  if (!groups || groups.length === 0) {
    res.sendStatus(404);
    return;
  }
  res.send(groups).status(200);
});

// GET - Group by ID
groupsRouter.get("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const group: Group | undefined = (await collection.findOne(query)) as Group;
  if (!group) {
    res.sendStatus(500);
    return;
  }
  res.send(group).status(200);
});

// POST - add new Group
groupsRouter.post("/", async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  let groupToAdd: Group = req.body as Group;
  await collection.insertOne(groupToAdd);
  res.send(groupToAdd).status(200);
});

// PUT - edit Group
groupsRouter.put("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const id = new ObjectId(req.params.id);
  const groupToUpdate: Group = req.body as Group;
  await collection.updateOne({ _id: id }, { $set: groupToUpdate });
  res.send(groupToUpdate).status(200);
});

groupsRouter.delete("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const id = new ObjectId(req.params.id);
  await collection.deleteOne({ _id: id });
  res.sendStatus(200);
});

export { groupsRouter };
