import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Place, PlaceContact } from "../models/Place";
import { validateSchema } from "../middlewares/validation.middleware";
import { createPlaceSchema, updatePlaceSchema } from "../schemas/place.shema";
import { Item } from "../models/Item";

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

// GET - Place by ID
placesRouter.get("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const place: Place | undefined = (await collection.findOne(query)) as Place;

  if (!place) return res.sendStatus(404); // err handling
  res.send(place).status(200);
});

// POST - new Place
placesRouter.post(
  "/",
  validateSchema(createPlaceSchema),
  async (req: Request, res: Response) => {
    const collection = db.collection(placesCollectionName);
    let placeToAdd: Place = req.body as Place;
    placeToAdd.date = new Date();
    console.log(placeToAdd);
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

// GET - total of item prices in Place
placesRouter.get("/:id/total", async (req: Request, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const place: Place | undefined = (await collection.findOne(query)) as Place;

  if (!place || !place.items) return res.sendStatus(404); // err handling

  // Calculate total of items
  type ContactTotal = {
    contactName: string;
    total: number;
  };

  const totalPerContact: ContactTotal[] = [];

  // Calculate total
  place.contacts.forEach((contact: PlaceContact) => {
    if (!contact.itemAssignments) return; // Early return

    // Calculate total per contact & push to totalPerContact structure
    let contactTotal: number = 0;
    contact.itemAssignments.forEach((item: Item) => {
      contactTotal += item.price;
    });
    totalPerContact.push({ contactName: contact.name, total: contactTotal });
  });

  res.send(totalPerContact).status(200);
});

export { placesRouter };
