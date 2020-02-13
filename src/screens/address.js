import React from "react";
import {
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
const heightCarousel = screenHeight > 736 ? 342 : 300;

import { updateUser } from "../services/stitch";

import { connect } from "react-redux";
import { addItem, setCarts, selectedAddr } from "../redux/actions/bags";
import { setUser } from "../redux/actions/user";
class Delivery extends React.Component {
  //  Header
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
            paddingHorizontal: 15
          }}
          onPress={() => {
            navigation.navigate("Main");
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
  componentDidMount() {
    this.props.selectedAddr(this.props.user.addressShipping[0]);
    console.log(this.props.user.addressShipping);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={{ flex: 1 }}>
          <Image
            source={address_step}
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
            Step 1
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
            Delivery Address
          </Text>

          {/* -------------------------------------------------------------------------- */
          /*                            If there no address yet                           */
          /* -------------------------------------------------------------------------- */}
          {this.props.user.addressShipping.length == 0 ? (
            <TouchableOpacity
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
                this.props.navigation.navigate("AddAddress", {
                  backTo: "Address"
                });
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
          ) : (
            /* -------------------------------------------------------------------------- */
            /*                            List of the addresses                           */
            /* -------------------------------------------------------------------------- */
            <CarouselItems
              address={this.props.user.addressShipping}
              goTo={this.props}
              addSelectAddress={address => {
                this.props.selectedAddr(address);
              }}
              hasDelete={address => {
                updateUser(
                  "users",
                  { user_id: this.props.user.user_id },
                  { addressShipping: address }
                )
                  .then(() => {
                    this.props.setUser();
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}
            />
          )}

          {/* -------------------------------------------------------------------------- */
          /*                                  Continue                                  */
          /* -------------------------------------------------------------------------- */}

          <View
            style={{
              position: "absolute",
              bottom: 15,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: colors.grey,
                fontSize: 13,
                marginTop: 10,
                marginBottom: 15,
                fontWeight: "500"
              }}
            >
              Or you can
            </Text>
            <TouchableOpacity
              style={{
                height: 47,
                width: 130,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 28,
                borderColor: "#000",
                borderWidth: 2,
                marginBottom: 10
              }}
              onPress={() => {
                this.props.navigation.navigate("Payment");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#000"
                }}
              >
                {"Pick up"}
              </Text>
            </TouchableOpacity>

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
                if(this.props.user.addressShipping.length > 0)
                this.props.navigation.navigate("Payment");
                else
                Alert.alert("Address","Add an address before continue")
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff"
                }}
              >
                {"Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                           Address item component                          */
/* -------------------------------------------------------------------------- */

class CarouselItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: [], selectedItem: "" };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ address: this.props.address });
    }, 500);
  }

  render() {
    const { address } = this.state;
    return (
      <Carousel
        data={address}
        slideStyle={{
          marginHorizontal: 5,
          marginTop: 20,
          height: 320
        }}
        firstItem={0}
        snapToStart={address.length - 1}
        onSnapToItem={index => {
          if (address[index] && address[index].addNew == null) {
            this.props.addSelectAddress(address[index]);
            //container.addSelectAddress(address[index]);
          }
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
                          address.splice(index, 1);
                          this.props.hasDelete(address);
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
                  source={require("../images/background2.png")}
                  borderRadius={20}
                  style={{
                    height: heightCarousel,
                    width: 210,
                    borderColor: "#eee",
                    borderWidth: 1,
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
                        item.address2 +
                        ", " +
                        item.city +
                        ", " +
                        item.country}
                    </Text>
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
                  this.props.goTo.navigation.navigate("AddAddress", {
                    backTo: "Address"
                  });
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
            );
          }
        }}
        sliderWidth={screenWidth}
        sliderHeight={heightCarousel}
        itemHeight={heightCarousel}
        itemWidth={210}
      />
    );
  }
}

const mapStateToProps = state => {
  const { carts, selectedAddress } = state.bags;
  const { user } = state.user;
  return { carts, selectedAddress, user };
};
export default connect(mapStateToProps, {
  addItem,
  setCarts,
  setUser,
  selectedAddr
})(Delivery);
