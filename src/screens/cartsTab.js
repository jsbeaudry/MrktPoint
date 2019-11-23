import React from "react";
import {
  ScrollView,
  Alert,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/Ionicons";
import { moderateScale } from "react-native-size-matters";
import { Subscribe } from "unstated";
import { StateContainer } from "../utils/stateContainer";
import {
  STATUS_BAR_HEIGHT,
  scaleIndice,
  screenWidth,
  formatNumber
} from "../utils/variables";

import { CartItem, addMultipleOrder } from "../components";
import { addOrder } from "../services/stitch";
import { Stitch } from "mongodb-stitch-react-native-sdk";
const mystates = new StateContainer();
class Orders extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
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

  componentDidMount() {
    for (let [key, value] of Object.entries(this.state.bags)) {
      //console.log(`name:'${key}', list: ${JSON.stringify(value)}`);
      this.state.shops.push({ name: `${key}`, list: value });
    }
    console.log(this.state.shops);
    this.setState({ shops: this.state.shops });
  }

  getList = list => {
    let arr = [];
    for (let [key, value] of Object.entries(
      _.groupBy(list, item => item.shop)
    )) {
      //console.log(`name:'${key}', list: ${JSON.stringify(value)}`);
      arr.push({ name: `${key}`, list: value });
    }

    return arr;
  };
  // Render any loading content that you like here
  render() {
    const { bags, shops } = this.state;
    return (
      <Subscribe to={[StateContainer]}>
        {container =>
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
                {this.getList(container.getItems()).length === 0
                  ? <View
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
                  : <FlatList
                      style={{}}
                      showsVerticalScrollIndicator={false}
                      data={this.getList(container.getItems())}
                      keyExtractor={item => JSON.stringify(item)}
                      renderItem={({ item, index }) =>
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
                          {item.list.map((item1, index1) =>
                            <TouchableOpacity
                              key={JSON.stringify(item1 + index1)}
                              onLongPress={() => {
                                Alert.alert(
                                  "Delete shipping address",
                                  "Do you really want remove this address?",
                                  [
                                    {
                                      text: "Cancel",
                                      onPress: () =>
                                        console.log("Cancel Pressed"),
                                      style: "cancel"
                                    },
                                    {
                                      text: "Remove",
                                      onPress: () => {}
                                    }
                                  ],
                                  { cancelable: false }
                                );
                              }}
                            >
                              <CartItem
                                last={
                                  true
                                  //index1 != item.items.length - 1 ? false : true
                                }
                                id={index}
                                subTitle={item.name}
                                title={
                                  item1.name.length <= 17
                                    ? item1.name
                                    : item1.name.substring(0, 17) + "..."
                                }
                                image={{
                                  uri:
                                    "http://archive.warwicka.co.uk/file_store/archive_images/Shop_Logo_1_July120151.jpg"
                                }}
                                price={item1.price}
                                stock={10}
                                count={item1.count}
                                updateCount={count => {}}
                              />
                            </TouchableOpacity>
                          )}
                        </View>}
                    />}
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
                    {formatNumber(container.getItemsTotal())}
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
                    {formatNumber(container.getItemsTotal())}
                  </Text>
                </View>
              </View>
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
            </View>
          </View>}
      </Subscribe>
    );
  }
}

export default Orders;
