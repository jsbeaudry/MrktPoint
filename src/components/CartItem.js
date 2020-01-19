import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { moderateScale } from "react-native-size-matters";
import { Subscribe } from "unstated";
import { StateContainer } from "../utils/stateContainer";
import { formatNumber } from "../utils/variables";
//
export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count
    };
  }

  render() {
    const { image, title, subTitle, price, stock, last } = this.props;
    return (
      <View
        style={{
          margin: scale(10),
          flexDirection: "row",
          borderBottomWidth: last === false ? 0.0 : 0.0,
          borderBottomColor: "#eee",
          paddingBottom: 15,
          height: verticalScale(54),
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={image}
            borderRadius={0}
            style={{
              width: verticalScale(60),
              height: verticalScale(50),
              alignSelf: "center",
              resizeMode: "contain"
            }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 10
            }}
          >
            <Text
              style={{
                height: 16,
                color: "#929292",
                fontSize: scale(10),
                fontWeight: "400",
                letterSpacing: -0.29,

                lineHeight: verticalScale(16)
              }}
            >
              {subTitle}
            </Text>
            <Text
              style={{
                color: "#000",
                marginTop: 5,
                fontSize: scale(12),
                fontWeight: "700",
                letterSpacing: -0.36
              }}
            >
              {title}
            </Text>

            <Text
              style={{
                height: verticalScale(22),
                color: "#000",
                fontSize: scale(12),
                fontWeight: "bold",
                letterSpacing: -0.29,
                lineHeight: verticalScale(22)
              }}
            >
              {price}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
            width: scale(80),
            height: verticalScale(30),
            borderRadius: 15,
            backgroundColor: "#f3f5f9",

            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              height: verticalScale(30),
              width: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              if (this.state.count > 1) {
                this.setState(
                  prevState => ({ count: prevState.count - 1 }),
                  () => {
                    // container.modifyItemCount(
                    //   this.props.id,
                    //   this.state.count
                    // );
                    this.props.updateCount(this.state.count, this.props.id);
                  }
                );
              }
            }}
          >
            <Text
              sstyle={{
                height: verticalScale(10),
                width: scale(10),
                backgroundColor: "#535bfe"
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              width: scale(20),
              color: "#535bfe",
              fontSize: scale(15),
              fontWeight: "500",
              letterSpacing: -0.36,
              lineHeight: scale(22),
              textAlign: "center"
            }}
          >
            {this.state.count}
          </Text>
          <TouchableOpacity
            style={{
              height: verticalScale(30),
              width: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              if (this.state.count < stock) {
                this.setState(
                  prevState => ({ count: prevState.count + 1 }),
                  () => {
                    // container.modifyItemCount(
                    //   this.props.id,
                    //   this.state.count
                    // );
                    this.props.updateCount(this.state.count, this.props.id);
                  }
                );
              }
            }}
          >
            <Text
              sstyle={{
                height: verticalScale(10),
                width: scale(10),
                backgroundColor: "#535bfe"
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
