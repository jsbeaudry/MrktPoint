import React from "react";
import { Image, StatusBar, View, AsyncStorage } from "react-native";
import { hp } from "../utils/variables";
import { Stitch } from "mongodb-stitch-react-native-sdk";
import { stitchConfig } from "../services/stitch";
class Launch extends React.Component {
  constructor(props) {
    super(props);
    this._Async();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _Async = async () => {
    const { navigation } = this.props;
    try {
      const hasBoarded = await AsyncStorage.getItem("@hasBoarded");

      setTimeout(() => {
        if (!hasBoarded) {
          navigation.navigate("Intro");
        } else {
          // Stitch.defaultAppClient.auth.logoutUserWithId(
          //   "5d3625aa8e88562010d2a3bb"
          // );
          // Stitch.defaultAppClient.auth.logoutUserWithId(
          //   "5d3625aa8e88562010d2a3bb"
          // );
          //console.log(Stitch.defaultAppClient.auth.activeUserAuthInfo);
          // Stitch.defaultAppClient.auth.switchToUserWithId(
          //   "5d3625aa8e88562010d2a3bb"
          // );
          if (
            Stitch.defaultAppClient.auth.activeUserAuthInfo &&
            Stitch.defaultAppClient.auth.activeUserAuthInfo.userId != undefined
          ) {
            this.props.navigation.navigate("Main");
          } else {
            this.props.navigation.navigate("Signin");
          }
        }
      }, 2000);
    } catch (error) {
      navigation.navigate("Intro");
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar barStyle="default" />
        <Image
          source={require("../images/logo2.png")}
          style={{
            height: hp("15%"),
            width: hp("15%"),
            alignSelf: "center"
          }}
        />

        <Image
          source={require("../images/saintrac.png")}
          style={{
            position: "absolute",
            bottom: 20,
            height: 35,
            width: 130,
            alignSelf: "center"
          }}
        />
      </View>
    );
  }
}

export default Launch;
