import { Router } from "express";

import { getResult } from "../controllers/resultController.js";

const resultRouter = Router();

resultRouter.get("/poll/:id/result", getResult);

export default resultRouter;
