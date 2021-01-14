import { Button, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  const player = useSelector((state) => state.player);
  return (
    <Layout style={styles.container}>
      <Layout style={styles.header}>
        <Text category="h5">Welcome {player.name}!</Text>
        <Image
          source={{
            uri:
              player.avatar ||
              "https://static.thenounproject.com/png/363640-200.png",
          }}
          style={styles.profilePic}
        />
      </Layout>
      <Layout style={styles.body}>
        <Text>You have played {player.nb_played_games} times</Text>
        <Layout style={styles.games}>
          <Button
            onPress={() => {
              navigation.navigate("Game");
            }}
          >
            Take a new Game!
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#BBB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  body: {
    flex: 1,
  },
  games: {
    flex: 1,
    justifyContent: "center",
  },
});
