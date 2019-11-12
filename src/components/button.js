import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

export default class Button extends Component {
  render() {
    const { text, buttonStyle, textStyle, onClick } = this.props;
    return (
      <TouchableOpacity onPress={() => onClick()} style={buttonStyle}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
