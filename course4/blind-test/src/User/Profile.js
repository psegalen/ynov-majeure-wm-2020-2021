import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Layout, Text } from "@ui-kitten/components";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { updatePlayerAvatar } from "../data/playerEffects";
import { signOutFromAuth } from "../firebase";
import { openAvatarDialog } from "../upload";

const Profile = () => {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const uploadSuccess = (avatarUrl) =>
    dispatch(updatePlayerAvatar(avatarUrl));
  const uploadError = (msg) => Alert.alert(msg);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.container}>
        <TouchableOpacity
          onPress={() => openAvatarDialog(uploadSuccess, uploadError)}
        >
          <Image
            source={{
              uri:
                player.avatar ||
                "https://static.thenounproject.com/png/363640-200.png",
            }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <Text category="h3" style={{ textAlign: "center" }}>
          Hello {player.name}!
        </Text>
      </Layout>
      <Button onPress={() => signOutFromAuth()} appearance="outline">
        Sign Out
      </Button>
    </Layout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  profilePic: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "#BBB",
    marginBottom: 32,
  },
});
