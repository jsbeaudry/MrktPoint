import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "unstated";
import MRKTApp from "./src/navigation/main";
import { stitchConfig } from "./src/services/stitch";
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";

export default class App extends Component {
  constructor(props) {
    super(props);
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  render() {
    return (
      <Provider>
        <MRKTApp />
      </Provider>
    );
  }

  _loadClient() {
    Stitch.initializeDefaultAppClient(stitchConfig.appId);
  }
}
