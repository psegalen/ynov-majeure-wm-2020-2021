import React, { useState } from "react";
import { Alert } from "react-native";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import * as firebase from "firebase";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const signin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCreds) => {
        console.log(userCreds.user.uid);
        Alert.alert("Success", `User UID: ${userCreds.user.uid}`);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", err.message);
      });
  };

  const signup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCreds) => {
        console.log(userCreds.user.uid);
        Alert.alert("Success", `User UID: ${userCreds.user.uid}`);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", err.message);
      });
  };

  return (
    <Layout
      style={{ flex: 1, justifyContent: "center", padding: 32 }}
    >
      <Layout
        style={{
          borderColor: "#3F66FF",
          borderWidth: 2,
          borderRadius: 16,
          backgroundColor: "#C9E0FF",
          padding: 24,
          height: 350,
          justifyContent: "space-evenly",
        }}
      >
        <Text category="h1" style={{ textAlign: "center" }}>
          Authentication
        </Text>
        <Text>Email</Text>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="toto@toto.com"
        />
        <Text>Password</Text>
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="password"
          secureTextEntry
        />
        <Layout
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
          }}
        >
          <Button
            style={{ flex: 1, marginRight: 8 }}
            onPress={() => setIsSigningUp(!isSigningUp)}
            appearance="outline"
          >
            {isSigningUp ? "Authenticate" : "Create account"}
          </Button>
          <Button
            style={{ flex: 1, marginLeft: 8 }}
            onPress={() => (isSigningUp ? signup() : signin())}
          >
            {isSigningUp ? "Sign Up" : "Sign In"}
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Authentication;
