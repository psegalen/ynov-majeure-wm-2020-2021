import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Button, Layout, Text } from "@ui-kitten/components";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import api from "../api";
import { updatePlayerAvatar } from "../data/playerActions";

const uploadImageAsync = async (uri) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(`avatars/${firebase.auth().currentUser.uid}`);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
};

const Profile = () => {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const openAvatarDialog = async () => {
    const {
      status,
    } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "To change your avatar, you need to give the app the permission to access to the camera and the media library!"
      );
      return;
    }
    // Permissions are OK
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      console.log("Let's upload this", result.uri);

      const avatarUrl = await uploadImageAsync(result.uri);

      console.log("Avatar successfully uploaded", avatarUrl);

      const apiResult = await api.updatePlayerAvatar(avatarUrl);

      console.log(apiResult);

      if (apiResult && apiResult.status === "ok") {
        dispatch(updatePlayerAvatar(avatarUrl));
      } else {
        Alert.alert("The avatar upload failed!");
      }
    }
  };
  const signout = () => {
    firebase.auth().signOut();
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.container}>
        <TouchableOpacity onPress={openAvatarDialog}>
          <Image
            source={{
              uri:
                player.avatar ||
                "https://static.thenounproject.com/png/363640-200.png",
            }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <Text category="h1">Hello {player.name}!</Text>
      </Layout>
      <Button onPress={() => signout()} appearance="outline">
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
