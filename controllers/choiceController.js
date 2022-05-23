import joi from "joi";
import dayjs from "dayjs";

import db from "../src/db.js";
import { ObjectId } from "mongodb";

export async function postChoice(req, res) {
  const { title, poolId } = req.body;
  let now = dayjs();

  const choiceSchema = joi.object({
    title: joi.string().required(),
    poolId: joi.string().required(),
  });
  const { error } = choiceSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log(error);
    return res.sendStatus(422);
  }
  try {
    const pollExists = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(poolId) });
    console.log(pollExists.expireAt);
    if (!pollExists) {
      return res.sendStatus(404);
    }

    const data = pollExists.expireAt;

    const pollExpires = now.add();

    if (pollExpires.diff(data, "day") >= 30) {
      return res.sendStatus(403);
    }

    console.log(pollExpires);

    const titleExists = await db
      .collection("choices")
      .findOne({ title: title });
    console.log(title, poolId);
    console.log(titleExists);
    if (titleExists) {
      return res.sendStatus(409);
    }

    await db.collection("choices").insertOne({ title: title, pollId: poolId });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao registrar uma escolha", error);
  }
}
