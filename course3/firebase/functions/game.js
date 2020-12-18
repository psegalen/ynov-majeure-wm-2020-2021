const handleAnswers = async (answers, playerDoc, admin, res) => {
  console.log(
    "Handling answers for player ",
    playerDoc.data().name,
    answers
  );

  let score = 0;
  const playerAnswers = [];
  const game = playerDoc.data().games[
    playerDoc.data().games.length - 1
  ];

  const questionsRefs = [];
  game.questions.forEach((questionRef) =>
    questionsRefs.push(questionRef)
  );

  for (let i = 0; i < questionsRefs.length; i++) {
    const questionDoc = await questionsRefs[i].get();
    const questionData = questionDoc.data();
    console.log("Question", questionDoc.id);
    const clientAnswer = answers.find(
      (a) => a.questionId === questionDoc.id
    );
    const playerHasGoodAnswer =
      questionData.good_answer === clientAnswer.choice;
    playerAnswers.push({
      question_id: questionDoc.id,
      playerHasGoodAnswer,
      time: clientAnswer.time,
    });
    if (playerHasGoodAnswer) {
      console.log("Yay! Good answer!");
      score += 30 - parseInt(clientAnswer.time / 1000);
    }
  }

  console.log("Score:", score);

  res.json({
    status: "ok",
    score,
  });
};

module.exports = async (admin, req, res) => {
  try {
    if (req.method === "POST") {
      // Get token from headers
      const token = req.get("BlindTestToken");

      // Get user from token
      let verification;
      try {
        verification = await admin.auth().verifyIdToken(token);
      } catch (err) {
        console.log("Error while decoding token", err);
        return res.status(400).json({
          status: "error",
          error: "Token couldn't be decoded!",
          details: err.message,
        });
      }
      const playerId = verification.uid;
      console.log(playerId);

      // Get player from user
      const playerDoc = await admin
        .firestore()
        .collection("players")
        .doc(playerId)
        .get();
      return await handleAnswers(req.body, playerDoc, admin, res);
    }
    res.status(400).json({
      status: "error",
      error: "This query is not supported!",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};
