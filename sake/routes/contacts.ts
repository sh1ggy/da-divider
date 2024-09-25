import express, { Request, Response } from "express";
import { db } from "../server";
import { ObjectId, PushOperator } from "mongodb";
import { Contact } from "../models/Contact";
import { Group } from "../models/Group";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contact.schema";
import { validateSchema } from "../middlewares/validation.middleware";
import { groupsCollectionName } from "./groups";

const contactsRouter = express.Router();

// GET - all Contacts for group
contactsRouter.get(
  "/:groupId/contacts",
  async (req: Request, res: Response) => {
    const collection = db.collection(groupsCollectionName);
    const { groupId } = req.params;
    const query = { _id: new ObjectId(groupId) };

    // Find group
    const group: Group | undefined = (await collection.findOne(query)) as Group;
    if (!group) return res.sendStatus(404);

    // Perform contact transaction
    const contacts: Contact[] = group.contacts;
    if (!contacts) return res.sendStatus(500);
    if (contacts.length === 0) return res.send(group).status(404);

    res.send(contacts).status(200);
  }
);

// POST - add new Contact to Group
contactsRouter.post(
  "/:groupId/contact",
  validateSchema(createContactSchema),
  async (req: Request, res: Response) => {
    if (!req) return res.sendStatus(400);

    const { groupId } = req.params;
    const collection = db.collection(groupsCollectionName);
    let contactToAdd: Contact = req.body as Contact;
    contactToAdd._id = new ObjectId();

    // Updating Group with new Contact
    const result = await collection.updateOne(
      { _id: new ObjectId(groupId) },
      {
        $push: {
          contacts: { ...contactToAdd },
        } as PushOperator<{ contacts: Contact[] }>,
      }
    );
    if (!result) return res.sendStatus(500);
    if (result.modifiedCount <= 0) return res.send(result).status(404);

    res.send(result).status(200);
  }
);

// PUT - edit existing Contact by Group ID and Contact ID
contactsRouter.put(
  "/:groupId/contact/:contactId",
  validateSchema(updateContactSchema),
  async (req: Request, res: Response) => {
    if (!req) return res.sendStatus(400);

    const groupId = new ObjectId(req.params.groupId);
    const contactId = new ObjectId(req.params.contactId);
    const collection = db.collection(groupsCollectionName);
    let contactToUpdate: Contact = { _id: contactId, ...req.body } as Contact;

    // Perform transaction
    const result = await collection.updateOne(
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

    if (!result) return res.sendStatus(500);
    if (result.modifiedCount <= 0) return res.send(result).status(304); // no changes

    res.send(result).status(200);
  }
);

// DELETE -- delete Contact
contactsRouter.delete(
  "/:groupId/contact/:contactId",
  async (req: Request, res: Response) => {
    const groupId = new ObjectId(req.params.groupId);
    const contactId = new ObjectId(req.params.contactId);
    const collection = db.collection(groupsCollectionName);

    // Perform transaction
    const result = await collection.updateOne({ _id: groupId }, {
      $pull: { contacts: { _id: contactId } },
    } as PushOperator<{
      contacts: Contact[];
    }>);

    if (!result) return res.sendStatus(500);
    if (result.modifiedCount <= 0) return res.send(result).status(304); // no changes

    res.send(result).status(200);
  }
);

export { contactsRouter };
