import React, { Component } from "react";
import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
const imAddBag = require("../images/successAdd.png");
const confirm_step = require("../images/confirm_step.png");
import { colors } from "../utils/colors";
import { screenWidth } from "../utils/variables";
import Icon from "@expo/vector-icons/Ionicons";
export default class orderConfirm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Confirmation",
      gesturesEnabled: false,
      headerLeft: (
        <TouchableOpacity
          style={{
            flex: 20,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingHorizontal: 15
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
            type="ionicon"
            color="#000"
            size={30}
            iconStyle={{ padding: 15 }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        borderBottomColor: "#fff",
        backgroundColor: "#fff"
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1
        }}
      >
        <Image
          source={confirm_step}
          style={{
            width: 260,
            marginTop: 20,
            borderColor: "#eee",
            borderWidth: 0,
            alignSelf: "center",
            resizeMode: "contain"
          }}
        />
        <Text
          style={{
            color: colors.grey,
            fontSize: 16,
            marginLeft: 20,
            marginTop: 10,
            fontWeight: "500"
          }}
        >
          Step 3
        </Text>
        <Text
          style={{
            color: colors.black,
            fontSize: 28,
            marginLeft: 20,
            marginTop: 5,
            fontWeight: "bold"
          }}
        >
          Confirmation
        </Text>
        <Image
          source={imAddBag}
          style={{
            width: 200,
            height: 200,
            marginTop: 100,
            resizeMode: "contain",
            alignSelf: "center"
          }}
        />
        <Text
          style={{
            marginTop: 30,
            color: "#000",
            fontSize: 13,
            marginHorizontal: 30,
            fontWeight: "600",
            textAlign: "center"
          }}
        >
          {`Congratilation your order has been successfully placed, we will let you know when the seller confirm.`}
        </Text>

        <TouchableOpacity
          style={{
            height: 50,
            marginTop: 50,
            width: screenWidth - 100,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0C4767",
            borderRadius: 26.52,
            position: "absolute",
            bottom: 25
          }}
          onPress={() => {
            this.props.navigation.push("Main");
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            {"Thank you"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
