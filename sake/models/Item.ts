import { WithId } from "mongodb";
import { Contact } from "./Contact";

export interface Item extends WithId<Document> {
  name: string,
  price: number,
  contacts: Contact[],  
}