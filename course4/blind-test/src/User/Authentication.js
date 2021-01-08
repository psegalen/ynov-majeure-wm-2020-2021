import React, { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { signin, signup } from "../firebase";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const dispatch = useDispatch();

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
          height: 400,
          justifyContent: "space-evenly",
        }}
      >
        <Text category="h1" style={{ textAlign: "center" }}>
          Authentication
        </Text>
        {isSigningUp ? (
          <>
            <Text>Name</Text>
            <Input
              value={playerName}
              onChangeText={(text) => setPlayerName(text)}
              placeholder="Toto Toto"
            />
          </>
        ) : undefined}
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
            onPress={() =>
              isSigningUp
                ? signup(
                    email,
                    password,
                    playerName,
                    Alert.alert,
                    dispatch
                  )
                : signin(email, password, Alert.alert, dispatch)
            }
          >
            {isSigningUp ? "Sign Up" : "Sign In"}
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Authentication;
