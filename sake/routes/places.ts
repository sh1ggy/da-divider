import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Place } from "../models/Place";
import { validateSchema } from "../middlewares/validation.middleware";
import { createPlaceSchema, updatePlaceSchema } from "../schemas/place.shema";

const placesCollectionName = "places";
const placesRouter = express.Router();

// GET - all Places
placesRouter.get("/", async (_, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const places = await collection.find({}).toArray();

  // Error handling & early returns
  if (!places) return res.sendStatus(500);
  if (places.length === 0) return res.sendStatus(404);
  res.send(places).status(200); // Success
});

// POST - new Place
placesRouter.post(
  "/",
  validateSchema(createPlaceSchema),
  async (req: Request, res: Response) => {
    const collection = db.collection(placesCollectionName);
    let placeToAdd: Place = req.body as Place;
    placeToAdd.date = new Date();
    const result = await collection.insertOne(placeToAdd);

    // Error handling & early returns
    if (!result) return res.sendStatus(500);
    res.send(placeToAdd).status(200); // Success
  }
);

// PUT - edit Place
placesRouter.put(
  "/:id",
  validateSchema(updatePlaceSchema),
  async (req: Request, res: Response) => {
    const collection = db.collection(placesCollectionName);
    const id = new ObjectId(req.params.id);
    const placeToUpdate = req.body as Place;
    const result = await collection.updateOne(
      { id: id },
      { $set: placeToUpdate }
    );

    // Error handling & early returns
    if (!result) return res.sendStatus(500);
    if (result.modifiedCount <= 0) return res.sendStatus(304);
    return res.sendStatus(200); // Success
  }
);

// DELETE - delete Place
placesRouter.delete("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const id = new ObjectId(req.params.id);
  const result = await collection.deleteOne({ _id: id });

  // Error handling & early returns
  if (!result) return res.sendStatus(500);
  if (result.deletedCount <= 0) res.send(result).status(304);
  res.send(id).status(200); // Success
});

export { placesRouter };
