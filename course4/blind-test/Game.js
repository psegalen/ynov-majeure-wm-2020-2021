import React, { useState } from "react";
import { Button, Layout, Text } from "@ui-kitten/components";
import * as firebase from "firebase";
import api from "./api";
import { Alert } from "react-native";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const signout = () => {
    firebase.auth().signOut();
  };
  const getNewGame = () => {
    // Call /questions on the API
    api.getQuestions().then((questions) => {
      if (questions === null) {
        // There was an error
        Alert.alert("Error");
      } else {
        setQuestions(questions);
        console.log(questions);
      }
    });
  };
  return (
    <Layout
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        padding: 32,
      }}
    >
      <Text category="h1">Game</Text>
      <Button onPress={() => getNewGame()}>New Game</Button>
      <Button onPress={() => signout()} appearance="outline">
        Sign Out
      </Button>
    </Layout>
  );
};

export default Game;
