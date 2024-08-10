import { WithId } from "mongodb";
import { Item } from "./Item";
import { Contact } from "./Contact";

export interface Place extends WithId<Document> {
  date: Date,
  items: Item[],
  contacts: Contact[],
  groupName: string,
}

