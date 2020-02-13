import React from "react";
import {
  Platform,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  View
} from "react-native";
import { screenWidth, formatNumber, orderStatus } from "../utils/variables";
import { getOne } from "../services";
import Icon from "react-native-vector-icons/Ionicons";
import { addManyData, update } from "../services/stitch";
import { Stitch, BSON } from "mongodb-stitch-react-native-sdk";
import { colors } from "../utils/colors";
const payment_step = require("../images/payment_step.png");
const ObjectId = BSON.ObjectId;

import { connect } from "react-redux";
import { addItem, setCarts, selectedAddr } from "../redux/actions/bags";
import { setUser } from "../redux/actions/user";

class Payment extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Payment",
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
      bags: [],
      user: {},
      isSwipp: false,
      accept_COD: false
    };
  }
  componentWillMount() {}

  componentDidMount() {
    getOne("users", { user_id: Stitch.defaultAppClient.auth.user.id })
      .then(results => {
        this.setState({
          user: results[0]
        });
      })
      .catch(error => {
        console.log(error);
      });
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
    const orderId_ = new Date().getTime();
    return (
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
        {load == false ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                color: colors.gray,
                fontSize: 14,
                width: 300,
                textAlign: "center",
                marginTop: 100,
                marginBottom: 20,
                fontWeight: "500"
              }}
            >
              No payment option avalaible at this moment, please make sure that
              you accept to pay with cash on delivery by clicing on the button
              below.
            </Text>
          </View>
        )}

        <View
          style={{
            position: "absolute",
            bottom: 120,
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
            Yes, i accept to pay with:
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
              this.setState({ accept_COD: !this.state.accept_COD });
              // this.props.navigation.navigate("Payment");
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.blue,
                fontWeight: "bold",
                fontStyle: "italic"
              }}
            >
              {"CASH ON DELIVERY"}
            </Text>
            <Icon
              name={
                this.state.accept_COD == true
                  ? "ios-checkmark-circle"
                  : "ios-checkmark-circle-outline"
              }
              type="ionicon"
              color={this.state.accept_COD == true ? "green" : "black"}
              style={{ margin: 10 }}
              size={39}
            />
          </TouchableOpacity>
        </View>
        {this.state.accept_COD ? (
          <TouchableOpacity
            style={{
              height: 50,
              marginTop: 50,
              width: screenWidth - 100,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#0C4767",
              borderRadius: 26.52,
              position: "absolute",
              bottom: 25
            }}
            onPress={() => {
              if (this.props.carts.length > 0) {
     
                let orders = this.props.carts.map(i => {
                  return {
                    orderId: orderId_,
                    productId: new ObjectId(i._id),
                    custumerId: new ObjectId(this.props.user.user_id),
                    assetId: new ObjectId(i.asset.id),
                    assetCurrency: i.assetCurrency,
                    assetRate: i.assetRate.value,
                    price: i.price,
                    productCurrency: i.currency,
                    quantity: i.count,
                    shippingAddress: this.props.selectedAddress,
                    history: [{ step: "pending", date: new Date() }],
                    status: {
                      value: orderStatus.AWAITING_REVIEW,
                      time: new Date()
                    },
                    createAt: new Date()
                  };
                });

                addManyData("orders", orders)
                  .then(() => {
                    update(
                      "bags",
                      { custumerId: this.props.user.user_id },
                      { products: [] }
                    )
                      .then(() => {
                        this.props.setCarts();
                        this.props.navigation.navigate("OrderConfirm");
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              } else {
                console.log("No id user");
                alert("Verify your internet connection");
              }
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontWeight: "bold"
              }}
            >
              {"Pay " +
                formatNumber(
                  this.props.carts.reduce((a, b) => a + b.price * b.count, 0)
                )}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
})(Payment);
