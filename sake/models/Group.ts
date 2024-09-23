import { WithId } from "mongodb";
import { Contact } from "./Contact";

export interface Group extends WithId<Document> {
  name: string,
  contacts: Contact[],
}
