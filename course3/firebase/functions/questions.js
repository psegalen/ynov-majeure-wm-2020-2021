const getQuestionsForPlayer = async (
  playerDoc,
  admin,
  res,
  multi = false
) => {
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

  if (!multi) {
    res.json({
      status: "ok",
      questions: gameQuestions.map((doc) => {
        const question = doc.data();
        question.creator = question.creator.id;
        return {
          id: doc.id,
          ...question,
        };
      }),
    });
  } else {
    // Create game in games collection
    const game = await admin
      .firestore()
      .collection("games")
      .add({
        creator: playerDoc.ref,
        launch_time: admin.firestore.Timestamp.fromMillis(
          new Date().getTime() + 30000
        ),
        questions: gameQuestions.map((doc) => doc.ref),
        results: [],
      });

    // Send back questions + game details
    res.json({
      status: "ok",
      questions: gameQuestions.map((doc) => {
        const question = doc.data();
        question.creator = question.creator.id;
        return {
          id: doc.id,
          ...question,
        };
      }),
      multi: true,
      gameId: game.id,
    });
  }
};

const createQuestion = async (playerDoc, admin, req, res) => {
  const {
    answers,
    audio_url,
    good_answer,
    question,
    type,
  } = req.body;
  if (
    !answers ||
    answers.length === 0 ||
    !audio_url ||
    !good_answer ||
    !question ||
    !type
  ) {
    res.status(400).json({
      status: "error",
      error:
        'Body is incomplete, we need "answers" (non-empty table), "audio_url", "good_answer", "question" and "type"!',
    });
    return;
  }

  console.log("Creating question", playerDoc.id, question);

  if (!playerDoc || !playerDoc.data().backOffice) {
    res.status(400).json({
      status: "error",
      error: "Player is not allowed!",
    });
  } else {
    await admin
      .firestore()
      .collection("questions")
      .add({
        answers,
        audio_url,
        good_answer,
        question,
        type,
        creator: admin
          .firestore()
          .collection("players")
          .doc(playerDoc.id),
      });

    res.send({ status: "ok" });
  }
};

module.exports = async (admin, req, res) => {
  try {
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

    if (req.method === "GET") {
      return await getQuestionsForPlayer(
        playerDoc,
        admin,
        res,
        req.query.multi
      );
    } else if (req.method === "POST") {
      return await createQuestion(playerDoc, admin, req, res);
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
