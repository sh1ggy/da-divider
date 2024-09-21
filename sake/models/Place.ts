import { WithId } from "mongodb";
import { Item } from "./Item";
import { Contact } from "./Contact";

export interface Place extends WithId<Document> {
  date: Date;
  items: Item[];
  contacts: PlaceContact[];
  groupName: string;
}

export interface PlaceContact extends Contact {
  itemAssignments?: Item[];
}
