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
      title: "Address",
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
      address: []
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.state.address = [
        {
          fullname: "Parkour Studio",
          address1: "115 Rue Panaméricaine",
          addres2: "Royal Oasis, Suite 9",
          city: "Pétion-Ville",
          country: "HAITI"
        },
        {
          fullname: "Parkour Studio",
          address1: "115 Rue Panaméricaine",
          addres2: "Royal Oasis, Suite 9",
          city: "Pétion-Ville",
          country: "HAITI"
        }
      ];
      this.setState(prevState => ({
        address: prevState.address
      }));
    }, 1000);
  }

  render() {
    const { address } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        {address.length === 0 ? (
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
              You don’t have any address associated with your account.
            </Text>
            <Image
              source={require("../images/nocard.png")}
              style={{
                width: 100,
                height: 100,
                marginTop: 20,
                marginLeft: 20,
                borderColor: "#eee",
                borderWidth: 1,
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
              Here are your address.
            </Text>
            <Carousel
              data={address}
              slideStyle={{
                marginHorizontal: 5,
                marginTop: 20,
                height: 320
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
                      source={require("../images/background2.png")}
                      borderRadius={20}
                      style={{
                        height: heightCarousel,
                        width: 250,
                        borderColor: "#eee",
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        borderRadius: 20,
                        alignSelf: "center"
                      }}
                      borderRadius={20}
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
                        <Icon
                          name={"ios-business"}
                          type="ionicon"
                          color={"#fff"}
                          opacity={1}
                          size={25}
                          iconStyle={{}}
                        />
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: "bold",
                            marginLeft: 3
                          }}
                        >
                          {"Work"}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 130,
                          position: "absolute",
                          bottom: 20,
                          left: 20
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: "bold",
                            alignSelf: "flex-start",
                            marginRight: 10,

                            textAlign: "left",
                            width: 200
                          }}
                        >
                          {item.fullname}
                        </Text>

                        <Text
                          style={{
                            color: "#fff",
                            marginRight: 10,
                            fontSize: 10,
                            textAlign: "left",
                            alignSelf: "flex-start"
                          }}
                        >
                          {item.address1 +
                            ", " +
                            item.addres2 +
                            ", " +
                            item.city +
                            ", " +
                            item.country}
                        </Text>
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
                  this.props.navigation.navigate("AddAddress");
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#fff"
                  }}
                >
                  {"+ Add New Address"}
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
