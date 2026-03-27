import express, { Router, Request, Response } from "express";
// Assuming your middleware file is also converted to TS
import {getHello} from "../controller/hello"
import { getClaim } from "../controller/claim";
import { getKnowledge } from "../controller/knowledge";
import { getEvents } from "../controller/events";
import { allEvents,allUsers } from "../controller/allData";
import { loginUser } from "../controller/login";
import { getAllAvailableRegions } from "../controller/getAllRegion";

const router: Router = express.Router();

router
  .get("/", getHello)
  .post("/claim", getClaim)
  .post("/acknowledge", getKnowledge)
  .get("/event", getEvents)
  .get("/allEvents", allEvents)
  .get("/allUsers", allUsers)
  .post("/login", loginUser)
  .get("/allAvailableRegions", getAllAvailableRegions);

export default router;
