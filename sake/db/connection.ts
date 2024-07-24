import { MongoClient } from "mongodb";

let uri = process.env.ATLAS_URI;
let dbName = process.env.DB;

export async function connectToDatabase() {
  if (!uri) throw Error("cringing rn no url");
  
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  return { client, db };
}
