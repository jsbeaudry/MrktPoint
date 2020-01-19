/* eslint max-classes-per-file: ["error", 2] */

import React from "react";
import {
  StyleSheet,
  Animated,
  FlatList,
  Image,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import MapView from "react-native-maps";
import { Button } from "../components";
import { screenWidth, HEADER_HEIGHT, scaleIndice } from "../utils/variables";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../utils/colors";
import { Icon } from "../utils/icons";
import { Ionicons } from "@expo/vector-icons";
import { getAll } from "../services";

const CARD_HEIGHT = 150;
const CARD_WIDTH = 280;
const { width } = Dimensions.get("window");

class Maps extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Location & Hours",
      header: null,
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
          <Ionicons
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
        backgroundColor: "transparent"
      }
    };
  };
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = {
      viewDetails: false,
      search: "",
      region: {
        latitude: 18.512082,
        longitude: -72.287403,
        latitudeDelta: 0.04,
        longitudeDelta: 0.06
      },
      businesses: [],
      detailShop: {}
    };
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    getAll("assets", {})
      .then(results => {
        this.setState({
          businesses: results
            .filter(i => i.currency && i.pictures && i.gps && i.gps.coordinates)
            .map(element => {
              return {
                id: element._id,
                logo: element.logo && element.logo ? element.logo : "https://",
                image:
                  element.pictures && element.pictures[0]
                    ? element.pictures[0].url
                    : "https://",
                name: element.legalName,
                address: `${element.address.address1 || ""}, ${element.address
                  .city || ""}, ${element.address.state || ""}, ${element
                  .address.country || ""}`,
                phone: "+509 28132020",
                hour: "8AM-5PM",
                coordinate: {
                  latitude: 18.512082,
                  longitude: -72.287403
                }
              };
            })
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          businesses: []
        });
      });
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= this.state.businesses.length) {
        index = this.state.businesses.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.businesses[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.businesses.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp"
      });
      return { scale, opacity };
    });
    const { businesses } = this.state;
    return (
      <View style={styles.container}>
        {this.state.viewDetails === true ? (
          <View
            style={{
              opacity: 1,
              position: "absolute",
              top: 20,
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

                justifyContent: "center",
                alignItems: "flex-start"
              }}
              onPress={() => this.props.navigation.goBack()}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  height: 34,
                  width: 34,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Ionicons
                  name={
                    Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"
                  }
                  type="ionicon"
                  color={colors.blue}
                  opacity={1}
                  size={moderateScale(26, scaleIndice)}
                  iconStyle={{}}
                />
              </View>
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
                  color: "#000",
                  opacity: 1,
                  fontSize: moderateScale(16, scaleIndice),
                  fontWeight: "600"
                }}
              >
                {"Location & Hours"}
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
            />
          </View>
        ) : (
          <View
            style={{
              opacity: 1,
              position: "absolute",
              top: 20,
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

                justifyContent: "center",
                alignItems: "flex-start"
              }}
              onPress={() => this.props.navigation.goBack()}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  height: 34,
                  width: 34,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Ionicons
                  name={
                    Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"
                  }
                  type="ionicon"
                  color={colors.blue}
                  opacity={1}
                  size={moderateScale(26, scaleIndice)}
                  iconStyle={{}}
                />
              </View>
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
                  color: "#000",
                  opacity: 1,
                  fontSize: moderateScale(16, scaleIndice),
                  fontWeight: "600"
                }}
              >
                {"Discovery"}
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
            />
          </View>
        )}

        <MapView
          ref={map => {
            this.map = map;
          }}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.businesses.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale
                }
              ]
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity
            };
            return (
              <MapView.Marker
                key={JSON.stringify(index)}
                coordinate={marker.coordinate}
              >
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <Ionicons name={"ios-pin"} size={18} color="#fff" />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        {this.state.viewDetails === false ? (
          <View
            style={{
              backgroundColor: "#fff",

              width: screenWidth,
              position: "absolute",
              top: 0,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingTop: 50,
              paddingBottom: 20
            }}
          >
            <Text
              style={{
                color: colors.gray,
                fontSize: 15,
                marginTop: 35,
                marginBottom: 7,
                marginLeft: 20
              }}
            >
              {"Drag or move map"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <TextInput
                placeholder={"Type any location"}
                value={this.state.search}
                onChangeText={text => this.setState({ search: text })}
                style={{
                  height: 40,
                  width: screenWidth - 100,
                  fontSize: 14,
                  borderColor: "#eee",
                  fontWeight: "500",
                  borderWidth: 0
                }}
              />
              <Ionicons
                name={"ios-search"}
                style={{ marginRight: 0 }}
                size={30}
                color={colors.blue}
              />
            </View>
            {/* <View
                style={{
                  borderTopColor: "#eee",
                  borderTopWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5
                }}
              >
                <Text
                  style={{
                    color: colors.blue,
                    fontWeight: "bold",
                    fontSize: 12,
                    marginTop: 25
                  }}
                >
                  {"VIEW MORE"}
                </Text>
              </View> */}
          </View>
        ) : null}
        {this.state.viewDetails === true ? (
          //Details shops
          <View
            style={{
              position: "absolute",
              bottom: 20,
              height: 400,
              width: screenWidth - 70,
              alignSelf: "center",
              borderRadius: 10,
              backgroundColor: "#fff"
            }}
          >
            <Image
              source={{
                uri: this.state.detailShop.image
              }}
              borderRadius={15}
              style={{
                position: "absolute",
                top: -50,
                left: 20,
                height: 100,
                width: 180
              }}
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: 70,
                marginHorizontal: 20
              }}
            >
              <Image
                source={{
                  uri: this.state.detailShop.logo
                }}
                borderRadius={25}
                style={{
                  height: 50,
                  width: 50
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    color: colors.blue,
                    fontSize: 12,
                    fontWeight: "800"
                  }}
                >
                  {"4.5 KM"}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginVertical: 1
                  }}
                >
                  {this.state.detailShop.name}
                </Text>
                <Text
                  style={{
                    color: colors.grey,
                    fontSize: 11
                  }}
                >
                  {this.state.detailShop.address}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginHorizontal: 20
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    color: colors.gray,
                    fontSize: 15,
                    marginBottom: 10,
                    fontWeight: "800"
                  }}
                >
                  {"Rating"}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {[1, 2, 3, 4, 5].map(rate => (
                    <View
                      key={rate}
                      style={{
                        height: 7,
                        width: 7,
                        borderRadius: 3,
                        margin: 2,
                        backgroundColor: colors.blue
                      }}
                    />
                  ))}
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: 16,

                      fontWeight: "800"
                    }}
                  >
                    {" 4.5"}
                  </Text>
                </View>
              </View>
              <View style={{ marginHorizontal: 20 }}>
                <Text
                  style={{
                    color: colors.gray,
                    fontSize: 15,
                    marginBottom: 5,
                    fontWeight: "800"
                  }}
                >
                  {"Distance"}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 20,
                    marginBottom: 10,
                    fontWeight: "600"
                  }}
                >
                  {"20m"}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 35,
                  marginRight: 10,
                  backgroundColor: colors.blue,
                  alignSelf: "center",
                  borderRadius: 17,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name={"phone"} size={17} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 35,
                  marginRight: 10,
                  backgroundColor: colors.blue,
                  alignSelf: "center",
                  borderRadius: 17,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name={"phone"} size={17} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.setState(prevState => ({
                  viewDetails: !prevState.viewDetails
                }))
              }
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                height: 40,
                width: 40,
                backgroundColor: "transparent",
                alignItems: "center",
                borderRadius: 20,
                justifyContent: "center"
              }}
            >
              <Ionicons name={"ios-close"} size={35} color={"red"} />
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: "#f0f0f0",
                alignItems: "center",
                justifyContent: "center",
                height: 80
              }}
            >
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  alignSelf: "center",
                  width: "100%",
                  height: 50,
                  marginTop: 10,
                  paddingHorizontal: 10
                }}
                keyExtractor={item => JSON.stringify(item)}
                data={this.state.detailShop.pictures}
                renderItem={({ item }) => (
                  <Image
                    source={{
                      uri: item.url
                    }}
                    borderRadius={8}
                    style={{
                      width: 74,
                      height: 53,
                      margin: 5
                    }}
                  />
                )}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 20
              }}
            >
              <Text
                style={{
                  color: colors.black,
                  fontSize: 12,
                  marginBottom: 5,
                  fontWeight: "400"
                }}
              >
                {"Tuesday - Saturday"}
              </Text>

              <Text
                style={{
                  color: colors.black,
                  fontSize: 12,
                  marginBottom: 5,
                  fontWeight: "400"
                }}
              >
                {"10:00 - 19:00"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 0
              }}
            >
              <Text
                style={{
                  color: colors.black,
                  fontSize: 12,
                  marginBottom: 10,
                  fontWeight: "400"
                }}
              >
                {"Sunday - Monday"}
              </Text>

              <Text
                style={{
                  color: colors.blue,
                  fontSize: 12,
                  marginBottom: 10,
                  fontWeight: "600"
                }}
              >
                {"Closed"}
              </Text>
            </View>

            <Button
              onClick={() => {
                this.props.navigation.navigate("Signup");
              }}
              textStyle={{ color: "#fff", fontWeight: "bold" }}
              text="MORE INFO"
              buttonStyle={{
                alignSelf: "center",
                backgroundColor: colors.blue,
                height: 45,
                width: screenWidth - 130,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          </View>
        ) : (
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation
                    }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
            style={[styles.scrollView, { alignSelf: "center" }]}
            contentContainerStyle={styles.endPadding}
          >
            {businesses
              .filter(
                i =>
                  i.address
                    .toLowerCase()
                    .indexOf(this.state.search.toLowerCase()) != -1
              )
              .map((business, i) => (
                <View
                  key={i}
                  style={{
                    paddingTop: 100,
                    height: 300
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setState(prevState => ({
                        viewDetails: !prevState.viewDetails,
                        detailShop: business
                      }))
                    }
                    key={JSON.stringify(business)}
                    style={{
                      marginBottom: -10,
                      height: CARD_HEIGHT,
                      marginTop: 50,
                      marginHorizontal: 10,
                      width: CARD_WIDTH,
                      alignSelf: "center",
                      borderRadius: 10,
                      backgroundColor: "#fff"
                    }}
                  >
                    <Image
                      source={{
                        uri: business.image
                      }}
                      borderRadius={15}
                      style={{
                        position: "absolute",
                        zIndex: 999,
                        left: 30,
                        top: -50,
                        height: 100,
                        width: 100,
                        backgroundColor: "#fff",
                        borderColor: "rgba(0,0,0,0.05)",
                        borderWidth: 0
                      }}
                    />
                    <View
                      style={{
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        marginTop: 10,
                        marginRight: 10
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          height: 30,
                          width: 30,
                          marginRight: 20,
                          marginTop: 10,
                          backgroundColor: colors.blue,
                          alignSelf: "center",
                          borderRadius: 15,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Ionicons
                          name={"ios-navigate"}
                          size={17}
                          color="#fff"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          height: 30,
                          width: 30,
                          marginTop: 10,
                          marginRight: 20,
                          backgroundColor: colors.blue,
                          alignSelf: "center",
                          borderRadius: 15,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Icon name={"phone"} size={17} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 24,
                        marginBottom: 3,
                        marginLeft: 20
                      }}
                    >
                      {business.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.grey,
                        fontSize: 13,
                        marginLeft: 20,
                        marginRight: 20
                      }}
                    >
                      {business.address}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </Animated.ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.blue,
    position: "absolute"
  }
});

export default Maps;
