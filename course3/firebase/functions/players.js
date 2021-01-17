const getPlayers = async (admin, res) => {
  console.log("Launching getPlayers...");

  const players = [];
  const querySnapshot = await admin
    .firestore()
    .collection("players")
    .get();

  querySnapshot.forEach((doc) => {
    players.push({
      id: doc.id,
      name: doc.data().name,
      avatar:
        doc.data().avatar ||
        "https://firebasestorage.googleapis.com/v0/b/ynov-b3-21.appspot.com/o/avatars%2FdefaultProfile.png?alt=media&token=be57f18e-4d7d-43d1-893a-b54e699c9bde",
      nbGames: doc.data().games.length,
      backOffice: doc.data().backOffice || false,
    });
  });

  res.json({
    status: "ok",
    players,
  });
};

const getPlayerById = async (id, admin, res) => {
  console.log("Getting player", id);

  const player = await admin
    .firestore()
    .collection("players")
    .doc(id)
    .get();

  if (player.exists) {
    const data = player.data();
    res.json({
      status: "ok",
      player: {
        id: player.id,
        name: data.name,
        update_date: data.update_date.seconds,
        nb_played_games: data.games.length,
        avatar: data.avatar,
      },
    });
  } else {
    res.status(400).json({
      status: "error",
      error: "Player has not been found!",
    });
  }
};

const createPlayer = async (admin, req, res) => {
  const { userId, name } = req.body;
  console.log("Creating player", userId, name);

  if (!userId) {
    res.status(400).json({
      status: "error",
      error: "UserId is mandatory!",
    });
  } else {
    await admin
      .firestore()
      .collection("players")
      .doc(userId)
      .set({
        games: [],
        name: name || `Player${parseInt(Math.random() * 1000, 10)}`,
        update_date: admin.firestore.Timestamp.now(),
      });

    res.send({ status: "ok" });
  }
};

const updatePlayer = async (admin, req, res) => {
  // Get avatar url from request body
  const { avatar } = req.body;
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
  console.log("Updating player", playerId, avatar);

  await admin
    .firestore()
    .collection("players")
    .doc(playerId)
    .update({ avatar });

  res.send({ status: "ok" });
};

module.exports = async (admin, req, res) => {
  try {
    if (req.method === "GET") {
      if (req.query.id) {
        // Get one player by his id
        return await getPlayerById(req.query.id, admin, res);
      } else {
        // Get the players list
        return await getPlayers(admin, res);
      }
    } else if (req.method === "POST") {
      return await createPlayer(admin, req, res);
    } else if (req.method === "PATCH") {
      return await updatePlayer(admin, req, res);
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
