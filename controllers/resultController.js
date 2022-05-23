import { ObjectId } from "mongodb";
import db from "../src/db.js";

export async function getResult(req, res) {
  const id = req.params.id;

  try {
    const polls = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(id) });
    const choices = await db.collection("choices").findOne({ pollId: id });
    console.log(choices);
    const votes = await db.collection("votes").find().toArray()
    const results = await db.collection("results").insertOne({
      _id: polls._id,
      title: polls.title,
      expireAt: polls.expireAt,
      result: {
        title: choices.title,
        votes: votes.length,
      },
    });

    res.send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao pegar o resultado");
  }
}
