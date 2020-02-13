import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  View,
  FlatList
} from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/Ionicons";
import { scale, moderateScale, verticalScale } from "react-native-size-matters";
import {
  screenWidth,
  scaleIndice,
  formatNumber,
  orderStatus
} from "../utils/variables";
import { colors } from "../utils/colors";
import { getOrdersByCustumer } from "../services";
import Carousel from "react-native-snap-carousel";
import { BSON } from "mongodb-stitch-react-native-sdk";
const ObjectId = BSON.ObjectId;
import { connect } from "react-redux";
class Orders extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Orders",
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
            navigation.navigate("Main");
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
      orders: [],
      itemLen: 4,
      selected: 0,
      steps: ["Pending"]
    };
  }
  componentWillMount() {}
  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({
        steps: ["Pending", "On the way", "Delivered", "All"]
      }));
    }, 400);
    getOrdersByCustumer(new ObjectId(this.props.user.user_id))
      .then(results => {
        this.setState(
          {
            orders: results
          },
          () => {
            // console.log(this.state.orders);
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
  getList = list => {
    let arr = [];
    for (let [key, value] of Object.entries(
      _.groupBy(list, item => item.asset[0].legalName)
    )) {
      //console.log(`name:'${key}', list: ${JSON.stringify(value)}`);
      arr.push({ name: `${key}`, list: value });
    }

    return arr;
  };

  render() {
    const { selected, steps, orders } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="blue" barStyle={"dark-content"} />
        <View style={{ flex: 1 }}>
          {/* -------------------------------------------------------------------------- */
          /*                               Swipe category                               */
          /* -------------------------------------------------------------------------- */}

          <View style={{ height: 40, marginTop: 10 }}>
            <Carousel
              onSnapToItem={index => {
                if (steps && steps[0]) {
                  this.setState({
                    selected: index,
                    itemLen: steps[index].length
                  });
                }
              }}
              layout={"default"}
              ref={c => {
                this._carousel = c;
              }}
              data={steps}
              style={{ paddingVertical: 20 }}
              renderItem={({ item, index }) => {
                //this.setState({ itemLen: item.length });
                return (
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(15, scaleIndice),
                        color: selected != index ? "#8E8E93" : colors.blue,
                        fontWeight: selected === index ? "600" : "100"
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              sliderWidth={screenWidth}
              sliderHeight={30}
              itemWidth={100}
              itemHeight={30}
            />
            <View
              style={{
                alignSelf: "center",
                marginVertical: 5,
                marginBottom: 8,

                height: moderateScale(8, scaleIndice),
                width: moderateScale(8, scaleIndice),
                borderRadius: moderateScale(4, scaleIndice),
                backgroundColor: "#0C4767"
              }}
            />
          </View>
          {orders.length > 0 ? (
            <ScrollView style={{ flex: 9, padding: 10 }}>
              <FlatList
                style={{}}
                showsVerticalScrollIndicator={false}
                data={this.getList(
                  this.state.orders.filter(
                    i =>
                      JSON.stringify(i.history[i.history.length - 1])
                        .toLowerCase()
                        .indexOf(steps[selected].toLowerCase()) != -1 ||
                      steps[selected] == "All"
                  )
                )}
                keyExtractor={item => JSON.stringify(item)}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={JSON.stringify(item + index)}
                    style={{
                      backgroundColor: "#fff",
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      elevation: 1,
                      shadowRadius: 3,
                      shadowOffset: {
                        height: 0,
                        width: 0
                      },
                      margin: 20,
                      borderRadius: 12,
                      paddingVertical: 20
                      // width: screenWidth - 60,
                      // marginTop: 0,
                      // marginBottom: 30,
                      // alignSelf: "center",
                      // shadowColor: "#000",
                      // shadowOpacity: 0.15,
                      // borderRadius: 12,
                      // elevation: 1,
                      // shadowRadius: 4,
                      // shadowOffset: {
                      //   height: 0,
                      //   width: 0
                      // }
                    }}
                  >
                    {/* <View
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                          marginVertical: 10,
                          padding: 15,
                          borderBottomColor: "#f9f9f9",
                          borderBottomWidth: 1
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.grey
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: colors.blue,
                            paddingHorizontal: 7,
                            paddingVertical: 4,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Text style={{ fontSize: 10, color: colors.white }}>
                            {steps[selected]}
                          </Text>
                        </View>
                      </View> */}
                    {item.list.map((item1, index1) => (
                      <TouchableOpacity
                        key={JSON.stringify(item1 + index1)}
                        onPress={() =>
                          this.props.navigation.navigate("OrderDetails", {
                            products: item.list,
                            asset: item
                          })
                        }
                      >
                        <OrderItem
                          key={item1 + index1}
                          title={
                            item1.product[0].name.length <= 22
                              ? item1.product[0].name
                              : item1.product[0].name.substring(0, 22) + "..."
                          }
                          subTitle={item.name}
                          image={
                            item1.product[0] &&
                            item1.product[0].pictures &&
                            item1.product[0].pictures[0]
                              ? {
                                  uri: item1.product[0].pictures[0].url
                                }
                              : require("../images/logo_mrkt.jpg")
                          }
                          price={item1.price*item1.assetRate}
                          status={"pending"}
                          orderId={item1.orderId}
                        />
                      </TouchableOpacity>
                    ))}
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          ) : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.user;
  return { user };
};
export default connect(mapStateToProps, {})(Orders);

export class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count,
      image: this.props.image
    };
  }

  render() {
    return (
      <View
        style={{
          margin: scale(10),
          flexDirection: "row",
          borderBottomWidth: 0,
          borderBottomColor: "#eee",
          paddingBottom: 10,
          height: verticalScale(54),
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={this.props.image}
            borderRadius={10}
            style={{
              width: verticalScale(60),
              height: verticalScale(60),
              alignSelf: "center"
            }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 10
            }}
          >
            <Text
              style={{
                height: 16,
                color: "#000",
                fontSize: scale(10),
                fontWeight: "400",
                letterSpacing: -0.29,

                lineHeight: verticalScale(16)
              }}
            >
              {"Order Id: " + this.props.orderId}
            </Text>
            <Text
              style={{
                height: 16,
                color: "#929292",
                fontSize: scale(10),
                fontWeight: "400",
                letterSpacing: -0.29,

                lineHeight: verticalScale(16)
              }}
            >
              {this.props.subTitle}
            </Text>
            <Text
              style={{
                color: "#000",
                marginTop: 5,
                fontSize: scale(13),
                fontWeight: "500",
                letterSpacing: -0.36
              }}
            >
              {this.props.title}
            </Text>

            <Text
              style={{
                height: verticalScale(22),
                color: "#000",
                fontSize: scale(12),
                letterSpacing: -0.29,
                lineHeight: verticalScale(22)
              }}
            >
              {formatNumber(this.props.price)+" HTG"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
