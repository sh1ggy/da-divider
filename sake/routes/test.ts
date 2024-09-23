import express from "express";
import { db } from "../server";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = db.collection("test");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

export default router;