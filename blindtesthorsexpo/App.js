import {StatusBar} from "expo-status-bar";
import {FontAwesome} from "@expo/vector-icons";
import React, {useEffect} from "react";
import {ActivityIndicator, Platform, SafeAreaView} from "react-native";
import * as eva from "@eva-design/eva";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ApplicationProvider, Layout} from "@ui-kitten/components";
import {Provider, useSelector, useDispatch} from "react-redux";
import Authentication from "./src/User/Authentication";
import Game from "./src/Game/Game";
import Profile from "./src/User/Profile";
import Home from "./src/Game/Home";
import {store} from "./src/data/store";
import {launchApp} from "./src/data/appEffects";

const GameStack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const HomeStack = () => (
  <GameStack.Navigator screenOptions={{headerShown: false}} mode="modal">
    <GameStack.Screen name="Home" component={Home} />
    <GameStack.Screen name="Game" component={Game} />
  </GameStack.Navigator>
);

const App = () => {
  const isLoading = useSelector((state) => state.app.isLoading);
  const isAuthenticated = useSelector((state) => state.app.user !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(launchApp());
  }, []);

  const appBody = isLoading ? (
    <Layout style={{flex: 1, justifyContent: "center"}}>
      <ActivityIndicator color="#000" />
    </Layout>
  ) : isAuthenticated ? (
    <NavigationContainer>
      <BottomTabs.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === "HomeStack") {
              iconName = focused ? "play-circle" : "play-circle-o";
            } else if (route.name === "Profile") {
              iconName = focused ? "user-circle" : "user-circle-o";
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "gray"
        }}>
        <BottomTabs.Screen
          name="HomeStack"
          component={HomeStack}
          options={{tabBarLabel: "Game"}}
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
            android: 20
          })
        }}>
        {appBody}
      </SafeAreaView>
      <StatusBar style="auto" />
    </ApplicationProvider>
  );
};

const ContextContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ContextContainer;
