import React, { createContext, useState } from "react";

export const PlayerContext = createContext({
  player: {},
  setPlayer: () => {},
  setPlayerAvatar: () => {},
  incrementPlayerNbPlayed: () => {},
});

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState({});

  const setPlayerAvatar = (newAvatarUrl) =>
    setPlayer({ ...player, avatar: newAvatarUrl });

  const incrementPlayerNbPlayed = () =>
    setPlayer({
      ...player,
      nb_played_games: player.nb_played_games + 1,
    });

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        setPlayerAvatar,
        incrementPlayerNbPlayed,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
