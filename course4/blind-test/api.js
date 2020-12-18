import * as firebase from "firebase";

const apiRoot = "https://europe-west1-ynov-b3-21.cloudfunctions.net/";

const api = {
  getQuestions: () =>
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        console.log(token);
        return fetch(`${apiRoot}questions`, {
          headers: {
            BlindTestToken: token,
          },
        })
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            console.log(data);
            return data;
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
      }),
};

export default api;
