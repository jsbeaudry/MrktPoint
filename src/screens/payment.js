import React from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  Alert,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  View
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { screenWidth, screenHeight, scaleIndice } from "../utils/variables";
import Icon from "react-native-vector-icons/Ionicons";
import { Subscribe } from "unstated";
import { StateContainer } from "../utils/stateContainer";
import { addOrder } from "../services/stitch";
import { Stitch } from "mongodb-stitch-react-native-sdk";
import { colors } from "../utils/colors";
import { bold } from "ansi-colors";
import { CartItem, addMultipleOrder } from "../components";
const payment_step = require("../images/payment_step.png");
const heightCarousel = screenHeight > 736 ? 342 : 300;
class Payment extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Checkout",
      gesturesEnabled: false,
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
            navigation.goBack();
          }}
        >
          <Icon
            name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
            type="ionicon"
            color="#000"
            size={30}
            iconStyle={{}}
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
      swipp: 0,
      isSwipp: false,
      cards: [
        {
          card_fullname: "John Bob",
          card_number: "**** **** **** **** 7676",
          card_expiry: "09/20",
          type: "visa"
        },
        {
          card_fullname: "John Bob",
          card_number: "**** **** **** **** 4321",
          card_expiry: "09/20",
          type: "mastercard"
        }
      ]
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.state.cards.push({
        addNew: true,
        swipp: 0,
        load: true
      });
    }, 1000);
  }
  componentDidUpdate(prevState, prevProps) {
    //if (this.state.swipp < -3) this.props.navigation.navigate("Orders");
  }
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    //this._start(contentOffset.y / 300);
    if (this.state.isSwipp == false)
      this.setState({
        swipp: contentOffset.x,
        isSwipp: true
      });
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };
  render() {
    const { load } = this.state;
    return (
      <Subscribe to={[StateContainer]}>
        {container =>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            <Image
              source={payment_step}
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
              Step 2
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
              Payment
            </Text>
            {load == false ? <ActivityIndicator /> : <View />}
            {container.getCards().length == 0
              ? <TouchableOpacity
                  style={{
                    height: heightCarousel,
                    width: 210,
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",

                    backgroundColor: "transparent",
                    borderRadius: 20,
                    alignSelf: "center",

                    borderWidth: 3,
                    borderColor: "#D8D8D8"
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("AddCard");
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 20,
                      position: "absolute",
                      top: 10,
                      left: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <Icon
                      name={"ios-add"}
                      type="ionicon"
                      color={"#D8D8D8"}
                      opacity={1}
                      size={35}
                      iconStyle={{}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#979797",
                      fontSize: 18,
                      fontWeight: "bold"
                    }}
                  >
                    {"Add Address"}
                  </Text>
                </TouchableOpacity>
              : <CarouselItems
                  cards={container.getCards()}
                  goto={this.props}
                />}

            <View
              style={{
                position: "absolute",
                bottom: 25,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: colors.grey,
                  fontSize: 13,
                  marginTop: 0,
                  marginBottom: 20,
                  fontWeight: "500"
                }}
              >
                Or purchase with
              </Text>
              <TouchableOpacity
                style={{
                  height: 60,
                  paddingHorizontal: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 28,
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowOpacity: 0.2,
                  elevation: 1,
                  shadowRadius: 2,
                  shadowOffset: {
                    height: 2,
                    width: 0
                  },
                  marginBottom: 10
                }}
                onPress={() => {
                  this.props.navigation.navigate("Payment");
                }}
              >
                <Image
                  source={require("../images/logo2.png")}
                  style={{
                    height: 28,
                    width: 28,
                    resizeMode: "contain",
                    marginRight: 10
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.blue,
                    fontWeight: "bold",
                    fontStyle: "italic"
                  }}
                >
                  {"KASH"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginLeft: this.state.swipp < -3 ? screenWidth / 2 : 0,
                  height: 50,
                  width: (screenWidth - 100) / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#0C4767",
                  borderRadius: 26.52
                }}
                onPress={() => {
                  if (container.getItems().length > 0) {
                    //alert(container.getItems().length);
                    addOrder("orders", {
                      productId: container.getItems()[0].productId,
                      custumerId: Stitch.defaultAppClient.auth.user.id,
                      assetId: container.getItems()[0].assetId
                    })
                      .then(resp => {
                        this.props.navigation.navigate("Orders");
                      })
                      .catch(error => {});
                  } else {
                    alert("no");
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    fontWeight: "bold"
                  }}
                >
                  {"Pay $269"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>}
      </Subscribe>
    );
  }
}

export default Payment;

class CarouselItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ cards: this.props.cards });
    }, 100);
  }

  render() {
    const { cards } = this.state;
    return (
      <Subscribe to={[StateContainer]}>
        {container =>
          <Carousel
            data={cards}
            slideStyle={{
              marginHorizontal: 5,
              marginTop: 20,
              height: 320
            }}
            firstItem={0}
            snapToStart={cards.length - 1}
            onSnapToItem={index => {
              if (cards[index] && cards[index].addNew == null)
                container.addSelectCard(cards[index]);
            }}
            renderItem={({ item, index }) => {
              if (!item.addNew) {
                return (
                  <TouchableOpacity
                    onLongPress={() => {
                      Alert.alert(
                        "Delete shipping address",
                        "Do you really want remove this address?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          {
                            text: "Remove",
                            onPress: () => {
                              this.state.cards.splice(index, 1);
                              this.setState({
                                cards: this.state.cards
                              });
                            }
                          }
                        ],
                        { cancelable: false }
                      );
                    }}
                    onPress={() => {
                      this.setState({
                        selected: index,
                        selectedItem: item
                      });
                    }}
                    style={{
                      borderWidth: 3,
                      borderColor: "transparent",
                      borderRadius: 20,
                      height: heightCarousel,
                      width: 210,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <ImageBackground
                      source={
                        item.type == "visa"
                          ? require(`../images/background2.png`)
                          : require(`../images/background3.png`)
                      }
                      borderRadius={20}
                      style={{
                        marginHorizontal: 20,
                        height: heightCarousel,
                        width: 210,
                        justifyContent: "center",
                        alignItems: "center",

                        backgroundColor: "transparent",
                        borderRadius: 20,
                        alignSelf: "center"
                      }}
                      onPress={() => {
                        this.props.navigation.navigate("Address");
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Image
                          source={
                            item.type == "visa"
                              ? require(`../images/visa_logo.png`)
                              : require(`../images/mastercard_logo.png`)
                          }
                          style={{
                            width: 60,
                            resizeMode: "contain",
                            borderColor: "#eee",
                            borderWidth: 0
                          }}
                        />
                      </View>
                      <View
                        style={{
                          position: "absolute",
                          bottom: 20,
                          alignSelf: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: "bold",
                            marginBottom: 10
                          }}
                        >
                          {item.card_number}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 14
                            }}
                          >
                            {item.card_fullname}
                          </Text>
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 14
                            }}
                          >
                            {item.card_expiry}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    style={{
                      height: heightCarousel,
                      width: 210,
                      justifyContent: "center",
                      alignItems: "center",

                      backgroundColor: "transparent",
                      borderRadius: 20,
                      alignSelf: "center",

                      borderWidth: 3,
                      borderColor: "#D8D8D8"
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("AddCard");
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 20,
                        position: "absolute",
                        top: 10,
                        left: 10,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      onPress={() => this.props.navigation.goBack()}
                    >
                      <Icon
                        name={"ios-add"}
                        type="ionicon"
                        color={"#D8D8D8"}
                        opacity={1}
                        size={35}
                        iconStyle={{}}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#979797",
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      {"AddCard"}
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
            sliderWidth={screenWidth}
            sliderHeight={heightCarousel}
            itemHeight={heightCarousel}
            itemWidth={210}
          />}
      </Subscribe>
    );
  }
}
