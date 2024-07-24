import express from "express";
import { db } from "../server";
import { ObjectId } from "mongodb";
import { Contact } from "../models/Contact";

const contactsCollectionName = "contacts";
const contactsRouter = express.Router();

// GET - all contacts
contactsRouter.get("/", async (_, res) => {
  const collection = db.collection(contactsCollectionName);
  const contacts = await collection.find({}).toArray();
  if (contacts.length === 0) res.send(404);
  res.send(contacts).status(200);
});

// GET - contact by ID
contactsRouter.get("/:id", async (req, res) => {
  const collection = db.collection(contactsCollectionName);
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const contact = await collection.findOne(query);
  res.send(contact).status(200);
});

contactsRouter.post("/", async (req, res) => {
  const collection = db.collection(contactsCollectionName);
  let contactToAdd: Contact = req.body as Contact;
  await collection.insertOne(contactToAdd);
  res.send(contactToAdd).status(200);
});

contactsRouter.put("/:id", async (req, res) => {
  const collection = db.collection(contactsCollectionName);
  const { id } = req.params;
  const contactToUpdate: Contact = req.body as Contact;
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: contactToUpdate }
  );
  res.send(contactToUpdate).status(200);
});

export { contactsRouter };
