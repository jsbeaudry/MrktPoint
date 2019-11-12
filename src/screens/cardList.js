import React from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Alert,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  View
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { screenWidth, screenHeight } from "../utils/variables";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";

const address_step = require("../images/address_step.png");
const heightCarousel = screenHeight > 736 ? 440 : 400;
class Delivery extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Cards",
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
      cards: []
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.state.cards = [
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
      ];
      this.setState(prevState => ({
        cards: prevState.cards
      }));
    }, 1000);
  }
  render() {
    const { cards } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        {cards.length === 0 ? (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.black,
                width: 170,
                fontSize: 22,
                marginLeft: 20,
                marginTop: 10,
                fontWeight: "bold"
              }}
            >
              You don’t have any card associated with your account.
            </Text>
            <Image
              source={require("../images/nocard.png")}
              style={{
                width: 100,
                height: 100,
                marginTop: 20,
                marginLeft: 20,
                borderColor: "#eee",
                borderWidth: 0,
                alignSelf: "flex-start",
                resizeMode: "contain"
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 20,
                height: 53,
                width: 305,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "#0C4767",
                borderRadius: 26.52,

                marginVertical: 10
              }}
              onPress={() => {
                this.props.navigation.navigate("AddAddress");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff"
                }}
              >
                {"+ Add Credit Card"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.black,
                fontSize: 28,
                width: 180,
                marginLeft: 20,
                marginTop: 50,
                fontWeight: "bold"
              }}
            >
              Here are your cards.
            </Text>
            <Carousel
              data={cards}
              slideStyle={{
                marginHorizontal: 5,
                marginTop: 20,
                height: heightCarousel
              }}
              renderItem={({ item, index }) => {
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
                              this.state.address.splice(index, 1);
                              this.setState(
                                {
                                  address: this.state.address
                                },
                                () => {
                                  AsyncStorage.setItem(
                                    "address",
                                    JSON.stringify(address)
                                  )
                                    .then(() => {})
                                    .catch(e => alert(e));
                                }
                              );
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
                      width: 250,
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
                        width: 250,
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
              }}
              sliderWidth={screenWidth}
              sliderHeight={heightCarousel}
              itemHeight={heightCarousel}
              itemWidth={250}
            />
            <View
              style={{
                position: "absolute",
                bottom: 15,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  height: 53,
                  width: 305,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#0C4767",
                  borderRadius: 26.52,

                  marginVertical: 10
                }}
                onPress={() => {
                  this.props.navigation.navigate("AddCard");
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#fff"
                  }}
                >
                  {"+ Add New Card"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Delivery;
