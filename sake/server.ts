require("dotenv").config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Db } from "mongodb";
import { connectToDatabase } from "./db/connection";
import { Server, createServer } from "http";
import { placesRouter } from "./routes/places";
import { groupsRouter } from "./routes/groups";
import { errorMiddleware } from "./middlewares/error.middleware";
import { contactsRouter } from "./routes/contacts";

const app: Express = express();
const http: Server = createServer(app);
const port = process.env.PORT || 3000;

export let db: Db;

// -- Middleware
app.use(cors());
app.use(express.json());

// --- Routes
app.use("/places", placesRouter);
app.use("/groups", groupsRouter);
app.use("/groups", contactsRouter)

app.use(errorMiddleware);

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
