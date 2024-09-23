import { ObjectId, WithId } from "mongodb";

export interface Item extends WithId<Document> {
  name: string;
  price: number;
  // optional param to use for calcs (not for storage)
  assignedContactsCount?: number; 
}

export interface ItemAssignment {
  contactId: ObjectId;
  itemId: ObjectId;
}
