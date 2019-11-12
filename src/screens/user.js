import React from "react";
import { View, Text } from "react-native";

export default class Launch extends React.Component {
  componentDidMount() {
    console.log("I am on");
  }

  render() {
    return (
      <View>
        <Text>This is screen is there </Text>
      </View>
    );
  }
}
