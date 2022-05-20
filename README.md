# drivencacy-api
# drivencacy-api

console.log(pollExists)
    if (!pollExists) {
      return res.sendStatus(404);
    }
    const pollExpiredAt = await db.collection("polls").findOne({ expireAt });
    const pollExpires = pollExpiredAt.add("30", "day");
    if (pollExpiredAt.diff(pollExpires, "days") >= "30") {
      return res.sendStatus(403);
    }
    const titleExists = await db.collection("choices").findOne({ title: title });
    console.log(title, poolId)
    console.log(titleExists)
    if (titleExists) {
      return res.sendStatus(409);
    }

    await db.collection("choices").insertOne({ title: title, pollId: poolId });