import {Platform} from "react-native";
import * as Notifications from "expo-notifications";
import {Constants} from "react-native-unimodules";
import {initFirebase, listenAuthChanged} from "../firebase";
import {appActions} from "./appActions";
import {getPlayerData} from "./playerEffects";

export const launchApp = () => (dispatch) => {
  dispatch({type: appActions.APP_JUST_LAUNCHED});

  initFirebase();

  const handleUser = (user) => {
    dispatch({type: appActions.USER_IS_AUTHENTICATED, user});

    dispatch(getPlayerData());

    const registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice && Platform.OS === "ios") {
        const {
          status: existingStatus
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const {status} = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }

        let experienceId = "@pierrre/blindtest";
        const token = (
          await Notifications.getExpoPushTokenAsync({experienceId})
        ).data;
        console.log(token);
        // TODO : send token to backend
      } else {
        console.error(
          "Must use physical device for Push Notifications, not suported on Android for now"
        );
      }
    };
    registerForPushNotificationsAsync();
  };
  const handleAnonymous = () => {
    dispatch({type: appActions.USER_IS_ANONYMOUS});
  };
  listenAuthChanged(handleUser, handleAnonymous);
};
