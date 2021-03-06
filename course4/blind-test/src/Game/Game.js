import React, { useState } from "react";
import { Button, Layout, Text } from "@ui-kitten/components";
import api from "../api";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import Gameplay from "./Gameplay";
import { incrementPlayerNbPlayed } from "../data/playerActions";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(-1);
  const dispatch = useDispatch();
  const getNewGame = () => {
    // Call /questions on the API
    api.getQuestions().then((questions) => {
      if (questions === null) {
        // There was an error
        Alert.alert("Error");
      } else {
        setAnswers([]);
        setScore(-1);
        setQuestions(questions);
        console.log(questions);
      }
    });
  };
  const finishGame = async (answers) => {
    const score = await api.submitAnswers(answers);
    setScore(score);
    setAnswers(answers);
    console.log("Score:", score);
    dispatch(incrementPlayerNbPlayed());
  };
  return (
    <Layout
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        padding: 32,
      }}
    >
      <Text category="h1" style={{ marginBottom: 64 }}>
        Game
      </Text>
      {answers && answers.length > 0 ? (
        <Layout>
          <Text category="h2">Votre score: {score}</Text>
          <Text category="h3">Merci d'avoir joué</Text>
          <Button onPress={() => getNewGame()}>New Game</Button>
        </Layout>
      ) : questions && questions.length > 0 ? (
        <Gameplay questions={questions} finishGame={finishGame} />
      ) : (
        <Button onPress={() => getNewGame()}>New Game</Button>
      )}
    </Layout>
  );
};

export default Game;
