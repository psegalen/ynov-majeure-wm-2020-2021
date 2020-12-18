import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as firebase from "firebase";
import Authentication from "./Authentication";

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
  useEffect(() => {
    // Launch procedure: called each time the app starts
    initFirebase();
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : <Authentication />}
      <StatusBar style="auto" />
    </View>
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
