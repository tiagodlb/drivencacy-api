import { ObjectId } from "mongodb";
import db from "../src/db.js";

export async function getResult(req, res) {
  const id = req.params.id;

  try {
    const polls = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(id) });
      const votes = await db.collection("votes").find({choiceId: id}).toArray();
      const choices = await db.collection("choices").findOne({ pollId: votes.pollId });
      console.log(choices);
    console.log(votes)
    const results = await db.collection("results").insertOne({
      title: polls.title,
      expireAt: polls.expireAt,
      result: {
        title: choices.title,
        votes: votes.length
      },
    });

    res.send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao pegar o resultado");
  }
}
