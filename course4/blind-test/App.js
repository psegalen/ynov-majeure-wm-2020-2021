import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import * as firebase from "firebase";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import Authentication from "./Authentication";
import Game from "./Game";

const initFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAoi_dkAeY1FFdLPmWS5voHjbIxegqSzw8",
    authDomain: "ynov-b3-21.firebaseapp.com",
    projectId: "ynov-b3-21",
    storageBucket: "ynov-b3-21.appspot.com",
    messagingSenderId: "223121527532",
    appId: "1:223121527532:web:3384aee092f596b0b00bc9",
    measurementId: "G-VN2VY6XM1J",
  };
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Launch procedure: called each time the app starts
    initFirebase();
    firebase.auth().onAuthStateChanged((user) => {
      // Will be called each time auth changes
      if (user) {
        console.log("Auth detected!");
        console.log(user.uid);
        setIsAuthenticated(true);
      } else {
        console.log("Anonymous detected!");
        setIsAuthenticated(false);
      }
    });
    setIsLoading(false);
  }, []);

  const appBody = isLoading ? (
    <ActivityIndicator />
  ) : isAuthenticated ? (
    <Game />
  ) : (
    <Authentication />
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {appBody}
      <StatusBar style="auto" />
    </ApplicationProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
