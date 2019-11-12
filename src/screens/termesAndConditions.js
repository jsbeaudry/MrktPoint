import React from "react";
import { SafeAreaView, ScrollView, Text, View, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { hp } from "../utils/variables";
import { Button } from "../components/index";
import { colors } from "../utils/colors";

class Launch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Termes of uses",
      headerStyle: {
        backgroundColor: "#fff",
        borderBottomColor: "transparent"
      },
      headerLeft: (
        <Icon
          onPress={() => navigation.goBack()}
          size={30}
          style={{ marginLeft: 20 }}
          name={"ios-arrow-back"}
          color={"#000"}
        />
      )
    };
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ marginBottom: 120 }}>
          <StatusBar barStyle="default" />

          <Text
            style={{
              textAlign: "left",
              alignSelf: "flex-start",
              textAlign: "justify",
              marginTop: 20,
              marginHorizontal: 20,
              color: "#4A4949",
              fontSize: hp("1.5%")
            }}
          >
            {
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.l Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
          </Text>
        </ScrollView>
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 20,
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: "#fff",
            height: 120
          }}
        >
          <Button
            onClick={() => {}}
            textStyle={{ color: "#fff" }}
            text="Agree"
            buttonStyle={{
              backgroundColor: colors.blue,
              height: 53,
              width: 305,
              marginTop: 0,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center"
            }}
          />

          <Button
            onClick={() => {}}
            textStyle={{ color: colors.blue }}
            text="Decline"
            buttonStyle={{
              backgroundColor: "transparent",
              height: 53,
              width: 305,
              marginTop: 10,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center"
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Launch;
