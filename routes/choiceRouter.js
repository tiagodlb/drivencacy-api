import { Router } from "express";

import { postChoice } from "../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post("/choice", postChoice);

export default choiceRouter;
