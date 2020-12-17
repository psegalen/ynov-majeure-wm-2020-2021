const getQuestionsForPlayer = async (playerDoc, admin, res) => {
  console.log("Getting question for player", playerDoc.data().name);
  // TODO: get questions already played by player to avoid giving them to him again

  const questionsDocs = await admin
    .firestore()
    .collection("questions")
    .get();
  const questions = [];
  questionsDocs.forEach((questionDoc) => {
    // TODO: avoid questions alreday sent to player
    questions.push(questionDoc);
  });

  // Select 2 questions randomly chosen
  const gameQuestions = questions
    .sort(() => Math.random() - 0.5)
    .filter((question, index) => (index < 2 ? question : undefined));

  await playerDoc.ref.update({
    games: admin.firestore.FieldValue.arrayUnion({
      play_date: admin.firestore.Timestamp.now(),
      questions: gameQuestions.map((doc) => doc.ref),
    }),
  });

  res.json({
    status: "ok",
    questions: gameQuestions.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  });
};

module.exports = async (admin, req, res) => {
  try {
    if (req.method === "GET") {
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

      // Get player from user
      const playerDoc = await admin
        .firestore()
        .collection("players")
        .doc(playerId)
        .get();
      return await getQuestionsForPlayer(playerDoc, admin, res);
    } else if (req.method === "POST") {
      // TODO : create question
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
