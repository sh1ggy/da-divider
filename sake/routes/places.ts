import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Place } from "../models/Place";

const placesCollectionName = "places";
const placesRouter = express.Router();

// GET - all Places
placesRouter.get("/", async (_, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const places = await collection.find({}).toArray();
  if (places.length === 0) {
    res.sendStatus(404);
    return;
  }
  res.send(places).status(200);
});

// POST - new Place
placesRouter.post("/", async (req: Request, res: Response) => {
  const collection = db.collection(placesCollectionName);
  let placeToAdd: Place = req.body as Place;
  placeToAdd.date = new Date();

  await collection.insertOne(placeToAdd);
  res.send(placeToAdd).status(200);
});

// PUT - edit Place
placesRouter.put("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const id = new ObjectId(req.params.id);
  const placeToUpdate = req.body as Place;
  const mongoRes = await collection.updateOne(
    { id: id },
    { $set: placeToUpdate }
  );
  if (mongoRes && mongoRes.modifiedCount > 0) {
    res.send(placeToUpdate).status(200);
    return;
  }
  return res.sendStatus(500);
});

// DELETE - delete Place
placesRouter.delete("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const id = new ObjectId(req.params.id);
  const mongoRes = await collection.deleteOne({_id: id});
  if (mongoRes && mongoRes.deletedCount > 0) {
    res.send(id).status(200);
    return;
  }
  res.sendStatus(500);
});

export { placesRouter };
