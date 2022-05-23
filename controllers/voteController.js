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
    const choice = await db.collection("polls").findOne({ _id: ObjectId(id) });
    if (!choice) {
      return res.sendStatus(404);
    }
    console.log(choice);

    let voteExists = await db.collection("choices").findOne({ pollId: id });
    console.log(voteExists);
    if (!voteExists) {
      let vote = 1;
      let voteData = await db.collection("votes").insertOne({
        title: vote,
        pollId: id,
        choiceId: voteExists._id,
        createdAt: now.format("YYYY-MM-DD HH:mm:ss")
      });
      console.log(voteData + "votos = 1?" + " " + voteData.value);
      return res.sendStatus(201);
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao votar");
  }
}
