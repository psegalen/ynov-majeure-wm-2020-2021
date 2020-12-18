import React, { useEffect } from "react";
import { Text, View } from "react-native";
import * as firebase from "firebase";

const Authentication = () => {
  useEffect(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword("test@test.fr", "testtest")
      .then((userCreds) => console.log(userCreds.user.uid));
  }, []);
  return (
    <View>
      <Text>Auth</Text>
    </View>
  );
};

export default Authentication;
