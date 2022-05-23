import db from "../src/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function getPollIdChoice(req, res) {
  const id = req.params.id;

  try {
    const polls = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(id) });
    if (!polls) {
      return res.sendStatus(404);
    }

    const voteOptions = await db
      .collection("choices")
      .find({ pollId: id })
      .toArray();
    res.send(voteOptions);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao obter as opções de voto");
  }
}

export async function postChoiceIdVote(req, res) {
  const id = req.params.id;
  let now = dayjs();
  try {
    let voteExists = await db.collection("choices").findOne({ _id: ObjectId(id) });
    if (!voteExists) {
      return res.sendStatus(404);
    }

    const pollExists = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(voteExists.pollId) });
    console.log(pollExists.expireAt);

    const data = pollExists.expireAt;

    const pollExpires = now.add();

    if (pollExpires.diff(data, "day") >= 30) {
      return res.sendStatus(403);
    }
    
    let voteData = await db.collection("votes").findOne({choiceId: voteExists._id})
    await db.collection("votes").insertOne({
      title: 1,
      pollId: voteExists.pollId,
      choiceId: voteExists._id,
      createdAt: now.format("YYYY-MM-DD HH:mm:ss")
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao votar");
  }
}
