import React from "react";
import {
  ScrollView,
  Alert,
  Text,
  StatusBar,
  Platform,
  FlatList,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { moderateScale } from "react-native-size-matters";
import { Subscribe } from "unstated";
import { StateContainer } from "../utils/stateContainer";
import { scaleIndice, screenWidth, formatNumber } from "../utils/variables";
import { CartItem } from "../components";

const mystates = new StateContainer();

class Orders extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Bags",
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
            size={moderateScale(30, 0)}
            iconStyle={{}}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        borderBottomColor: "#fff"
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      bags: [
        {
          shop: "Thomson Electronics",
          items: [
            { price: 238.5, name: "TV 32' android" },
            { price: 249.3, name: "TV 32' android" }
          ]
        },
        { shop: "ABC", items: [{ price: 33.5, name: "Usb 64 GB Toshiba" }] },
        {
          shop: "PC Express",
          items: [
            { price: 238.5, name: "TV 32' android" },
            { price: 249.3, name: "TV 32' android" },
            { price: 249.3, name: "TV 32' android" },
            { price: 249.3, name: "TV 32' android" }
          ]
        }
      ]
    };
    console.log(mystates.state);
  }

  // Render any loading content that you like here
  render() {
    const { bags } = this.state;
    return (
      <Subscribe to={[new StateContainer()]}>
        {states => (
          <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

            <View style={{ flex: 1 }}>
              <ScrollView
                style={{ flex: 9, padding: 0 }}
                showsVerticalScrollIndicator={false}
              >
                {0 === 1 ? (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 100,
                      backgroundColor: "#fff",
                      width: screenWidth - 60,
                      marginTop: 90,
                      marginBottom: 30,
                      alignSelf: "center",
                      shadowColor: "#000",
                      shadowOpacity: 0.15,
                      borderRadius: 12,
                      elevation: 1,
                      shadowRadius: 2,
                      shadowOffset: {
                        height: 2,
                        width: 0
                      }
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
                ) : null}

                {/* -------------------------------------------------------------------------- */
                /*                                 Item's list                                */
                /* -------------------------------------------------------------------------- */}

                <Text> {states.state.items.length}</Text>
                {states.state.items.map(i => (
                  <Text>{i}</Text>
                ))}
                <FlatList
                  style={{}}
                  showsVerticalScrollIndicator={false}
                  data={bags}
                  keyExtractor={item => JSON.stringify(item)}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        backgroundColor: "#fff",
                        width: screenWidth - 60,
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
                      {item.items.map((item1, index1) => (
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
                                  onPress: () => {}
                                }
                              ],
                              { cancelable: false }
                            );
                          }}
                        >
                          <CartItem
                            last={
                              index1 != item.items.length - 1 ? false : true
                            }
                            subTitle={item.shop}
                            title={item1.name}
                            image={{
                              uri:
                                "https://media.4rgos.it/i/Argos/8477116_R_Z001A?w=750&h=440&qlt=70"
                            }}
                            price={item1.price}
                            stock={10}
                            count={1}
                            updateCount={() => {}}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                />
              </ScrollView>

              {/* -------------------------------------------------------------------------- */
              /*                                  Promotion                                 */
              /* -------------------------------------------------------------------------- */}

              {/* <View
            style={{
              height: 50,
              backgroundColor: "#EEEEEE",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                color: "#929292",
                opacity: 1,
                fontSize: 16,
                textAlign: "center"
              }}
            >
              {"Promo code"}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  color: "#1D1D1D",
                  opacity: 1,
                  fontSize: 16,
                  paddingHorizontal: 5,
                  marginHorizontal: 5,
                  textAlign: "center"
                }}
              >
                {"summer2019"}
              </TextInput>
              <TouchableOpacity
                style={{
                  backgroundColor: "#999",
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  marginTop: -5,
                  marginLeft: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon
                  name="ios-close"
                  type="ionicon"
                  color="#000"
                  size={30}
                  iconStyle={{}}
                />
              </TouchableOpacity>
            </View>
          </View> */}

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
                    {formatNumber(53)}
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
                    {formatNumber(344)}
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
                    {formatNumber(2323)}
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
          </View>
        )}
      </Subscribe>
    );
  }
}

export default Orders;
