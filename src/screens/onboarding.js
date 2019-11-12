import React from "react";
import {
  View,
  AsyncStorage,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar
} from "react-native";

import Swiper from "react-native-swiper";

import ViewPager from "@react-native-community/viewpager";

import { colors } from "../utils/colors";
import Slide from "../components/slide";
import { screenWidth, hp } from "../utils/variables";

export default class Intro extends React.Component {
  componentDidMount() {}

  go = async () => {
    try {
      await AsyncStorage.setItem("@hasBoarded", "done");
    } catch (error) {
      console.log(error);
    }
    this.props.navigation.navigate("Signin");
  };

  render() {
    const height = 500;
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          alignItems: "center",
          flex: 1
        }}
      >
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <Image
          source={require("../images/logo2.png")}
          style={{
            height: hp("8%"),
            width: hp("8%"),
            alignSelf: "center",
            marginTop: hp("5%")
          }}
        />

        {/**/}
        <View
          style={{
            position: "absolute",
            top: 20,
            marginTop: 50,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 0,
            height
          }}
        >
          <Slide
            array={[
              {
                url: require("../images/Onboarding3.png"),
                title: "Find what you love",
                subTitle:
                  "Discover the best items from over 100 shops, restaurants, and supermarkets."
              },
              {
                url: require("../images/Onboarding2.png"),
                title: "Fast delivery",
                subTitle:
                  "Fast & free delivery to your home or office. We will deliver it, wherever you are!"
              },
              {
                url: require("../images/Onboarding1.png"),
                title: "Enjoy the experience",
                subTitle:
                  "Don’t feel like going out? No problem, we’ll deliver your order. In bed! :)"
              },
              {
                url: require("../images/Onboarding4.png"),
                title: "Enjoy the experience",
                subTitle:
                  "Don’t feel like going out? No problem, we’ll deliver your order. In bed! :)"
              }
            ]}
            height={350}
          />
        </View>

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 80,
            height: 53,
            width: 305,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.blue,
            borderRadius: 26.52,
            alignSelf: "center",
            marginVertical: 20
          }}
          onPress={() => {
            this.go();
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: colors.white
            }}
          >
            {"Sign up"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            height: 53,
            width: 305,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRadius: 26.52,
            alignSelf: "center",
            marginVertical: 20
          }}
          onPress={() => {
            this.props.navigation.navigate("Main");
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: colors.back
            }}
          >
            {"SKIP"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1
  }
});
