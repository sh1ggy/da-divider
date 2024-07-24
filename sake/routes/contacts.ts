import express from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Contact } from "../models/Contact";

const contactsCollectionName = "contacts";
const router = express.Router();

let collection = db.collection(contactsCollectionName);

// GET - all contacts
router.get("/", async (_, res) => {
  let contacts = await collection.find({}).toArray();
  res.send(contacts).status(200);
});

// GET - contact by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let query = { _id: new ObjectId(id) };
  let contact = await collection.findOne(query);
  res.send(contact).status(200);
});

export default router;
