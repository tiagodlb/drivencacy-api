import express, { json } from "express";
import joi from "joi";
import cors from "cors";
import dotenv from "dotenv"
import dayjs from "dayjs";
import db from "./db.js";
import pollRouter from "../routes/pollRouter.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

//routes
app.use(pollRouter)
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
