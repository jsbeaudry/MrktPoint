import React from "react";
import { SafeAreaView, TextInput, Text, Image, View, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { screenWidth, scaleIndice, hp, wp } from "../utils/variables";
import { Button } from "../components/index";
import { colors } from "../utils/colors";

class Launch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Image
          source={require("../images/logo2.png")}
          style={{
            height: hp("5%"),
            width: hp("5%"),
            alignSelf: "center"
          }}
        />
      ),
      headerStyle: {
        backgroundColor: "#fff",
        borderBottomColor: "transparent"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRight: <Icon size={40} style={{ marginRight: 20 }} name="ios-close" color="#000" />,
      headerLeft: (
        <Icon
          onPress={() => navigation.goBack()}
          size={30}
          style={{ marginLeft: 20 }}
          name="ios-arrow-back"
          color="#000"
        />
      )
    };
  };

  // Render any loading content that you like here
  render() {
    const { email } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <StatusBar barStyle="default" />

          <Text
            style={{
              textAlign: "left",
              alignSelf: "flex-start",
              marginTop: 40,
              marginLeft: 20,
              color: "#000",
              fontWeight: "bold",
              fontSize: hp("2.5%"),
              width: wp("70%")
            }}
          >
            {"Forgot password"}
          </Text>

          <Text
            style={{
              textAlign: "left",
              alignSelf: "flex-start",
              marginTop: 20,
              marginLeft: 20,
              color: "#000",
              fontSize: hp("1.5%"),
              width: wp("70%")
            }}
          >
            {"Craving for your favourite food? Takeaway will deliver it, wherever you are!"}
          </Text>

          <TextInput
            autoCorrect={false}
            returnKeyType="go"
            autoCapitalize="none"
            placeholder="Enter your email address"
            value={email}
            onChangeText={text => {
              this.setState({
                email: text
              });
            }}
            style={{
              width: "90%",
              fontSize: 15,
              paddingVertical: 7,
              marginLeft: 20,
              marginTop: 40,
              borderBottomWidth: 1,
              borderBottomColor: "#1A1824"
            }}
          />

          <Button
            onClick={() => {}}
            textStyle={{ color: "#fff" }}
            text="Reset password"
            buttonStyle={{
              backgroundColor: colors.blue,
              height: 53,
              width: 305,
              marginTop: 100,
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
