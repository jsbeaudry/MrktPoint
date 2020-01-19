import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { screenWidth, formatNumber } from "../utils/variables";
import Carousel from "react-native-snap-carousel";
export class orderDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Order details",
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
    this.state = {
      products: [],
      selected: {},
      step: "delivered"
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState(
        {
          products: this.props.navigation.getParam("products", [])
        },
        () => {
          //console.log(this.props.navigation.getParam("asset", ""));

          this.setState({
            selected: this.state.products[0]
            // step: this.state.products[0].history[
            //   this.state.products[0].history.length - 1
            // ].step
          });
        }
      );
    }, 300);
  }
  formatDate = date => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      " " +
      strTime
    );
  };
  render() {
    const { products, selected, step } = this.state;
    return (
      <View>
        <ScrollView>
          {products.length > 0 ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 20,
                  marginTop: 20
                }}
              >
                <Text style={{ flex: 3, fontSize: 20, fontWeight: "700" }}>
                  {"Order ID #"}
                  {selected && selected._id ? selected.orderId : ""}
                </Text>
                <Icon
                  name={"md-more"}
                  type="ionicon"
                  color="#000"
                  size={30}
                  iconStyle={{ flex: 1 }}
                />
              </View>

              <Carousel
                layout={"default"}
                onSnapToItem={index => {
                  this.setState({
                    selected: products[index]
                  });
                }}
                ref={c => {
                  this._carousel = c;
                }}
                data={products}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        height: 180,
                        width: 180,
                        marginVertical: 20,
                        borderRadius: 20,
                        marginHorizontal: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        elevation: 1,
                        shadowRadius: 6,
                        shadowOffset: {
                          height: 0,
                          width: 0
                        }
                      }}
                    >
                      <Image
                        source={
                          item.product[0] &&
                          item.product[0].pictures &&
                          item.product[0].pictures[0]
                            ? {
                                uri: item.product[0].pictures[0].url
                              }
                            : require("../images/logo_mrkt.jpg")
                        }
                        style={{
                          width: 140,
                          height: 140,
                          resizeMode: "contain"
                        }}
                      />
                    </View>
                  );
                }}
                sliderWidth={screenWidth}
                sliderHeight={180}
                itemWidth={180}
                itemHeight={180}
              />

              {selected && selected._id ? (
                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#40434D",
                      marginLeft: 15
                    }}
                  >
                    {"Placed on " + this.formatDate(selected.createAt)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 5,
                      color: "#40434D",
                      marginLeft: 15
                    }}
                  >
                    {products.length + " items, 1 package"}
                  </Text>
                  <View
                    style={{
                      marginVertical: 20,
                      height: 1,
                      width: "100%",
                      backgroundColor: "#E5E5E5"
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 20,
                      marginTop: 20
                    }}
                  >
                    <Text style={{ flex: 3, fontSize: 17, fontWeight: "500" }}>
                      {"Delivery Status"}
                    </Text>
                    <View
                      style={{
                        backgroundColor: colors.blue,
                        paddingHorizontal: 7,
                        borderRadius: 10,

                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ fontSize: 10, color: colors.white }}>
                        {step}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={
                      step == "pending"
                        ? require("../images/order_st_1.png")
                        : step == "processing"
                        ? require("../images/order_st_2.png")
                        : step == "on the road"
                        ? require("../images/order_st_3.png")
                        : require("../images/order_st_4.png")
                    }
                    style={{
                      width: screenWidth - 40,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginVertical: 10
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 20,
                      marginTop: 20
                    }}
                  >
                    <Text style={{ flex: 2, fontSize: 17, fontWeight: "300" }}>
                      {"Order is " +
                        selected.history[selected.history.length - 1].step}
                    </Text>

                    <Text
                      style={{
                        flex: 2,
                        fontSize: 17,
                        fontWeight: "700",
                        textAlign: "right"
                      }}
                    >
                      {this.formatDate(
                        selected.history[selected.history.length - 1].date
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      height: 1,
                      width: "100%",
                      backgroundColor: "#E5E5E5"
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 17,
                      fontWeight: "700"
                    }}
                  >
                    {"Payment Information"}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "space-between",
                      backgroundColor: "#fff",
                      marginTop: 0,
                      height: 30,
                      paddingHorizontal: 20
                    }}
                  >
                    <View
                      style={{
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: "#40434D",
                          fontSize: 15,
                          fontWeight: "300",
                          letterSpacing: -0.41,
                          lineHeight: 22,
                          textAlign: "left",
                          alignSelf: "flex-start"
                        }}
                      >
                        {"Subtotal"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 12,
                          fontWeight: "400",
                          letterSpacing: -0.36,
                          lineHeight: 22,
                          alignSelf: "flex-end"
                        }}
                      >
                        {formatNumber(selected.price)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "space-between",
                      backgroundColor: "#fff",
                      marginTop: 0,
                      height: 30,

                      paddingHorizontal: 20
                    }}
                  >
                    <View
                      style={{
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: "#40434D",
                          fontSize: 15,
                          fontWeight: "400",
                          letterSpacing: -0.41,
                          lineHeight: 22,
                          textAlign: "left",
                          alignSelf: "flex-start"
                        }}
                      >
                        {"Quantity"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 12,
                          fontWeight: "400",
                          letterSpacing: -0.36,
                          lineHeight: 22,
                          alignSelf: "flex-end"
                        }}
                      >
                        {selected.quantity + " Unts"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "space-between",
                      backgroundColor: "#fff",
                      marginTop: 0,
                      height: 30,

                      paddingHorizontal: 20
                    }}
                  >
                    <View
                      style={{
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: "#40434D",
                          fontSize: 15,
                          fontWeight: "400",
                          letterSpacing: -0.41,
                          lineHeight: 22,
                          textAlign: "left",
                          alignSelf: "flex-start"
                        }}
                      >
                        {"Delivery fee"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 12,
                          fontWeight: "400",
                          letterSpacing: -0.36,
                          lineHeight: 22,
                          alignSelf: "flex-end"
                        }}
                      >
                        {formatNumber(0)}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "space-between",
                      backgroundColor: "#fff",
                      height: 30,

                      paddingHorizontal: 20
                    }}
                  >
                    <View
                      style={{
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: "#40434D",
                          fontSize: 15,
                          fontWeight: "bold",
                          letterSpacing: -0.41,
                          lineHeight: 22,
                          textAlign: "left",
                          alignSelf: "flex-start"
                        }}
                      >
                        {"Total "}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 12,
                          fontWeight: "900",
                          letterSpacing: -0.36,
                          lineHeight: 22,
                          alignSelf: "flex-end"
                        }}
                      >
                        {formatNumber(selected.price * selected.quantity)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      marginLeft: 20,
                      marginTop: 20,
                      fontSize: 17,
                      fontWeight: "700"
                    }}
                  >
                    {"Delivery Address"}
                  </Text>
                  <Text
                    style={{
                      color: "#40434D",
                      fontSize: 15,
                      paddingHorizontal: 20,
                      marginVertical: 10,
                      marginBottom: 100,
                      fontWeight: "300",
                      letterSpacing: -0.41,
                      lineHeight: 22,
                      textAlign: "left",
                      alignSelf: "flex-start"
                    }}
                  >
                    {products[0].shippingAddress.address1 +
                      ", " +
                      products[0].shippingAddress.address2 +
                      ", " +
                      products[0].shippingAddress.city +
                      ", " +
                      products[0].shippingAddress.country}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
        <TouchableOpacity
          style={{
            height: 53,
            width: 305,
            position: "absolute",
            bottom: 10,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0C4767",
            borderRadius: 26.52,

            marginVertical: 10
          }}
          onPress={() => {}}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#fff"
            }}
          >
            {
              //"Cancel Order"
              "Review"
            }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default orderDetails;
