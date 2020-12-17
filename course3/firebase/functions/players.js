const getPlayers = async (admin, res) => {
  console.log("Launching getPlayers...");

  const players = [];
  const querySnapshot = await admin
    .firestore()
    .collection("players")
    .get();

  querySnapshot.forEach((doc) => {
    players.push({ id: doc.id, name: doc.data().name });
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
      },
    });
  } else {
    res.status(400).json({
      status: "error",
      error: "Player has not been found!",
    });
  }
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
      // TODO : create player
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
