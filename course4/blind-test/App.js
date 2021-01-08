import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from "react-native";
import * as firebase from "firebase";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApplicationProvider } from "@ui-kitten/components";
import Authentication from "./src/User/Authentication";
import Game from "./src/Game/Game";
import Profile from "./src/User/Profile";
import Home from "./src/Game/Home";
import {
  PlayerContext,
  PlayerProvider,
} from "./src/data/PlayerContext";
import api from "./src/api";

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

const GameStack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const HomeStack = () => (
  <GameStack.Navigator
    screenOptions={{ headerShown: false }}
    mode="modal"
  >
    <GameStack.Screen name="Home" component={Home} />
    <GameStack.Screen name="Game" component={Game} />
  </GameStack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const playerContext = useContext(PlayerContext);
  useEffect(() => {
    // Launch procedure: called each time the app starts
    initFirebase();
    firebase.auth().onAuthStateChanged((user) => {
      // Will be called each time auth changes
      if (user) {
        console.log("Auth detected!");
        console.log(user.uid);
        setIsAuthenticated(true);
        if (!playerContext.player.hasOwnProperty("id")) {
          // Player has not been fetched yet
          api.getPlayer().then((data) => {
            playerContext.setPlayer(data.player);
            setIsLoading(false);
          });
        }
      } else {
        console.log("Anonymous detected!");
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    });
  }, []);

  const appBody = isLoading ? (
    <ActivityIndicator />
  ) : isAuthenticated ? (
    <NavigationContainer>
      <BottomTabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeStack") {
              iconName = focused ? "play-circle" : "play-circle-o";
            } else if (route.name === "Profile") {
              iconName = focused ? "user-circle" : "user-circle-o";
            }

            // You can return any component that you like here!
            return (
              <FontAwesome
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "gray",
        }}
      >
        <BottomTabs.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ tabBarLabel: "Game" }}
        />
        <BottomTabs.Screen name="Profile" component={Profile} />
      </BottomTabs.Navigator>
    </NavigationContainer>
  ) : (
    <Authentication />
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.select({
            ios: undefined,
            android: 20,
          }),
        }}
      >
        {appBody}
      </SafeAreaView>
      <StatusBar style="auto" />
    </ApplicationProvider>
  );
};

const ContextContainer = () => (
  <PlayerProvider>
    <App />
  </PlayerProvider>
);

export default ContextContainer;
