import joi from "joi";
import dayjs from "dayjs";

import db from "../src/db.js";

export async function postPoll(req, res) {
  const { title, expireAt } = req.body;
  let now = dayjs();
  console.log(now.format("YYYY-MM-DD HH:mm:ss"));

  const poolSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.string().allow("").default(now.format("YYYY-MM-DD HH:mm:ss")),
  });

  const { error } = poolSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).send(error.details.map((detail) => detail.message));
    return;
  }

  try {
    await db.collection("polls").insertOne({
      title,
      expireAt: now.format("YYYY-MM-DD HH:mm:ss"),
    });
    console.log(expireAt);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(422);
  }
}

export async function getPoll(req, res) {
  try {
    const polls = await db.collection("polls").find().toArray();
    res.send(polls);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao obter as enquetes");
  }
}
