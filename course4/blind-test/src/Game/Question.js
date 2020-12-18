import React, { useEffect, useState } from "react";
import { Card, Layout, Text } from "@ui-kitten/components";
import { Image, useWindowDimensions } from "react-native";
import { Audio } from "expo-av";

const Question = ({ data, chooseAnswer, startTime }) => {
  const [sound, setSound] = useState();
  const layoutWidth = useWindowDimensions().width - 64;
  const makeChoice = (answerIndex) => {
    chooseAnswer({
      questionId: data.id,
      choice: data.answers[answerIndex],
      time: new Date().getTime() - startTime,
    });
  };
  const Answer = ({ answerIndex }) => (
    <Card
      style={{ flex: 1, margin: 8 }}
      onPress={() => makeChoice(answerIndex)}
    >
      {data.type === "image" ? (
        <Image
          source={{ uri: data.answers[answerIndex] }}
          style={{ height: 200 }}
          resizeMode="contain"
        />
      ) : (
        <Text>{data.answers[answerIndex]}</Text>
      )}
    </Card>
  );

  useEffect(() => {
    return () => {
      if (sound) {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync({
        uri: data.audio_url,
      });
      setSound(sound);
      await sound.playAsync();
    };
    playSound();
  }, [data.id]);
  return (
    <Layout style={{ width: layoutWidth }}>
      <Text category="h5" style={{ textAlign: "center" }}>
        {data.question}
      </Text>
      <Layout
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Answer answerIndex={0} />
        <Answer answerIndex={1} />
      </Layout>
      <Layout
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Answer answerIndex={2} />
        <Answer answerIndex={3} />
      </Layout>
    </Layout>
  );
};

export default Question;
