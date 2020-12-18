import * as firebase from "firebase";

const apiRoot = "https://europe-west1-ynov-b3-21.cloudfunctions.net/";

const api = {
  getQuestions: () =>
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) =>
        fetch(`${apiRoot}questions`, {
          headers: {
            BlindTestToken: token,
          },
        })
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            console.log(data);
            return data.questions;
          })
          .catch((err) => {
            console.log(err);
            return null;
          })
      ),
  createPlayer: (userId, name) =>
    fetch(`${apiRoot}players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, name }),
    }).catch((err) => {
      console.log(err);
      return null;
    }),
  submitAnswers: (answers) =>
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) =>
        fetch("http://localhost:5001/ynov-b3-21/europe-west1/game", {
          method: "POST",
          headers: {
            BlindTestToken: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        })
          .then((response) => response.json())
          .then((result) => result.score)
          .catch((err) => {
            console.log(err);
            return null;
          })
      ),
};

export default api;