import React, { Component } from "react";
import { Text, ImageBackground, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

import { screenWidth, scaleIndice } from "../utils/variables";

export default class CardItem extends Component {
  render() {
    const {
      image,
      logo,
      backgroundColor,
      deliveryTime,
      isOpen,
      title,
      subTitle,
      showPrice,
      showDelivery,
      price,
      height_
    } = this.props;
    const width_ = screenWidth / 2 - moderateScale(20, scaleIndice);
    return (
      <View
        style={{
          width: width_,
          height: height_ || moderateScale(220, scaleIndice),
          margin: moderateScale(5, scaleIndice),
          borderRadius: moderateScale(8, scaleIndice),
          backgroundColor: "#fff",
          shadowColor: backgroundColor,
          shadowOpacity: 0.2,
          elevation: 1,
          shadowRadius: 2,
          shadowOffset: {
            height: 2,
            width: 0
          }
        }}
      >
        <View
          style={{
            width: width_,
            height: moderateScale(161, scaleIndice),
            borderRadius: moderateScale(8, scaleIndice),
            backgroundColor: "#fff"
          }}
        >
          <ImageBackground
            borderRadius={moderateScale(8, scaleIndice)}
            source={image}
            style={{
              width: width_,
              height: moderateScale(180, scaleIndice),
              resizeMode: "cover",
              zIndex: 0
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.08)",
                flex: 1,
                borderRadius: 8
              }}
            />
          </ImageBackground>
          {isOpen ? (
            <View
              style={{
                width: moderateScale(45, scaleIndice),
                height: moderateScale(16, scaleIndice),
                borderRadius: moderateScale(5, scaleIndice),
                backgroundColor: isOpen ? "#FEEB18" : "#0C4767",
                position: "absolute",
                top: moderateScale(10, scaleIndice),
                right: moderateScale(10, scaleIndice),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: isOpen ? "#0C4767" : "#FEEB18",
                  fontSize: moderateScale(7, scaleIndice),
                  fontWeight: "500"
                }}
              >
                {isOpen ? "Open now" : "Close"}
              </Text>
            </View>
          ) : null}
          <View
            style={{
              width: width_,
              height: moderateScale(70, scaleIndice),
              zIndex: 3,
              padding: moderateScale(10, scaleIndice),
              backgroundColor: "#fff",
              marginTop: moderateScale(-50, scaleIndice),
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "#272727",
                fontSize: moderateScale(12, scaleIndice),
                fontWeight: "700",
                lineHeight: moderateScale(13, scaleIndice)
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                paddingVertical: 5,
                color: "#929292",
                fontSize: moderateScale(10, scaleIndice),
                lineHeight: moderateScale(10, scaleIndice),
                fontWeight: "300"
              }}
            >
              {subTitle}
            </Text>
          </View>
        </View>
        {showPrice ? (
          <Text
            style={{
              position: "absolute",
              bottom: moderateScale(13, scaleIndice),
              right: moderateScale(10, scaleIndice),
              color: "#272727",
              fontSize: 12,
              fontWeight: "700",
              lineHeight: 12
            }}
          >
            {price}
          </Text>
        ) : (
          <ImageBackground
            borderRadius={15}
            source={logo}
            style={{
              width: moderateScale(30, scaleIndice),
              height: moderateScale(30, scaleIndice),
              position: "absolute",
              bottom: moderateScale(10, scaleIndice),
              right: moderateScale(10, scaleIndice)
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.04)",
                flex: 1,
                borderRadius: 15
              }}
            />
          </ImageBackground>
        )}
        {showDelivery ? (
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: moderateScale(10, scaleIndice),
              left: moderateScale(10, scaleIndice)
            }}
          >
            <View
              style={{
                width: moderateScale(70, scaleIndice),
                height: moderateScale(17, scaleIndice),
                borderRadius: moderateScale(50, scaleIndice),
                marginRight: moderateScale(3, scaleIndice),
                marginTop: moderateScale(5, scaleIndice),
                backgroundColor: "#FEEB18",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#0C4767",
                  fontSize: moderateScale(8, scaleIndice),
                  fontWeight: "800",
                  letterSpacing: 0.16
                }}
              >
                {deliveryTime}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
