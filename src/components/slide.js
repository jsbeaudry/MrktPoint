import * as React from "react";

import { View, ImageBackground, Text } from "react-native";

import Swiper from "react-native-web-swiper";
import { colors } from "../utils/colors";
import { screenWidth } from "../utils/variables";
export default class App extends React.Component {
  render() {
    const { height } = this.props;
    return (
      <View style={{ height: height, width: screenWidth, marginTop: 100 }}>
        <Swiper
          from={1}
          minDistanceForAction={0.1}
          // controlsProps={{
          //   dotsTouchable: true,
          //   prevPos: "left",
          //   nextPos: "right",
          //   nextTitle: "",
          //   prevTitle: ""
          // }}

          controlsProps={{
            dotsTouchable: true,
            prevPos: "left",
            nextPos: "right",
            nextTitle: "",
            prevTitle: "",
            DotComponent: ({ index, isActive, onPress }) => (
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: isActive ? colors.yellow : colors.grey,
                  borderRadius: 4,
                  marginTop: 30,
                  marginLeft: 8,
                  marginRight: 8
                }}
              />
            )
          }}
        >
          {this.props.array.map((item, index) => (
            <View key={index}>
              <View
                key={JSON.stringify(item)}
                style={{
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,.0)",
                  height,
                  justifyContent: "center",
                  borderRadius: 0
                }}
              >
                <ImageBackground
                  source={item.url}
                  style={{ width: 271, height: 236 }}
                  resizeMode="contain"
                  borderRadius={0}
                />
                <Text
                  style={{
                    textAlign: "center",
                    marginLeft: 10,
                    color: "#000",
                    fontWeight: "900",
                    fontSize: 30,
                    marginBottom: 10
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginLeft: 10,
                    color: "#000",
                    fontSize: 14,
                    width: screenWidth - 100,
                    marginTop: 5,
                    marginBottom: 30
                  }}
                >
                  {item.subTitle}
                </Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    );
  }
}
