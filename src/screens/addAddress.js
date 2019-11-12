import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";
import { screenWidth, screenHeight } from "../utils/variables";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";

class Delivery extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add New Address",
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
      fullname: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "Haiti",
      zipcode: "",
      phone: "",
      email: ""
    };
  }
  componentWillMount() {}

  render() {
    const { fullname, address1, address2, city, country, phone } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <Text
          style={{
            color: colors.black,
            fontSize: 28,
            marginLeft: 20,
            marginTop: 50,
            fontWeight: "bold"
          }}
        >
          Delivery Address
        </Text>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginVertical: 7 }}>
            <Text
              style={{
                color: "#D8D8D8",
                fontSize: 16
              }}
            >
              {"Full name"}
            </Text>
            <TextInput
              autoCorrect={false}
              returnKeyType={"go"}
              placeholder={""}
              value={fullname}
              onChangeText={text => {
                this.setState({
                  fullname: text
                });
              }}
              autoFocus
              style={{
                fontSize: 16,
                paddingVertical: 7,
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8"
              }}
            />
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 7 }}>
            <Text
              style={{
                color: "#D8D8D8",
                fontSize: 16
              }}
            >
              {"Address Line 1"}
            </Text>
            <TextInput
              autoCorrect={false}
              returnKeyType={"go"}
              placeholder={""}
              value={address1}
              onChangeText={text => {
                this.setState({
                  address1: text
                });
              }}
              style={{
                fontSize: 16,
                paddingVertical: 7,
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8"
              }}
            />
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 7 }}>
            <Text
              style={{
                color: "#D8D8D8",
                fontSize: 16
              }}
            >
              {"Address Line 2"}
            </Text>
            <TextInput
              autoCorrect={false}
              returnKeyType={"go"}
              placeholder={""}
              value={address2}
              onChangeText={text => {
                this.setState({
                  address2: text
                });
              }}
              style={{
                fontSize: 16,
                paddingVertical: 7,
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8"
              }}
            />
          </View>

          <View style={{ marginHorizontal: 20, marginVertical: 7 }}>
            <Text
              style={{
                color: "#D8D8D8",
                fontSize: 16
              }}
            >
              {"Mobile Number"}
            </Text>
            <TextInput
              autoCorrect={false}
              returnKeyType={"go"}
              placeholder={""}
              value={phone}
              onChangeText={text => {
                this.setState({
                  phone: text
                });
              }}
              style={{
                fontSize: 16,
                paddingVertical: 7,
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8"
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                marginVertical: 7,
                width: screenWidth / 2 - 30
              }}
            >
              <Text
                style={{
                  color: "#D8D8D8",
                  fontSize: 16
                }}
              >
                {"City"}
              </Text>
              {/*<Feather
                    name={"chevron-down"}
                    type={"Feather"}
                    style={{
                      flex: 11,
                      alignSelf: "center",
                      position: "absolute",
                      right: 0,
                      top: 15
                    }}
                    size={25}
                    color={"#aaa"}
                  />*/}
              <TextInput
                autoCorrect={false}
                returnKeyType={"go"}
                placeholder={""}
                value={city}
                onChangeText={text => {
                  this.setState({
                    city: text
                  });
                }}
                style={{
                  fontSize: 16,
                  paddingVertical: 7,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D8D8D8"
                }}
              />
            </View>
            <View
              style={{
                marginVertical: 7,
                width: screenWidth / 2 - 30
              }}
            >
              <Text
                style={{
                  color: "#D8D8D8",
                  fontSize: 16
                }}
              >
                {"Country"}
              </Text>
              {/*<Feather
                    name={"chevron-down"}
                    type={"Feather"}
                    style={{
                      flex: 11,
                      alignSelf: "center",
                      position: "absolute",
                      right: 0,
                      top: 15
                    }}
                    size={25}
                    color={"#aaa"}
                  />*/}
              <TextInput
                autoCorrect={false}
                returnKeyType={"go"}
                placeholder={""}
                value={country}
                style={{
                  fontSize: 16,
                  paddingVertical: 7,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D8D8D8"
                }}
              />
            </View>
          </View>
        </View>

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
              //this.props.navigation.navigate("Payment");

              if (
                fullname != "" &&
                address1 != "" &&
                phone != "" &&
                city != "" &&
                country != ""
              ) {
                this.setState(
                  {
                    address: address.push({
                      fullname,
                      address1,
                      address2,
                      phone,
                      city,
                      country
                    }),
                    loading: false
                  },
                  () => {
                    // AsyncStorage.setItem("address", JSON.stringify(address))
                    //   .then(() => {
                    //     //this.props.navigation.navigate("Payment");
                    //     this.setState({
                    //       address: address,
                    //       loading: false,
                    //       addNew: false
                    //     });
                    //   })
                    //   .catch(e => alert(e));
                  }
                );
              } else {
                alert("One or more field is/are empty");
              }
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
    );
  }
}

export default Delivery;
