import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId, PushOperator } from "mongodb";
import { Contact } from "../models/Contact";
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
contactsRouter.post("/:id", async (req: Request, res: Response) => {
  if (!req) {
    res.sendStatus(400);
    return;
  }
  const { id } = req.params;
  const collection = db.collection(groupsCollectionName);
  let contactToAdd: Contact = req.body as Contact;

  // Updating Group with new Contact
  const mongoRes = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        contacts: { id: new ObjectId(), ...contactToAdd },
      } as unknown as PushOperator<{ contacts: Contact[] }>,
    }
  );
  if (mongoRes.modifiedCount > 0) {
    res.send(contactToAdd).status(200);
    return;
  }
  res.sendStatus(500);
});

// PUT - edit existing Contact by Group ID and Contact ID
contactsRouter.put(
  "/:groupId/contact/:contactId",
  async (req: Request, res: Response) => {
    if (!req) {
      res.sendStatus(400);
      return;
    }
    const groupId = new ObjectId(req.params.groupId);
    const contactId = new ObjectId(req.params.contactId);
    const collection = db.collection(groupsCollectionName);
    let contactToUpdate: Contact = { _id: contactId, ...req.body } as Contact;

    // Perform transaction
    const mongoRes = await collection.updateOne(
      { _id: groupId },
      {
        $set: {
          "contacts.$[elem]": contactToUpdate,
        },
      },
      {
        arrayFilters: [
          {
            "elem._id": contactId,
          },
        ],
      }
    );

    if (mongoRes && mongoRes.modifiedCount > 0) {
      res.send(contactToUpdate).status(200);
      return;
    }
    res.sendStatus(500);
  }
);

contactsRouter.delete(
  "/:groupId/contact/:contactId",
  async (req: Request, res: Response) => {
    const groupId = new ObjectId(req.params.groupId);
    const contactId = new ObjectId(req.params.contactId);
    const collection = db.collection(groupsCollectionName);
    const mongoRes = await collection.updateOne({ _id: groupId }, {
      $pull: { contacts: { _id: contactId } },
    } as unknown as PushOperator<{
      contacts: Contact[];
    }>);

    if (mongoRes && mongoRes.modifiedCount > 0) {
      res.send(contactId).status(200);
      return;
    }
    res.sendStatus(500);
  }
);

export { contactsRouter };
