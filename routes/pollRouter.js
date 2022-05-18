import { Router } from "express";

import { postPoll, getPoll } from "../controllers/pollController.js";

const pollRouter = Router();

pollRouter.post("/poll", postPoll);
pollRouter.get("/poll", getPoll);

export default pollRouter;
