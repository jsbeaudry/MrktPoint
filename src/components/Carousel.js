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
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { screenWidth, screenHeight } from "../utils/variables";
const heightCarousel = screenHeight > 736 ? 440 : 400;
class CarouselItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: [] };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ address: this.props.address });
    }, 1000);
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
    );
  }
}

export default CarouselItems;
