import express, { Router, Request, Response } from "express";
// Assuming your middleware file is also converted to TS
import {getHello} from "../controller/hello"
import { getClaim } from "../controller/claim";
import { getKnowledge } from "../controller/knowledge";

const router: Router = express.Router();

router
    .get("/", getHello)
    .post("/claim", getClaim)
    .post("/knowledge",getKnowledge)

export default router;
