import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId, PushOperator } from "mongodb";
import { Contact, ContactUpdateRequest } from "../models/Contact";
import { Group } from "../models/Group";

const groupsCollectionName = "groups";
const contactsRouter = express.Router();

// GET - all Contacts for group
contactsRouter.get("/:id", async (req: Request, res: Response) => {
  const collection = db.collection(groupsCollectionName);
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const group: Group | undefined = (await collection.findOne(query)) as Group;
  if (!group) {
    res.sendStatus(404);
    return;
  }
  const contacts: Contact[] = group.contacts;
  if (contacts.length === 0) {
    res.sendStatus(404);
    return;
  }
  res.send(contacts).status(200);
});

// POST - add new Contact to Group
contactsRouter.post("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = db.collection(groupsCollectionName);
  let contactToAdd: Contact = req.body as Contact;
  const mongoRes = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        contacts: contactToAdd,
      } as unknown as PushOperator<{ contacts: Contact[] }>,
    }
  );
  if (mongoRes.modifiedCount > 0) {
    res.send(contactToAdd).status(200);
    return;
  }
  res.sendStatus(500);
});

// POST - add new Contact to Group
contactsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = db.collection(groupsCollectionName);
  let contactReq: ContactUpdateRequest = req.body as ContactUpdateRequest;
  
  // Locate group & contact to update
  const group = (await collection.findOne({
    _id: new ObjectId(id),
  })) as Group;
  if (!group) {
    res.sendStatus(404);
    return;
  }
  const contactToUpdateIndex = group.contacts.findIndex(
    (contact: Contact) => contact.email === contactReq.email
  );

  // Perform transaction
  const mongoRes = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        [`contacts.${contactToUpdateIndex}`]: contactReq.newContact,
      },
    }
  );

  if (mongoRes.modifiedCount > 0) {
    res.send(contactReq.newContact).status(200);
    return;
  }
  res.sendStatus(500);
});

export { contactsRouter };
