import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Group } from "../models/Group";
import { validateSchema } from "../middlewares/validation.middleware";
import { createGroupSchema, updateGroupSchema } from "../schemas/group.schema";
import { contactsRouter } from "./contacts";

export const groupsCollectionName = "groups";
const groupsRouter = express.Router();

groupsRouter.use("/contacts", contactsRouter)

// GET - all Groups
groupsRouter.get("/", async (_, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const groups: Group[] | undefined = (await collection
    .find({})
    .toArray()) as Group[];

  if (!groups) return res.sendStatus(500);
  if (groups.length === 0) return res.send(groups).status(404);
  res.send(groups).status(200);
});

// GET - Group by ID
groupsRouter.get("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const group: Group | undefined = (await collection.findOne(query)) as Group;

  if (!group) return res.sendStatus(404); // err handling
  res.send(group).status(200);
});



// POST - add new Group w validation
groupsRouter.post(
  "/",
  validateSchema(createGroupSchema),
  async (req: Request, res: Response) => {
    const collection = db.collection(groupsCollectionName);
    let groupToAdd: Group = req.body as Group;
    const result = await collection.insertOne(groupToAdd);

    if (!result) return res.sendStatus(500); // err handling
    res.send(result).status(200);
  }
);

// PUT - edit Group w validation
groupsRouter.put(
  "/:id",
  validateSchema(updateGroupSchema),
  async (req: Request, res: Response) => {
    const collection = db.collection(groupsCollectionName);
    const id = new ObjectId(req.params.id);
    const groupToUpdate: Group = req.body as Group;
    const result = await collection.updateOne(
      { _id: id },
      { $set: groupToUpdate }
    );

    if (!result) return res.sendStatus(500); // err handling
    if (result.modifiedCount <= 0) return res.sendStatus(304);
    res.send(result).status(200);
  }
);

// DELETE - delete Group
groupsRouter.delete("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const id = new ObjectId(req.params.id);
  const result = await collection.deleteOne({ _id: id });
  
  // Error handling & early returns
  if (!result) return res.sendStatus(500);
  if (result.deletedCount <= 0) return res.sendStatus(304);
  // Return success & result
  res.send(result).status(200);
});

export { groupsRouter };
