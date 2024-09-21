import express, { Request, Response } from "express";
import { db } from "../server";
import { placesCollectionName } from "./places";
import { ObjectId } from "mongodb";
import { Place } from "../models/Place";
import { Item } from "../models/Item";

const itemsRouter = express.Router();

// GET - all Items for a Place
itemsRouter.get("/:placeId/items", async (req: Request, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const { placeId } = req.params;
  const query = { _id: new ObjectId(placeId) };

  // Find group
  const place: Place | undefined = (await collection.findOne(query)) as Place;
  if (!place) return res.sendStatus(404);

  // Perform contact transaction
  const items: Item[] = place.items;
  if (!items) return res.sendStatus(500);
  if (items.length === 0) return res.send(place).status(404);

  res.send(items).status(200);
});

export { itemsRouter };
