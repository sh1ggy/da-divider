import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId, PushOperator } from "mongodb";
import { Place, PlaceContact } from "../models/Place";
import { validateSchema } from "../middlewares/validation.middleware";
import { createPlaceSchema, updatePlaceSchema } from "../schemas/place.schema";
import { Item, ItemAssignment } from "../models/Item";
import { createItemAssignmentSchema } from "../schemas/item.schema";

export const placesCollectionName = "places";
const placesRouter = express.Router();

// GET - all Places for a group
placesRouter.get("/", async (req: Request, res: Response) => {
  const groupName = req.query.groupName;
  const collection = db.collection(placesCollectionName);
  const query = { groupName: groupName };
  const places = await collection.find(query).toArray();

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
    placeToAdd.itemAssignments = []; // empty array initialisation

    const result = await collection.insertOne(placeToAdd);

    // Error handling & early returns
    if (!result) return res.sendStatus(500);
    res.send(placeToAdd).status(200); // Success
  }
);

// PUT - edit Place
// TODO fix this edit to detect partial
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

// GET - total of item prices per Contact in Place
placesRouter.get("/:id/total", async (req: Request, res: Response) => {
  const collection = db.collection(placesCollectionName);
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  let place: Place | undefined = (await collection.findOne(query)) as Place;
  if (!place || !place.items) return res.sendStatus(404); // err handling

  // Calculate total of items
  type ContactTotal = {
    contactName: string;
    total: number;
  };

  const totalPerContact: ContactTotal[] = [];

  // For each item in the Place, count the amount of assigned contacts per item.
  place.items.forEach((item: Item) => {
    let assignedContactsCount = 0;
    place.itemAssignments.forEach((itemAssignment: ItemAssignment) => {
      // Early return if no match.
      if (item._id.toString() !== itemAssignment.itemId.toString()) {
        // console.log("No item found to add contact count to");
        return;
      }

      assignedContactsCount += 1;
    });
    item.assignedContactsCount = assignedContactsCount;
  });

  // For each contact in the Place calculate the total
  place.contacts.forEach((placeContact: PlaceContact) => {
    let placeContactTotal: number = 0; // var initialisation
    // For each item assignment in the Place, find matching items correlating to the current contact
    place.itemAssignments.forEach((itemAssignment: ItemAssignment) => {
      if (placeContact.id !== itemAssignment.contactId) return;

      // Commence calculation
      // -- Find relevant item to add to total
      const itemToAddToTotal: Item | undefined = place.items.find(
        (item: Item) => item._id.toString() === itemAssignment.itemId.toString()
      );

      // Return if there's no item
      if (itemToAddToTotal === undefined) {
        console.log("No item found...");
        return;
      }

      // Add to total
      placeContactTotal +=
        itemToAddToTotal.price / itemToAddToTotal.assignedContactsCount!;
    });

    // Push the total to the final object.
    totalPerContact.push({
      contactName: placeContact.name,
      total: placeContactTotal,
    });
  });

  // No total calculated
  if (totalPerContact.length === 0) return res.sendStatus(404);

  res.send(totalPerContact).status(200);
});

// POST -- add new itemAssignments in bulk to Place under Contact
placesRouter.post(
  "/:placeId/items/assign",
  validateSchema(createItemAssignmentSchema),
  async (req: Request, res: Response) => {
    if (!req) return res.sendStatus(400);

    const { placeId } = req.params;
    const collection = db.collection(placesCollectionName);
    let itemAssignmentsToAdd: ItemAssignment[] = req.body
      .itemAssignments as ItemAssignment[];

    // Updating Place with new ItemAssignments (bulk)
    const result = await collection.updateMany(
      { _id: new ObjectId(placeId) },
      {
        $addToSet: {
          itemAssignments: { $each: itemAssignmentsToAdd },
        } as PushOperator<{ itemAssignments: ItemAssignment[] }>,
      },
      { upsert: true }
    );

    if (!result) return res.sendStatus(500);
    if (result.modifiedCount <= 0) return res.send(result).status(404);

    return res.sendStatus(200);
  }
);

// DELETE -- remove itemAssignments from Place under Contact
// TODO - implement this

export { placesRouter };
