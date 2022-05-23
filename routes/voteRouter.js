import { Router } from "express";

import { getPollIdChoice, postChoiceIdVote } from "../controllers/voteController.js";

const voteRouter = Router();

voteRouter.post("/choice/:id/vote", postChoiceIdVote);
voteRouter.get("/poll/:id/choice", getPollIdChoice);

export default voteRouter;
