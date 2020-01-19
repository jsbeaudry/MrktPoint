import React, { Component } from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const indice = 0.5;

let width = moderateScale(160, indice);
let height = moderateScale(230, indice);
// ////////////////////////Card//////////////////////////
export default class Card extends Component {
  render() {
    const {
      h,
      w,
      showText,
      borderRad,
      imageUrl,
      opacity,
      title,
      showTextBellow,
      textBellow
    } = this.props;
    width = moderateScale(w, indice);
    height = moderateScale(h, indice);

    return (
      <View
        style={[
          { width, height, borderRadius: borderRad || 0 },
          styles.container
        ]}
      >
        <ImageBackground
          borderRadius={borderRad || 0}
          style={{ width, height, borderRadius: borderRad || 0 }}
          source={imageUrl}
        >
          <View
            style={{
              borderRadius: borderRad || 0,
              width,
              height,
              backgroundColor: `rgba(0,0,0,${opacity || 0})`,
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            {showText === true
              ? <Text style={styles.text}>
                  {title}
                </Text>
              : null}
          </View>
        </ImageBackground>

        {showTextBellow
          ? <Text
              style={{
                alignSelf: "center",
                color: "gray",
                fontWeight: "500",
                marginTop: 5
              }}
            >
              {textBellow}
            </Text>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0
    },
    shadowOpacity: 0.13,
    shadowRadius: 4,

    elevation: 2
  },
  image: {
    width,
    height
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "400",
    marginBottom: 10
  }
});
