import React from "react";
import {
  StyleSheet,
  Animated,
  Platform,
  ScrollView,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
  View
} from "react-native";
import { Icon } from "../utils/icons";
import { Ionicons } from "react-native-vector-icons";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../utils/colors";
import { Product, Business } from "../utils/class";
import {
  HEADER_HEIGHT,
  screenWidth,
  screenHeight,
  scaleIndice
} from "../utils/variables";
import Carousel from "react-native-snap-carousel";
import { CardItem } from "../components";

import { getAll } from "../services/stitch";

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      fadeValue: 0,
      top: -88,
      business: this.props.navigation.getParam("business", new Business()),
      products: [],
      categories: [],
      load: false
    };
  }

  componentWillMount = () => {
    if (
      JSON.stringify(this.state.business.categories).indexOf("Pick for you") ==
      -1
    ) {
      this.state.business.categories.unshift({
        title: "Picked for you"
      });
    }
    setTimeout(() => {
      // this.state.business.categories.forEach(element => {
      //   this.state.categories.push({
      //     title: element.title
      //   });
      //   this.setState(prev => ({
      //     categories: prev.categories
      //   }));
      // });
      this.setState(prev => ({
        categories: this.state.business.categories
      }));
    }, 200);
  };

  componentDidMount() {
    // Find asset products
    let obj = {
      "asset.id": this.state.business.id.toString()
    };
    //console.log(this.state.business);

    getAll("products", obj, null).then(results => {
      //console.log("Results:", results);

      this.setState({
        products: results.map(element => {
          return {
            assetId: this.state.business.id,
            productId: element._id,
            name: element.name,
            product_by: "Tecno",
            price: element.price ? element.price : 0.0,
            stock: element.quantity,
            currency: element.currency,
            delivery_time: "10 - 20 mins",
            cretedAt: Math.floor(Math.random() * 100) + 1,
            shop: this.state.business.name,
            image:
              "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fgordonkelly%2Ffiles%2F2019%2F07%2FScreenshot-2019-07-15-at-02.32.05.jpg"
          };
        }),
        load: true
      });
    });
  }

  _start = a => {
    this.setState({
      fadeValue: a
    });

    if (this.state.top < -10) {
      this.setState(prevState => ({
        top: prevState.top + a + 1
      }));
    }
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    this._start(contentOffset.y / 300);

    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  render() {
    const { selected, business, products, load } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="blue" barStyle="dark-content" />

        {/* -------------------------------------------------------------------------- */
        /*                                Start header                                */
        /* -------------------------------------------------------------------------- */}

        <Animated.View
          style={{
            opacity: 1 - this.state.fadeValue,
            position: "absolute",
            top: 0,
            paddingTop: 20,
            height: HEADER_HEIGHT,
            width: screenWidth,
            right: 0,
            zIndex: 999,
            flexDirection: "row",
            backgroundColor: "transparent",
            paddingHorizontal: 15
          }}
        >
          <TouchableOpacity
            style={{
              flex: 20,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
              type="ionicon"
              color="#000"
              opacity={1 - this.state.fadeValue}
              size={moderateScale(30, scaleIndice)}
              iconStyle={{}}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 60,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "#fff",
                opacity: 1,
                fontSize: moderateScale(16, scaleIndice),
                fontWeight: "600"
              }}
            >
              {""}
            </Text>
          </View>
          <View
            style={{
              flex: 20,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                height: moderateScale(30, scaleIndice),
                width: moderateScale(30, scaleIndice),
                marginTop: moderateScale(5, scaleIndice),
                marginRight: moderateScale(10, scaleIndice),
                backgroundColor: "#fff",
                borderRadius: moderateScale(15, scaleIndice),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {}}
            >
              <Ionicons
                name="ios-heart"
                type="ionicon"
                color="red"
                size={moderateScale(18, scaleIndice)}
                iconStyle={{ marginTop: moderateScale(5, scaleIndice) }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: moderateScale(30, scaleIndice),
                width: moderateScale(30, scaleIndice),
                marginTop: moderateScale(5, scaleIndice),
                backgroundColor: "#fff",
                borderRadius: moderateScale(15, scaleIndice),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("Carts")}
            >
              <Icon
                name="shopping"
                size={moderateScale(15, scaleIndice)}
                color={colors.blue}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.fadeValue,
            position: "absolute",
            top: 0,
            paddingTop: 20,
            height: HEADER_HEIGHT,
            width: screenWidth,
            right: 0,
            zIndex: 999,
            flexDirection: "row",
            backgroundColor: "#fff",
            paddingHorizontal: 15,

            shadowColor: "#000000",
            shadowOpacity: 0.2,
            elevation: 2,
            shadowRadius: 7,
            shadowOffset: {
              height: 2,
              width: 0
            }
          }}
        >
          <TouchableOpacity
            style={{
              flex: 20,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
              type="ionicon"
              color="#000"
              size={moderateScale(30, scaleIndice)}
              iconStyle={{}}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 60,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(16, scaleIndice),
                marginVertical: moderateScale(2, scaleIndice),
                fontWeight: "600",
                textAlign: "center"
              }}
            >
              {business.name.length <= 17
                ? business.name
                : business.name.substring(0, 17) + "..."}
            </Text>
          </View>
          <View
            style={{
              flex: 20,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                height: moderateScale(30, scaleIndice),
                width: moderateScale(30, scaleIndice),
                marginTop: moderateScale(5, scaleIndice),
                marginRight: moderateScale(10, scaleIndice),
                backgroundColor: "#fff",
                borderRadius: moderateScale(15, scaleIndice),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {}}
            >
              <Ionicons
                name="ios-heart"
                type="ionicon"
                color="red"
                size={moderateScale(18, scaleIndice)}
                iconStyle={{ marginTop: moderateScale(5, scaleIndice) }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: moderateScale(30, scaleIndice),
                width: moderateScale(30, scaleIndice),
                marginTop: moderateScale(5, scaleIndice),
                backgroundColor: "#fff",
                borderRadius: moderateScale(15, scaleIndice),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("Carts")}
            >
              <Icon
                name="shopping"
                size={moderateScale(15, scaleIndice)}
                color={colors.blue}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* -------------------------------------------------------------------------- */
        /*                                Finish header                               */
        /* -------------------------------------------------------------------------- */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: "#fff" }}
          bounces={false}
          onScroll={({ nativeEvent }) => {
            this.isCloseToBottom(nativeEvent);
          }}
          scrollEventThrottle={screenHeight}
        >
          {/* -------------------------------------------------------------------------- */
          /*                                Details block                               */
          /* -------------------------------------------------------------------------- */}

          <ImageBackground
            source={business.image}
            style={{
              width: screenWidth,
              zIndex: 0
            }}
          >
            <View
              style={{
                width: screenWidth,

                backgroundColor: "rgba(0,0,0,0.4)"
              }}
            >
              <View
                style={{
                  marginTop: 100,
                  marginBottom: -3,
                  width: moderateScale(300, scaleIndice),
                  height: moderateScale(160, scaleIndice),
                  backgroundColor: "#fff",
                  borderTopLeftRadius: moderateScale(20, scaleIndice),
                  borderTopRightRadius: moderateScale(20, scaleIndice),
                  alignSelf: "center",
                  alignItems: "center"
                }}
              >
                <ImageBackground
                  source={business.image}
                  borderRadius={moderateScale(40, scaleIndice)}
                  style={{
                    marginTop: -40,
                    width: moderateScale(80, scaleIndice),
                    height: moderateScale(80, scaleIndice),
                    marginBottom: moderateScale(5, scaleIndice)
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(0,0,0,.08)",
                      width: moderateScale(80, scaleIndice),
                      height: moderateScale(80, scaleIndice),
                      borderRadius: moderateScale(40, scaleIndice)
                    }}
                  />
                </ImageBackground>
                <Text
                  style={{
                    fontSize: moderateScale(20, scaleIndice),
                    marginVertical: moderateScale(2, scaleIndice),
                    fontWeight: "600",
                    textAlign: "center"
                  }}
                >
                  {business.name}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12, scaleIndice),
                    fontWeight: "300",
                    marginBottom: moderateScale(5, scaleIndice),
                    color: "#aaa",
                    textAlign: "center"
                  }}
                >
                  {business.subTitle}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                  <View style={styles.tagBlock}>
                    <Text style={styles.tagText}>
                      {business.is_open ? "Open now" : "Closed"}
                    </Text>
                  </View>
                  <View style={styles.tagBlock}>
                    <Text style={styles.tagText}>
                      {business.delivery_time}
                    </Text>
                  </View>

                  {business.free_delivery
                    ? <View style={styles.tagBlock}>
                        <Text style={styles.tagText}>Free delivery</Text>
                      </View>
                    : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(12, scaleIndice),
                      marginTop: moderateScale(5, scaleIndice),
                      fontWeight: "300",
                      color: "#aaa",
                      textAlign: "center",
                      flexDirection: "row"
                    }}
                  >
                    {"Location and Hours "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Maps")}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(10, scaleIndice),
                        marginTop: moderateScale(5, scaleIndice),
                        fontWeight: "bold",
                        color: colors.blue,
                        textAlign: "center"
                      }}
                    >
                      {" View info"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>

          <View style={{ backgroundColor: "#fff" }}>
            {/* -------------------------------------------------------------------------- */
            /*                               Swipe category                               */
            /* -------------------------------------------------------------------------- */}

            <Carousel
              containerCustomStyle={{ marginTop: 15 }}
              onSnapToItem={index => this.setState({ selected: index })}
              layout={"default"}
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.categories}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: 30
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: moderateScale(15, scaleIndice),
                        marginHorizontal: moderateScale(0, scaleIndice),
                        color: selected === index ? "#0C4767" : "#8E8E93",
                        fontWeight: selected === index ? "600" : "100"
                      }}
                    >
                      {item.title.length <= 15
                        ? item.title
                        : item.title.substring(0, 12) + "..."}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              sliderWidth={screenWidth}
              itemWidth={130}
              itemHeight={60}
            />

            {/* -------------------------------------------------------------------------- */
            /*                               Best categories                              */
            /* -------------------------------------------------------------------------- */}

            <View
              style={{
                alignSelf: "center",
                marginVertical: 5,
                marginBottom: 15,
                marginTop: -3,
                height: moderateScale(8, scaleIndice),
                width: moderateScale(8, scaleIndice),
                borderRadius: moderateScale(4, scaleIndice),
                backgroundColor: "#0C4767"
              }}
            />

            {selected > 0
              ? <FlatList
                  style={{
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    width: screenWidth - 20
                  }}
                  data={products.sort((a, b) => {
                    return a.cretedAt - b.cretedAt;
                  })}
                  numColumns={2}
                  keyExtractor={item => JSON.stringify(item)}
                  renderItem={({ item, index }) =>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("Details", {
                          product: item
                        });
                      }}
                    >
                      <CardItem
                        height_={220}
                        image={{ uri: item.image }}
                        backgroundColor="#596b9f"
                        title={item.name}
                        subTitle={item.product_by}
                        showPrice
                        price={`${item.price} ${item.currency}`}
                        deliveryTime={item.delivery_time}
                      />
                    </TouchableOpacity>}
                />
              : <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 15,
                      justifyContent: "space-between",
                      alignItems: "center",

                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        color: "#4A4A4A",
                        fontSize: 21,
                        fontWeight: "500"
                      }}
                    >
                      {"Best Electronics"}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("AllProducts", {
                          backScreen: "Explorer",
                          pageText: "Best sellers"
                        })}
                    >
                      <Text
                        style={{
                          color: "#980100",
                          fontSize: 12,
                          fontWeight: "500"
                        }}
                      >
                        {"View All"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {products.length == 0 && load == false
                    ? <ActivityIndicator style={{ marginTop: 10 }} />
                    : null}
                  <FlatList
                    style={{
                      backgroundColor: "#fff",
                      alignSelf: "center",
                      paddingHorizontal: moderateScale(10, scaleIndice),
                      width: screenWidth
                    }}
                    showsHorizontalScrollIndicator={false}
                    data={products.sort((a, b) => {
                      return a.cretedAt - b.cretedAt;
                    })}
                    horizontal
                    keyExtractor={item => JSON.stringify(item)}
                    renderItem={({ item, index }) =>
                      <TouchableHighlight
                        underlayColor={"#f9f9f9"}
                        style={{
                          borderRadius: 10,
                          marginRight: index === products.length - 1 ? 20 : 0
                        }}
                        onPress={() => {
                          this.props.navigation.navigate("Details", {
                            product: item
                          });
                        }}
                      >
                        <CardItem
                          height_={220}
                          image={{ uri: item.image }}
                          backgroundColor="#596b9f"
                          title={
                            item.name.length <= 17
                              ? item.name
                              : item.name.substring(0, 17) + "..."
                          }
                          subTitle={item.product_by}
                          showPrice
                          price={`${item.price} ${item.currency.toUpperCase()}`}
                          deliveryTime={item.delivery_time}
                        />
                      </TouchableHighlight>}
                  />

                  {/* -------------------------------------------------------------------------- */
                  /*                                  Trending                                  */
                  /* -------------------------------------------------------------------------- */}
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 20,
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 20,
                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        color: "#4A4A4A",
                        fontSize: 21,
                        fontWeight: "500"
                      }}
                    >
                      {"Trending"}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("AllProducts", {
                          backScreen: "Explorer",
                          pageText: "Trending"
                        })}
                    >
                      <Text
                        style={{
                          color: "#980100",
                          fontSize: 12,
                          fontWeight: "500"
                        }}
                      >
                        {"View All"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {products.length == 0 && load == false
                    ? <ActivityIndicator style={{ marginTop: 10 }} />
                    : null}
                  <FlatList
                    style={{
                      backgroundColor: "#fff",
                      alignSelf: "center",
                      paddingHorizontal: moderateScale(15, scaleIndice),
                      width: screenWidth
                    }}
                    showsHorizontalScrollIndicator={false}
                    data={products.sort((a, b) => {
                      return a.cretedAt - b.cretedAt;
                    })}
                    horizontal
                    keyExtractor={item => JSON.stringify(item)}
                    renderItem={({ item, index }) =>
                      <TouchableHighlight
                        underlayColor={"#f9f9f9"}
                        style={{
                          borderRadius: 10,
                          marginRight: index === products.length - 1 ? 20 : 0
                        }}
                        onPress={() => {
                          this.props.navigation.navigate("Details", {
                            product: item
                          });
                        }}
                      >
                        <CardItem
                          height_={220}
                          image={{ uri: item.image }}
                          backgroundColor="#596b9f"
                          title={
                            item.name.length <= 17
                              ? item.name
                              : item.name.substring(0, 17) + "..."
                          }
                          subTitle={item.product_by}
                          showPrice
                          price={`${item.price} ${item.currency.toUpperCase()}`}
                          deliveryTime={item.delivery_time}
                        />
                      </TouchableHighlight>}
                  />
                </View>}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Shop;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    marginBottom: -20
  },
  main: {
    padding: 0
  },
  tagBlock: {
    width: moderateScale(75, scaleIndice),
    height: moderateScale(17, scaleIndice),
    borderRadius: 20,
    marginRight: moderateScale(3, scaleIndice),
    marginTop: moderateScale(5, scaleIndice),
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center"
  },
  tagText: {
    color: colors.blue,
    fontSize: moderateScale(8, scaleIndice),
    fontWeight: "800",
    letterSpacing: 0.16
  },
  modal3: {
    width: 295,
    height: 200,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: 5, height: 0 },
    shadowRadius: 20,
    borderRadius: 8,
    backgroundColor: "#ffffff"
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0
  }
});
