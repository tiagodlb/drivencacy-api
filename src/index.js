import express, { json } from "express";
import joi from "joi";
import cors from "cors";
import dotenv from "dotenv"
import dayjs from "dayjs";
import db from "./db.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

app.post('/poll', async (req,res) => {
    const { title, expireAt } = req.body;
    let now = dayjs();
    console.log(now.format("YYYY-MM-DD HH:mm:ss"));

    const poolSchema = joi.object({
        title: joi.string().required(),
        expireAt: joi.string().allow('').default(now.format("YYYY-MM-DD HH:mm:ss"))
    })

    const {error} = poolSchema.validate(req.body, {abortEarly: false})
    if(error) {
        res.status(422).send(error.details.map(detail => detail.message));
        return;
    }

    try {
        await db.collection("polls").insertOne({
            title,
            expireAt
        })
        console.log(expireAt)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }


})


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
