import React from "react";
import {
  StyleSheet,
  Animated,
  Platform,
  ScrollView,
  Text,
  AsyncStorage,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  View
} from "react-native";
import Swiper from "react-native-swiper";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { colors } from "../utils/colors";
import {
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT,
  scaleIndice,
  screenWidth,
  screenHeight,
  formatNumber
} from "../utils/variables";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
const imAddBag = require("../images/successAdd.png");
import { BSON } from "mongodb-stitch-react-native-sdk";

import { getOne, addData, deleteOne, update } from "../services/stitch";

import { connect } from "react-redux";
import { addItem, setCarts } from "../redux/actions/bags";
import { setUser } from "../redux/actions/user";
const ObjectId = BSON.ObjectId;
let prod = null;
class Details extends React.Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      bags: [],
      user: {},
      count: 1,
      product: {},
      asset: {},
      top: -88,
      currentValue: 0,
      isDisabled: false,
      isModalVisible: false,
      like_product: "grey"
    };
    prod = this.props.navigation.getParam("product", {});
  }
  toggleModal = () => {
    this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
  };
  componentWillMount() {
    this.props.setCarts();
  }
  componentDidMount() {
    //set if product has been like
    this.setState({
      like_product:
        this.props.user.wishlist.filter(
          i => i.productId == prod.productId.toString()
        ).length > 0
          ? "red"
          : "grey"
    });
    this.props.navigation.setParams({
      fadeValue: 0
    });
    this.setState(
      { asset: this.props.navigation.getParam("business", {}) },
      () => {}
    );

    getOne("products", { _id: prod.productId })
      .then(results => {
        results[0].price = results[0].price ? results[0].price : 0.0;
        this.setState(
          {
            product: results[0]
          },
          () => {}
        );
      })
      .catch(error => {
        console.log(error);

        this.setState({
          product: {}
        });
      });
  }

  _start = a => {
    this.setState({
      fadeValue: a
    });

    if (this.state.top < -10) {
      this.setState(prevState => ({
        top: prevState.top + a + 1
      }));
    }
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    this._start(contentOffset.y / 300);

    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  // load = async STORAGE_KEY => {
  //   try {
  //     const name = await AsyncStorage.getItem(STORAGE_KEY);

  //     if (name !== null) {
  //       //console.log(JSON.parse(name));
  //       this.setState({
  //         bags: JSON.parse(name)
  //       });
  //     }
  //   } catch (e) {
  //     console.error("Failed to load .");
  //   }
  // };

  // save = async (STORAGE_KEY, value) => {
  //   try {
  //     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));

  //     this.load("bags");
  //   } catch (e) {
  //     console.error("Failed to save name.");
  //   }
  // };

  like = () => {
    this.setState(
      {
        like_product: this.state.like_product == "grey" ? "red" : "grey"
      },
      () => {
        if (
          this.props.user.wishlist.filter(
            i => i.productId == prod.productId.toString()
          ).length == 0
        ) {
          let data = {
            custumerId: this.props.user.user_id,
            productId: prod.productId,
            assetId: new ObjectId(this.state.product.asset.id),
            createAdt: new Date()
          };

          addData("favorites_products", data)
            .then(() => {
              this.props.setUser();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          deleteOne("favorites_products", {
            custumerId: this.props.user.user_id,
            productId: prod.productId
          })
            .then(() => {
              this.props.setUser();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    );
  };

  render() {
    const { product } = this.state;
    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <StatusBar backgroundColor="blue" barStyle="dark-content" />

        <Animated.View
          style={{
            width: screenWidth,
            height: HEADER_HEIGHT,
            paddingTop: STATUS_BAR_HEIGHT,
            position: "absolute",
            right: 0,
            zIndex: 999,
            flexDirection: "row",
            backgroundColor: `rgba(256,256,256,${this.state.fadeValue})`,
            paddingHorizontal: 15
          }}
        >
          <TouchableOpacity
            style={{
              flex: 20,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
              type="ionicon"
              color="#000"
              size={moderateScale(30, scaleIndice)}
              iconStyle={{}}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 60,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {prod != null && prod.name ? (
              <Text
                style={{
                  color: "#000",
                  opacity: 1,
                  fontSize: moderateScale(16, scaleIndice),
                  fontWeight: "600"
                }}
              >
                {prod.name.length <= 17
                  ? prod.name
                  : prod.name.substring(0, 17) + "..."}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 20,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                height: moderateScale(30, scaleIndice),
                width: moderateScale(30, scaleIndice)
              }}
              onPress={() => {}}
            />
            <TouchableOpacity
              style={{
                height: moderateScale(30, scaleIndice),
                width: moderateScale(30, scaleIndice),
                marginTop: moderateScale(5, scaleIndice),
                marginRight: moderateScale(10, scaleIndice),
                backgroundColor: "#fff",
                borderRadius: moderateScale(15, scaleIndice),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                this.like();
              }}
            >
              <Ionicons
                name="ios-heart"
                type="ionicon"
                color={this.state.like_product}
                size={moderateScale(20, scaleIndice)}
                iconStyle={{ marginTop: moderateScale(5, scaleIndice) }}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.fadeValue ? this.state.fadeValue : 0,
            width: screenWidth,
            height: HEADER_HEIGHT,
            paddingTop: STATUS_BAR_HEIGHT,
            position: "absolute",
            right: 0,
            zIndex: 999,
            flexDirection: "row",
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 15,

            shadowColor: "#000000",
            shadowOpacity: 0.2,
            elevation: 2,
            shadowRadius: 7,
            shadowOffset: {
              height: 2,
              width: 0
            }
          }}
        >
          <TouchableOpacity
            style={{
              flex: 20,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
              type="ionicon"
              color="#000"
              size={moderateScale(30, scaleIndice)}
              iconStyle={{}}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 60,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {prod != null && prod.name ? (
              <Text
                style={{
                  color: "#000",
                  opacity: 1,
                  fontSize: moderateScale(16, scaleIndice),
                  fontWeight: "600"
                }}
              >
                {prod.name.length <= 17
                  ? prod.name
                  : prod.name.substring(0, 17) + "..."}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 20,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                height: moderateScale(30, scaleIndice),
                width: moderateScale(30, scaleIndice)
              }}
              onPress={() => {}}
            />
            <TouchableOpacity
              style={{
                height: moderateScale(30, scaleIndice),
                width: moderateScale(30, scaleIndice),
                marginTop: moderateScale(5, scaleIndice),
                marginRight: moderateScale(10, scaleIndice),
                backgroundColor: "#fff",
                borderRadius: moderateScale(15, scaleIndice),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                this.like();
              }}
            >
              <Ionicons
                name="ios-heart"
                type="ionicon"
                color={this.state.like_product}
                size={moderateScale(20, scaleIndice)}
                iconStyle={{ marginTop: moderateScale(5, scaleIndice) }}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 110,
            width: screenWidth,
            backgroundColor: "#fff",
            zIndex: 9999,
            paddingTop: 20,
            shadowColor: "#000000",
            shadowOpacity: 0.2,
            elevation: 2,
            shadowRadius: 7,
            shadowOffset: {
              height: 2,
              width: 0
            }
          }}
        >
          <View
            style={{
              paddingTop: 20,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 30,
              left: 5
            }}
          >
            <Text
              style={{
                fontSize: 15
              }}
            >
              Quantity:
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                paddingLeft: 10,
                paddingRight: 10,
                width: scale(100),
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
                    this.setState(prevState => ({
                      count: prevState.count - 1
                    }));
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
                  if (this.state.count < 20) {
                    this.setState(prevState => ({
                      count: prevState.count + 1
                    }));
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
          <TouchableOpacity
            style={{
              height: 47,

              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#0C4767",
              borderRadius: 26.52,
              position: "absolute",
              right: 15,
              bottom: 40
            }}
            onPress={() => {
              this.toggleModal();
              let isNew = true;

              for (let index = 0; index < this.props.carts.length; index++) {
                const element = this.props.carts[index];
                if (element._id.toString() == product._id.toString()) {
                  isNew = false;
                  this.props.carts[index].count =
                    this.props.carts[index].count + this.state.count;
                  break;
                }
              }
              if (isNew == true) {
                product.count = this.state.count;
                product.assetName = this.state.asset.name;
                product.assetCurrency = this.state.asset.currency;
                product.assetRate = this.state.asset.all.rate;
                this.props.carts.push(product);
              }

              //this.props.addItem(product);

              update(
                "bags",
                { custumerId: this.props.user.user_id },
                { products: this.props.carts }
              )
                .then(() => {
                  this.props.setCarts();
                })
                .catch(error => {
                  console.log(error);
                });
            }}
          >
            {this.state.asset &&
            this.state.asset.currency &&
            product.currency ? (
              <Text
                style={{
                  fontSize: 15,
                  paddingHorizontal: 15,
                  color: "#fff"
                }}
              >
                {`Add to Bag (${formatNumber(
                  this.state.count *
                    product.price *
                    (this.state.asset.currency.toUpperCase() ==
                    product.currency.toUpperCase()
                      ? 1
                      : this.state.asset.all.rate.value),
                  this.state.asset.currency
                )})`}
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>

        {this.state.product.name ? (
          <ScrollView
            style={{
              zIndex: 1,
              width: screenWidth,
              backgroundColor: "transparent",
              marginBottom: 70
            }}
            bounces={false}
            onScroll={({ nativeEvent }) => {
              this.isCloseToBottom(nativeEvent);
            }}
            scrollEventThrottle={screenHeight}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                paddingTop: moderateScale(30, scaleIndice),
                width: screenWidth
              }}
            >
              <View
                style={{
                  marginBottom:
                    this.state.currentValue < 185
                      ? -this.state.currentValue / 8
                      : -185 / 8
                }}
              >
                <SliderRadius
                  margin={5}
                  data={product.pictures ? product.pictures : []}
                  height={400}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  minHeight: screenHeight,
                  padding: moderateScale(40, scaleIndice),
                  backgroundColor: "#fff",
                  borderTopLeftRadius: moderateScale(30, scaleIndice),
                  borderTopRightRadius: moderateScale(30, scaleIndice),
                  marginTop: moderateScale(-40, scaleIndice),
                  shadowColor: "#000000",
                  shadowOpacity: 0.15,
                  elevation: 2,
                  shadowRadius: 5,
                  shadowOffset: {
                    height: 2,
                    width: 0
                  }
                }}
              >
                <View
                  style={{
                    height: moderateScale(50, scaleIndice),
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      width: moderateScale(70, scaleIndice),
                      height: moderateScale(17, scaleIndice),
                      borderRadius: moderateScale(50, scaleIndice),
                      marginRight: moderateScale(5, scaleIndice),
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
                      {"Best seller"}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: moderateScale(70, scaleIndice),
                      height: moderateScale(17, scaleIndice),
                      borderRadius: 50,
                      marginRight: moderateScale(5, scaleIndice),
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
                      {this.state.asset.delivery_time
                        ? this.state.asset.delivery_time
                        : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: moderateScale(70, scaleIndice),
                      height: moderateScale(17, scaleIndice),
                      borderRadius: 50,
                      marginRight: moderateScale(5, scaleIndice),
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
                      {this.state.asset.free_delivery == true
                        ? "Free delivery"
                        : "$5 delivery"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}
                >
                  <Text
                    style={{
                      color: "#272727",
                      fontSize: moderateScale(20, scaleIndice),
                      textAlign: "justify",
                      flexWrap: "wrap",
                      fontWeight: "bold"
                    }}
                  >
                    {product.name}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Review")}
                  style={{
                    height: moderateScale(40, scaleIndice),
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        margin: 2,
                        height: moderateScale(10, scaleIndice),
                        width: moderateScale(10, scaleIndice),
                        borderRadius: moderateScale(10, scaleIndice),
                        backgroundColor: "#0C4767"
                      }}
                    />
                    <View
                      style={{
                        margin: moderateScale(2, scaleIndice),
                        height: moderateScale(10, scaleIndice),
                        width: moderateScale(10, scaleIndice),
                        borderRadius: moderateScale(10, scaleIndice),
                        backgroundColor: "#0C4767"
                      }}
                    />
                    <View
                      style={{
                        margin: moderateScale(2, scaleIndice),
                        height: moderateScale(10, scaleIndice),
                        width: moderateScale(10, scaleIndice),
                        borderRadius: moderateScale(10, scaleIndice),
                        backgroundColor: "#0C4767"
                      }}
                    />
                    <View
                      style={{
                        margin: moderateScale(2, scaleIndice),
                        height: moderateScale(10, scaleIndice),
                        width: moderateScale(10, scaleIndice),
                        borderRadius: moderateScale(10, scaleIndice),
                        backgroundColor: "#0C4767"
                      }}
                    />
                    <View
                      style={{
                        margin: moderateScale(2, scaleIndice),
                        height: moderateScale(10, scaleIndice),
                        width: moderateScale(10, scaleIndice),
                        borderRadius: moderateScale(10, scaleIndice),
                        backgroundColor: "#0C4767"
                      }}
                    />

                    <Text
                      style={{
                        color: "#7A7F83",
                        fontSize: moderateScale(11, scaleIndice),
                        fontWeight: "bold"
                      }}
                    >
                      {" 4.5\t22k review"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 25,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  {/* 
                    <Text
                          style={{
                            color: colors.grey,
                            fontSize: moderateScale(10, scaleIndice),
                            fontWeight: "400"
                          }}
                        >
                          {`$ ${product.price}`}
                    </Text> 
                      */}
                  <Text
                    style={{
                      color: colors.blue,
                      fontSize: moderateScale(16, scaleIndice),
                      fontWeight: "bold",
                      marginLeft: 0
                    }}
                  >
                    {formatNumber(
                      product.price *
                        (this.state.asset.currency.toUpperCase() ==
                        product.currency.toUpperCase()
                          ? 1
                          : this.state.asset.all.rate.value),
                      this.state.asset.currency
                    )}
                  </Text>
                  <View
                    style={{
                      height: moderateScale(17, scaleIndice),
                      borderRadius: 50,
                      marginLeft: 20,
                      marginRight: moderateScale(5, scaleIndice),
                      backgroundColor: "#FEEB18",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {/* <Text
                            style={{
                              color: "#0C4767",
                              fontSize: moderateScale(8, scaleIndice),
                              fontWeight: "800",
                              letterSpacing: 0.16,
                              paddingHorizontal: 10
                            }}
                          >
                            {"20 %"}
                          </Text> */}
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#eee",
                    marginBottom: 15,
                    marginTop: 15
                  }}
                />
                <View
                  style={{
                    height: 25,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <Ionicons
                    name="ios-information-circle"
                    type="ionicon"
                    color="#0C4767"
                    size={moderateScale(20, scaleIndice)}
                    iconStyle={{
                      marginTop: moderateScale(2, scaleIndice)
                    }}
                  />
                  <Text
                    style={{
                      color: "#7A7F83",
                      fontSize: moderateScale(12, scaleIndice),
                      marginBottom: 3,
                      marginLeft: 5
                    }}
                  >
                    {"Product from "}
                  </Text>
                  <Text
                    style={{
                      color: "#7A7F83",
                      fontSize: moderateScale(12, scaleIndice),
                      fontWeight: "bold"
                    }}
                  >
                    {`${product.brand}`}
                  </Text>
                </View>
                <View
                  style={{
                    height: moderateScale(25, scaleIndice),
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <Ionicons
                    name="ios-information-circle"
                    type="ionicon"
                    color="#0C4767"
                    size={moderateScale(20, scaleIndice)}
                    iconStyle={{
                      marginTop: moderateScale(2, scaleIndice)
                    }}
                  />
                  <Text
                    style={{
                      color: "#7A7F83",
                      fontSize: moderateScale(12, scaleIndice),

                      marginLeft: moderateScale(5, scaleIndice),
                      marginBottom: 3
                    }}
                  >
                    {`${this.state.asset.name}`}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: moderateScale(0, scaleIndice),
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}
                >
                  <Text
                    style={{
                      color: "#272727",
                      fontSize: moderateScale(26, scaleIndice),
                      fontWeight: "bold",
                      marginTop: 20
                    }}
                  >
                    {"About this item"}
                  </Text>
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: moderateScale(16, scaleIndice),
                      fontWeight: "500",
                      marginTop: 20
                    }}
                  >
                    {"Description"}
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      marginTop: 10
                    }}
                  >
                    <Text
                      style={{
                        color: "#777",
                        textAlign: "justify",

                        fontSize: moderateScale(13, scaleIndice)
                      }}
                    >
                      {product.desc}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : null}

        <Modal isVisible={this.state.isModalVisible} style={{}}>
          <View
            style={{
              backgroundColor: "#fff",
              paddingBottom: 30,
              borderRadius: 46
            }}
          >
            {this.state.product && this.state.product.name ? (
              <View>
                <TouchableOpacity
                  onPress={() => this.toggleModal()}
                  style={{
                    position: "absolute",
                    top: 30,
                    right: 30,
                    padding: 10,
                    alignSelf: "flex-end"
                  }}
                >
                  <Ionicons
                    name="ios-close"
                    color="#000"
                    style={{
                      fontSize: 40,
                      fontWeight: "100",
                      alignSelf: "center"
                    }}
                  />
                </TouchableOpacity>

                <Image
                  source={imAddBag}
                  style={{
                    height: 120,
                    width: 120,
                    marginTop: 30,
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
                  {`${product.name} From “${product.shop}” has been added to your bag.`}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    borderRadius: 7,
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "#fff",
                    shadowColor: "#000",
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
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <Image
                      source={{
                        uri:
                          product.image && product.image[0]
                            ? product.image[0].url
                            : "http://blank"
                      }}
                      style={{
                        height: 60,
                        width: 60,
                        resizeMode: "cover",
                        marginRight: 10
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          marginTop: 0,
                          color: "#C8C8C8",
                          fontSize: 10
                        }}
                      >
                        {product.shop}
                      </Text>
                      <Text
                        style={{
                          color: "#000",
                          fontWeight: "bold",
                          fontSize: 14
                        }}
                      >
                        {product.name.length <= 20
                          ? product.name
                          : product.name.substring(0, 20) + "..."}
                      </Text>
                      <Text
                        style={{
                          color: "#000",
                          fontWeight: "400",
                          fontSize: 15
                        }}
                      >
                        {`${formatNumber(this.state.count * product.price)}`}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: moderateScale(25, scaleIndice),
                      height: moderateScale(25, scaleIndice),
                      marginRight: moderateScale(10, scaleIndice),
                      backgroundColor: colors.blue,
                      alignSelf: "center",
                      borderRadius: moderateScale(12.5, scaleIndice),
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Ionicons
                      name="ios-checkmark"
                      size={moderateScale(23, scaleIndice)}
                      color={colors.white}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    height: 47,
                    width: 248,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#0C4767",
                    borderRadius: 26.52,
                    marginTop: 20,
                    alignSelf: "center"
                  }}
                  onPress={() => {
                    this.toggleModal();
                    this.props.navigation.goBack();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      paddingHorizontal: 15,
                      color: "#fff"
                    }}
                  >
                    {`Continue Shopping`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 47,
                    width: 248,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: 26.52,
                    marginTop: 10,
                    alignSelf: "center"
                  }}
                  onPress={() => {
                    this.toggleModal();
                    this.props.navigation.navigate("Carts");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      paddingHorizontal: 15,
                      color: "#777"
                    }}
                  >
                    {`Go To Bag`}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { carts } = state.bags;
  const { user } = state.user;
  return { carts, user };
};
export default connect(mapStateToProps, {
  addItem,
  setCarts,
  setUser
})(Details);

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    marginBottom: -20
  },
  main: {
    padding: 0
  },
  tagBlock: {
    width: moderateScale(75, scaleIndice),
    height: moderateScale(17, scaleIndice),
    borderRadius: 20,
    marginRight: moderateScale(3, scaleIndice),
    marginTop: moderateScale(5, scaleIndice),
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center"
  },
  tagText: {
    color: colors.blue,
    fontSize: moderateScale(8, scaleIndice),
    fontWeight: "800",
    letterSpacing: 0.16
  },
  modal3: {
    width: 295,
    height: 200,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: 5, height: 0 },
    shadowRadius: 20,
    borderRadius: 8,
    backgroundColor: "#ffffff"
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0
  }
});

class SliderRadius extends React.Component {
  render() {
    const { data, height, margin } = this.props;

    return (
      <Animated.View
        style={{
          marginTop: 0,
          marginBottom: -margin / 5,
          marginLeft: 0,
          marginRight: 0,
          borderRadius: 0,
          height
        }}
      >
        <Swiper
          style={styles.wrapper}
          borderRadius={0}
          height={height}
          horizontal
          dot={
            <View
              style={{
                width: 7,
                height: 7,
                backgroundColor: colors.grey,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          activeDot={
            <View
              style={{
                width: 29,
                height: 7,
                borderRadius: 4,
                backgroundColor: "#0C4767",
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          paginationStyle={{
            bottom: 60,
            justifyContent: "flex-end",
            right: 20
          }}
          loop={false}
        >
          {data.map(item => (
            <ImageBackground
              key={JSON.stringify(item)}
              source={{ uri: item.url }}
              style={{}}
              resizeMode="cover"
              borderRadius={0}
            >
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,.0)",
                  height,
                  justifyContent: "center",

                  borderRadius: 0
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    marginLeft: 10,
                    color: "#fff",
                    fontWeight: "900",
                    fontSize: 17,
                    height: 20
                  }}
                >
                  {""}
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    marginLeft: 10,
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: "900",
                    marginTop: 5,
                    marginBottom: 0,
                    height: 20
                  }}
                >
                  {""}
                </Text>
              </View>
            </ImageBackground>
          ))}
        </Swiper>
      </Animated.View>
    );
  }
}
