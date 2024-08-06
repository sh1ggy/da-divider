import { WithId } from "mongodb";

export interface Contact extends WithId<Document> {
  name: string;
  email: string;
  mobile: string;
}