import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Group } from "../models/Group";
import { validateSchema } from "../middlewares/validation.middleware";
import { createGroupSchema, updateGroupSchema } from "../schemas/group.schema";

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

// POST - add new Group w validation
groupsRouter.post("/", validateSchema(createGroupSchema), async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  let groupToAdd: Group = req.body as Group;
  await collection.insertOne(groupToAdd);
  res.send(groupToAdd).status(200);
});

// PUT - edit Group w validation
groupsRouter.put("/:id", validateSchema(updateGroupSchema), async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const id = new ObjectId(req.params.id);
  const groupToUpdate: Group = req.body as Group;
  const mongoRes = await collection.updateOne(
    { _id: id },
    { $set: groupToUpdate }
  );
  if (mongoRes.modifiedCount > 0) {
    res.send(groupToUpdate).status(200);
    return;
  }
  return res.sendStatus(500);
});

// DELETE - delete Group
groupsRouter.delete("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const id = new ObjectId(req.params.id);
  await collection.deleteOne({ _id: id });
  res.sendStatus(200);
});

export { groupsRouter };
