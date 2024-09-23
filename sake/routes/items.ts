import express, { Request, Response } from "express";
import { db } from "../server";
import { placesCollectionName } from "./places";
import { ObjectId, PushOperator } from "mongodb";
import { Place } from "../models/Place";
import { Item } from "../models/Item";
import { validateSchema } from "../middlewares/validation.middleware";
import { createItemSchema, updateItemSchema } from "../schemas/item.schema";

const itemsRouter = express.Router();

// GET - all Items for a Place
itemsRouter.get("/:placeId/items", async (req: Request, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const { placeId } = req.params;
  const query = { _id: new ObjectId(placeId) };

  // Find place by ID
  const place: Place | undefined = (await collection.findOne(query)) as Place;
  if (!place) return res.sendStatus(404);

  // Perform item transaction
  const items: Item[] = place.items;
  if (!items) return res.sendStatus(500);
  if (items.length === 0) return res.send(place).status(404);

  res.send(items).status(200);
});

// POST - add new Item to Place
itemsRouter.post(
  "/:placeId",
  validateSchema(createItemSchema),
  async (req: Request, res: Response) => {
    if (!req) {
      res.sendStatus(400);
      return;
    }
    const { placeId } = req.params;
    const collection = db.collection(placesCollectionName);
    let itemToAdd: Item = req.body as Item;
    itemToAdd._id = new ObjectId();

    // Updating Place with new Item
    const result = await collection.updateOne(
      { _id: new ObjectId(placeId) },
      {
        $push: {
          items: { ...itemToAdd },
        } as PushOperator<{ items: Item[] }>,
      }
    );
    if (!result) return res.sendStatus(500);
    if (result.modifiedCount <= 0) return res.send(result).status(404);

    res.send(result).status(200);
  }
);

// PUT - edit existing Item by Place ID and Item ID
itemsRouter.put(
  "/:placeId/item/:itemId",
  validateSchema(updateItemSchema),
  async (req: Request, res: Response) => {
    if (!req) {
      res.sendStatus(400);
      return;
    }
    const placeId = new ObjectId(req.params.placeId);
    const itemId = new ObjectId(req.params.itemId);
    const collection = db.collection(placesCollectionName);
    const itemToUpdate: Item = { id: itemId, ...req.body } as Item;

    // Perform transaction
    const result = await collection.updateOne(
      { _id: placeId },
      {
        $set: {
          "items.$[elem]": itemToUpdate,
        },
      },
      {
        arrayFilters: [
          {
            "elem._id": itemId,
          },
        ],
      }
    );

    if (!result) return res.sendStatus(500);
    if (result.modifiedCount <= 0) return res.send(result).status(304); // no changes

    res.send(result).status(200);
  }
);

// DELETE -- delete item
itemsRouter.delete(
  "/:placeId/item/:itemId",
  async (req: Request, res: Response) => {
    const placeId = new ObjectId(req.params.placeId);
    const itemId = new ObjectId(req.params.itemId);
    const collection = db.collection(placesCollectionName);
    const result = await collection.updateOne({ _id: placeId }, {
      $pull: { items: { id: itemId } },
    } as PushOperator<{
      items: Item[];
    }>);

    if (!result) return res.sendStatus(500);
    if (result.modifiedCount <= 0) return res.send(result).status(304); // no changes

    res.send(result).status(200);
  }
);

export { itemsRouter };
