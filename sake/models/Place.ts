import { ObjectId, WithId } from "mongodb";
import { Item, ItemAssignment } from "./Item";

export interface Place extends WithId<Document> {
  date: Date;
  name: string;
  items: Item[];
  contacts: PlaceContact[];
  groupName: string;
  itemAssignments: ItemAssignment[]; // for tracking Contact & Item links
}

// Contact type for Place
export interface PlaceContact {
  id: ObjectId;
  name: string;
}
