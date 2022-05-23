import express, { json } from "express";
import joi from "joi";
import cors from "cors";
import dotenv from "dotenv";
import dayjs from "dayjs";
import db from "./db.js";
import pollRouter from "../routes/pollRouter.js";
import choiceRouter from "../routes/choiceRouter.js";
import voteRouter from "../routes/voteRouter.js";
import resultRouter from "../routes/resultRouter.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

//routes
app.use(pollRouter);
app.use(choiceRouter);
app.use(voteRouter)
app.use(resultRouter)

app.listen(process.env.PORT , () => {
  console.log(`Server running on port: ${process.env.PORT }`);
});
