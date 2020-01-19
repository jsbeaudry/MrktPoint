import React from "react";
import { Image, StatusBar, View, AsyncStorage } from "react-native";
import { hp } from "../utils/variables";
import { Stitch } from "mongodb-stitch-react-native-sdk";
import { stitchConfig } from "../services/stitch";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/user";
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
          if (
            Stitch.defaultAppClient.auth.activeUserAuthInfo &&
            Stitch.defaultAppClient.auth.activeUserAuthInfo.userId != undefined
          ) {
            this.props.setUser();
            this.props.navigation.navigate("Signin");
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

const mapStateToProps = state => {
  const { user } = state.user;
  return { user };
};
export default connect(mapStateToProps, { setUser })(Launch);
