require("dotenv").config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import test from "./routes/test";
import { Db } from "mongodb";
import { connectToDatabase } from "./db/connection";
import { Server, createServer } from "http";
import { contactsRouter } from "./routes/contacts";
import { placesRouter } from "./routes/places";
import { groupsRouter } from "./routes/groups";


const app: Express = express();
const http: Server = createServer(app);
const port = process.env.PORT || 3000;

export let db: Db;

app.use(cors());
app.use(express.json());
// app.use("/test", test);
app.use("/contacts", contactsRouter);
app.use("/places", placesRouter);
app.use("/groups", groupsRouter);

async function main() {
  db = (await connectToDatabase()).db;
  http.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });
}

main().catch((e) => console.log(e));
