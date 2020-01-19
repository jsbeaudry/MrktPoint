import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
//import { Provider } from "unstated";
import MRKTApp from "./src/navigation/main";
import { stitchConfig } from "./src/services/stitch";
import { Stitch } from "mongodb-stitch-react-native-sdk";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  console.log(token);
}

import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default class App extends Component {
  constructor(props) {
    super(props);
    this._loadClient = this._loadClient.bind(this);
  }
  componentWillMount = () => {
    registerForPushNotificationsAsync();
  };

  componentDidMount() {
    this._loadClient();
  }

  render() {
    return (
      <Provider store={store}>
        <MRKTApp />
      </Provider>
    );
  }

  _loadClient() {
    Stitch.initializeDefaultAppClient(stitchConfig.appId);
  }
}
