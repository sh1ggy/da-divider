import express from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Contact } from "../models/Contact";

const placesCollectionName = "places";
const placesRouter = express.Router();

// GET - all contacts
placesRouter.get("/", async (_, res) => {
  const collection = db.collection(placesCollectionName);
  const places = await collection.find({}).toArray();
  if (places.length === 0) res.sendStatus(404);
  res.send(places).status(200);
});

export { placesRouter };