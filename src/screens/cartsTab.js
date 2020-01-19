import React from "react";
import {
  ScrollView,
  Alert,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  View
} from "react-native";
import _ from "lodash";
import { moderateScale } from "react-native-size-matters";
import {
  STATUS_BAR_HEIGHT,
  scaleIndice,
  screenWidth,
  formatNumber
} from "../utils/variables";

import { CartItem } from "../components";
import { connect } from "react-redux";
import { addItem, setCarts, editCarts } from "../redux/actions/bags";
import { update } from "../services/stitch";

class CardTab extends React.Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      bags: [],
      shops: []
    };
  }

  componentWillMount() {
    this.props.setCarts();
  }

  /* -------------------------------------------------------------------------- */
  /*                             Group item by store                            */
  /* -------------------------------------------------------------------------- */

  getList = list => {
    let arr = [];
    for (let [key, value] of Object.entries(
      _.groupBy(list, item => item.shop)
    )) {
      arr.push({ name: `${key}`, list: value });
    }
    return arr;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

        {/* -------------------------------------------------------------------------- */
        /*                                   header                                   */
        /* -------------------------------------------------------------------------- */}
        <View
          style={{
            height: 70,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: "#000",
              alignSelf: "center",
              paddingTop: STATUS_BAR_HEIGHT,
              opacity: 1,
              fontSize: moderateScale(16, scaleIndice),
              fontWeight: "600"
            }}
          >
            {"Bags"}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 9, padding: 0 }}
            showsVerticalScrollIndicator={false}
          >
            {this.props.carts.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 100,
                  backgroundColor: "#fff",
                  width: screenWidth - 60,
                  marginTop: 90,
                  marginBottom: 30,
                  alignSelf: "center"
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    opacity: 1,
                    fontSize: moderateScale(16, scaleIndice),
                    fontWeight: "600"
                  }}
                >
                  {"No item in your cart"}
                </Text>
              </View>
            ) : (
              <FlatList
                style={{}}
                showsVerticalScrollIndicator={false}
                data={this.getList(this.props.carts)}
                keyExtractor={item => JSON.stringify(item)}
                renderItem={({ item }) => (
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: screenWidth - 30,
                      marginTop: 10,
                      paddingTop: 10,
                      marginBottom: 20,
                      alignSelf: "center",
                      shadowColor: "#000",
                      shadowOpacity: 0.15,
                      borderRadius: 12,
                      elevation: 1,
                      shadowRadius: 4,
                      shadowOffset: {
                        height: 2,
                        width: 0
                      }
                    }}
                  >
                    {item.list.map((item1, index1) => {
                      let indice = _.findIndex(this.props.carts, function(o) {
                        console.log(o._id);
                        return o._id == item1._id;
                      });
                      let total =
                        item1.count *
                        item1.price *
                        (item1.currency.toUpperCase() ==
                        item1.assetCurrency.toUpperCase()
                          ? 1
                          : item1.assetRate.value);

                      console.log(item1);

                      return (
                        <TouchableOpacity
                          key={JSON.stringify(item1 + index1)}
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
                                    this.props.carts.splice(indice, 1);
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
                                  }
                                }
                              ],
                              { cancelable: false }
                            );
                          }}
                        >
                          <CartItem
                            last={true}
                            id={indice}
                            subTitle={item1.assetName}
                            title={
                              item1.name.length <= 17
                                ? item1.name
                                : item1.name.substring(0, 17) + "..."
                            }
                            image={
                              item1.pictures && item1.pictures[0]
                                ? {
                                    uri: item1.pictures[0].url
                                  }
                                : require("../images/logo_mrkt.jpg")
                            }
                            price={formatNumber(
                              total,
                              item1.assetCurrency.toUpperCase()
                            )}
                            stock={10}
                            count={item1.count}
                            updateCount={(count, id) => {
                              this.props.carts[id].count = count;

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
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            )}
          </ScrollView>

          {/* -------------------------------------------------------------------------- */
          /*                                Total charge                                */
          /* -------------------------------------------------------------------------- */}

          <View
            style={{
              backgroundColor: "#fff",
              height: 1
            }}
          />

          <Totale
            array={this.props.carts}
            marginBottom={this.props.carts.length == 0 ? 50 : 0}
          />
          {this.props.carts.length > 0 ? (
            <TouchableOpacity
              style={{
                height: 53,
                width: 305,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0C4767",
                borderRadius: 26.52,
                alignSelf: "center",
                marginVertical: 20
              }}
              onPress={() => {
                this.props.navigation.navigate("Address");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff"
                }}
              >
                {"Checkout"}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                        Component Total charge to pay                       */
/* -------------------------------------------------------------------------- */

export class Totale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { array } = this.props;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "space-between",
            backgroundColor: "#fff",
            marginTop: 0,
            height: 30,
            paddingHorizontal: 15
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <Text
              style={{
                color: "#929292",
                fontSize: 15,
                fontWeight: "500",
                letterSpacing: -0.41,
                lineHeight: 22,
                textAlign: "left",
                alignSelf: "flex-start"
              }}
            >
              {"Amount"}
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
              {formatNumber(
                array.reduce(
                  (a, b) =>
                    a +
                    b.price *
                      b.count *
                      (b.currency.toUpperCase() == b.assetCurrency.toUpperCase()
                        ? 1
                        : b.assetRate.value),
                  0
                )
              ) + "HTG"}
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

            paddingHorizontal: 15
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <Text
              style={{
                color: "#929292",
                fontSize: 15,
                fontWeight: "500",
                letterSpacing: -0.41,
                lineHeight: 22,
                textAlign: "left",
                alignSelf: "flex-start"
              }}
            >
              {"Delivery Charges"}
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
            height: 40,

            paddingHorizontal: 15,
            marginBottom: this.props.marginBottom
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <Text
              style={{
                color: "#929292",
                fontSize: 15,
                fontWeight: "bold",
                letterSpacing: -0.41,
                lineHeight: 22,
                textAlign: "left",
                alignSelf: "flex-start"
              }}
            >
              {"Total amount"}
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
              {formatNumber(
                array.reduce(
                  (a, b) =>
                    a +
                    b.price *
                      b.count *
                      (b.currency.toUpperCase() == b.assetCurrency.toUpperCase()
                        ? 1
                        : b.assetRate.value),
                  0
                )
              ) + "HTG"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                              Redux properties                              */
/* -------------------------------------------------------------------------- */

const mapStateToProps = state => {
  const { carts } = state.bags;
  const { user } = state.user;
  return { carts, user };
};
export default connect(mapStateToProps, {
  addItem,
  setCarts,
  editCarts
})(CardTab);
