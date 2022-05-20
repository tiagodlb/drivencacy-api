import db from "../src/db";
import { ObjectId } from "mongodb";

export async function pollIdChoice(req, res) {
  const id = req.params.id;

  try {
    const polls = await db
      .collection("polls")
      .findOne({ _id: ObjectId(id) });
    if (!polls) {
      return res.sendStatus(404);
    }
    
    const voteOptions = await db.collection("choices").find().toArray();
    res.send(voteOptions);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao obter as opções de voto");
  }
}

export async function choiceIdvote(req, res) {
  const id = req.params.id;
  let now = dayjs();
  try {
    const choice = await db
      .collection("polls")
      .findOne({ _id: ObjectId(id) });
    if (!choice) {
      return res.sendStatus(404);
    }

    //checar aqui se já expirou
    const vote = await db.collection("votes").findOne({vote})
    if(!vote){
        vote = 0
        return;
    }
    await db.collection("votes").insertOne({ vote: parseInt(vote)+1, createdAt: now.format("YYYY-MM-DD HH:mm:ss") });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao votar");
  }
}
