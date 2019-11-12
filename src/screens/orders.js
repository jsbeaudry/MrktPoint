import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { scale, moderateScale, verticalScale } from "react-native-size-matters";
import { screenWidth, scaleIndice, formatNumber } from "../utils/variables";
import { colors } from "../utils/colors";

import Carousel from "react-native-snap-carousel";
class Orders extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Orders",
      headerLeft: (
        <TouchableOpacity
          style={{
            flex: 20,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 20
          }}
          onPress={() => {
            navigation.navigate("Main");
          }}
        >
          <Icon
            name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
            type="ionicon"
            color="#000"
            size={moderateScale(30, 0)}
            iconStyle={{}}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        borderBottomColor: "#fff"
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      itemLen: 4,
      selected: 0,
      steps: []
    };
  }
  componentWillMount() {
    setTimeout(() => {
      // this.state.steps.push("All");
      this.setState(prevState => ({
        steps: ["Placed", "On the way", "Delivered", "All"]
      }));
    }, 100);
  }

  render() {
    const { selected, steps, itemLen } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="blue" barStyle={"dark-content"} />
        <View style={{ flex: 1 }}>
          {/* -------------------------------------------------------------------------- */
          /*                               Swipe category                               */
          /* -------------------------------------------------------------------------- */}

          <View style={{ height: 40 }}>
            <Carousel
              onSnapToItem={index =>
                this.setState({ selected: index, itemLen: steps[index].length })
              }
              layout={"default"}
              ref={c => {
                this._carousel = c;
              }}
              data={steps}
              renderItem={({ item, index }) => {
                //this.setState({ itemLen: item.length });
                return (
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(15, scaleIndice),
                        marginHorizontal: moderateScale(0, scaleIndice),
                        color: selected != index ? "#8E8E93" : colors.blue,
                        fontWeight: selected === index ? "600" : "100"
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              sliderWidth={screenWidth}
              sliderHeight={30}
              itemWidth={100}
              itemHeight={30}
            />
          </View>
          <ScrollView style={{ flex: 9, padding: 10 }}>
            {1 == 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 100,
                  backgroundColor: "#fff",
                  width: screenWidth - 60,
                  marginTop: 90,
                  marginBottom: 30,
                  alignSelf: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.15,
                  borderRadius: 12,
                  elevation: 1,
                  shadowRadius: 2,
                  shadowOffset: {
                    height: 2,
                    width: 0
                  }
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    opacity: 1,
                    fontSize: moderateScale(16, scaleIndice),
                    fontWeight: "600"
                  }}
                >
                  {"No order found"}
                </Text>
              </View>
            ) : null}
            {[
              {
                orderNumber: 3432453,
                step: "Placed",
                shop: "Valerio Canez",
                items: [
                  { name: "LG Smart TV 60”" },
                  { name: "Toaster 2 Slices White" }
                ]
              },
              {
                orderNumber: 3432453,
                step: "Confirmed",
                shop: "Char-Broil",
                items: [{ name: "Barbecue Char-Broil" }]
              },
              {
                orderNumber: 3432453,
                step: "Delivered",
                shop: "Char-Broil",
                items: [
                  { name: "Barbecue Char-Broil" },
                  { name: "Barbecue Char-Broil" },
                  { name: "Barbecue Char-Broil" }
                ]
              },
              {
                orderNumber: 3432453,
                shop: "General Electric",
                step: "On the way",
                items: [{ name: "LG Smart TV 60” " }]
              }
            ]
              .filter(i =>
                selected == steps.length - 1 ? true : i.step == steps[selected]
              )
              .map((item, index) => (
                <View
                  key={JSON.stringify(item + index)}
                  style={{
                    backgroundColor: "#fff",
                    width: screenWidth - 60,
                    marginTop: 0,
                    marginBottom: 30,
                    alignSelf: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.15,
                    borderRadius: 12,
                    elevation: 1,
                    shadowRadius: 4,
                    shadowOffset: {
                      height: 2,
                      width: 0
                    }
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      marginVertical: 10,
                      padding: 15,
                      borderBottomColor: "#f9f9f9",
                      borderBottomWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.grey
                      }}
                    >
                      Order ID: #{item.orderNumber}
                    </Text>
                    <View
                      style={{
                        backgroundColor: colors.blue,
                        paddingHorizontal: 7,
                        paddingVertical: 4,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ fontSize: 10, color: colors.white }}>
                        {item.step}
                      </Text>
                    </View>
                  </View>
                  {item.items.map((item1, index) => (
                    <OrderItem
                      key={item + index}
                      title={item1.name}
                      subTitle={item.shop}
                      image={{
                        uri:
                          "https://media.istockphoto.com/photos/business-and-education-background-picture-id671101136?k=6&m=671101136&s=612x612&w=0&h=5-HtieP2_hJIR_RZS8x8KqgMaXwOZlt6AtRaiNCROd4="
                      }}
                      price={23}
                      stock={44}
                      count={3232}
                      total={444}
                      status={"pending"}
                      updateCount={() => {}}
                    />
                  ))}
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Orders;

export class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count,
      image: this.props.image
    };
  }

  render() {
    return (
      <View
        style={{
          margin: scale(10),
          flexDirection: "row",
          borderBottomWidth: 0,
          borderBottomColor: "#eee",
          paddingBottom: 10,
          height: verticalScale(54),
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={this.props.image}
            borderRadius={10}
            style={{
              width: verticalScale(54),
              height: verticalScale(54),
              alignSelf: "center"
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
              {this.props.subTitle}
            </Text>
            <Text
              style={{
                color: "#000",
                marginTop: 5,
                fontSize: scale(13),
                fontWeight: "500",
                letterSpacing: -0.36
              }}
            >
              {this.props.title}
            </Text>

            <Text
              style={{
                height: verticalScale(22),
                color: "#000",
                fontSize: scale(12),
                letterSpacing: -0.29,
                lineHeight: verticalScale(22)
              }}
            >
              {formatNumber(this.props.price * this.state.count)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
