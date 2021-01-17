import {Button, Layout, Text} from "@ui-kitten/components";
import React, {useEffect, useState} from "react";
import {Image, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import {getBatteryLevel} from "react-native-device-info";
import {FontAwesome} from "@expo/vector-icons";

const Home = ({navigation}) => {
  const player = useSelector((state) => state.player);
  const [battery, setBattery] = useState(0);
  useEffect(() => {
    getBatteryLevel().then((level) => setBattery(parseInt(level * 100)));
  }, []);
  let batteryIconName = "battery-empty";
  if (battery > 80) batteryIconName = "battery-full";
  else if (battery > 60) batteryIconName = "battery-three-quarters";
  else if (battery > 35) batteryIconName = "battery-half";
  else if (battery > 15) batteryIconName = "battery-quarter";
  console.log(batteryIconName);
  return (
    <Layout style={styles.container}>
      <Layout style={styles.header}>
        <Text category="h5">Welcome {player.name}!</Text>
        <Image
          source={{
            uri:
              player.avatar ||
              "https://static.thenounproject.com/png/363640-200.png"
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
            }}>
            Take a new Game!
          </Button>
        </Layout>
        <Layout style={styles.batteryLevel}>
          <FontAwesome name={batteryIconName} size={20} />
          <Text category="h6" style={{marginLeft: 16}}>
            {battery}%
          </Text>
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
    justifyContent: "center"
  },
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#BBB"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16
  },
  body: {
    flex: 1
  },
  games: {
    flex: 1,
    justifyContent: "center"
  },
  batteryLevel: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
