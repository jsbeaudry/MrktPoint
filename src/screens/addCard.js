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
import { screenHeight } from "../utils/variables";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";

class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Card Details",
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
      card_fullname: "",
      card_number: "",
      card_expiry: "",
      card_cvc: ""
    };
  }
  componentWillMount() {}

  render() {
    const { card_fullname, card_number, card_expiry, card_cvc } = this.state;
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
          Card Details.
        </Text>
        <Text
          style={{
            color: colors.black,
            fontSize: 13,
            marginLeft: 20,
            marginTop: 10,
            marginBottom: 20,
            fontWeight: "bold"
          }}
        >
          Verify and complete your card information.
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
              returnKeyType={"done"}
              placeholder={""}
              value={card_fullname}
              onChangeText={text => {
                this.setState({
                  card_fullname: text
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
              {"Card Number"}
            </Text>
            <TextInput
              autoCorrect={false}
              returnKeyType={"done"}
              placeholder={""}
              maxLength={16}
              returnKeyType={"done"}
              value={card_number}
              onChangeText={text => {
                this.setState({
                  card_number: text
                });
              }}
              keyboardType={"number-pad"}
              value={card_number}
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
              marginHorizontal: 20
            }}
          >
            <Text
              style={{
                color: "#D8D8D8",
                fontSize: 16
              }}
            >
              {"Expiry Date"}
            </Text>

            <TextInput
              autoCorrect={false}
              returnKeyType={"done"}
              placeholder={""}
              maxLength={5}
              value={card_expiry}
              onChangeText={text => {
                this.setState({
                  card_expiry: text
                });
              }}
              value={card_expiry}
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
              marginHorizontal: 20
            }}
          >
            <Text
              style={{
                color: "#D8D8D8",
                fontSize: 16
              }}
            >
              {"CVC"}
            </Text>

            <TextInput
              autoCorrect={false}
              returnKeyType={"done"}
              placeholder={""}
              maxLength={3}
              value={card_cvc}
              onChangeText={text => {
                this.setState({
                  card_cvc: text
                });
              }}
              keyboardType={"number-pad"}
              value={card_cvc}
              style={{
                fontSize: 16,
                paddingVertical: 7,
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8"
              }}
            />
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

export default AddCard;
