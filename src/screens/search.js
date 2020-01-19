import React from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  View,
  TouchableHighlight,
  FlatList
} from "react-native";
import _ from "lodash";
import { FontAwesome, Ionicons } from "react-native-vector-icons";

import { moderateScale } from "react-native-size-matters";
import Carousel from "react-native-snap-carousel";
import {
  STATUS_BAR_HEIGHT,
  screenWidth,
  scaleIndice
} from "../utils/variables";
import { Card } from "../components";
import { getAll } from "../services";
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchText: "",
      categories: [
        {
          image:
            "https://media.4rgos.it/i/Argos/8102137_R_Z001A?w=750&h=440&qlt=70",
          title: "TV"
        },
        {
          image:
            "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/apple-iphone-xr/blue/Apple-iPhoneXr-Blue-1-3x.jpg",
          title: "Phone"
        },
        {
          image:
            "https://www.gogiftpro.com/image/cache/catalog/Audio%20and%20video/SC208%20Bluetooth%204.0%20Portable%20Wireless%20Speaker%20TF%20USB%20FM%20Radio%20Bluetooth%20Speaker%20Bass%20Sound%20Subwoofer%20Speakers%20(1)-600x600.jpg",
          title: "Radio"
        },
        {
          image:
            "https://images-na.ssl-images-amazon.com/images/I/61su%2B-AlR1L._SL1296_.jpg",
          title: "Headphone"
        },
        {
          image:
            "https://images-na.ssl-images-amazon.com/images/I/51PA3B6npwL._SX425_.jpg",
          title: "Speaker"
        }
      ],
      businesses: []
    };
  }

  componentWillMount() {
    getAll("assets", {})
      .then(results => {
        this.setState({
          businesses: results
            .filter(i => i.currency && i.pictures)
            .map(element => {
              return {
                id: element._id,
                owner_id: element.owner_id,
                type: element.type,
                name: element.legalName,
                logo: element.logo ? element.logo : "asdadas",
                image:
                  element.pictures &&
                  element.pictures[0] &&
                  element.pictures[0].url
                    ? { uri: element.pictures[0].url }
                    : require("../images/logo_mrkt.jpg"),
                subTitle: element.slogan,
                currency: element.currency,
                categories: element.categories ? element.categories : [],
                delivery_time: element.delivery_time,
                is_open: true,
                free_delivery: true
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

  render() {
    const { businesses, categories, searchText } = this.state;
    return (
      <View style={{}}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <Text
            style={{
              marginTop: 100,
              marginBottom: 20,
              marginLeft: 10,
              color: "#000",
              fontWeight: "bold",
              fontSize: 34,
              letterSpacing: 0.32,
              alignSelf: "flex-start"
            }}
          >
            {"Top categories"}
          </Text>
          <View style={{ height: 250 }}>
            <Carousel
              layout={"default"}
              onSnapToItem={() => {}}
              ref={c => {
                this._carousel = c;
              }}
              data={categories}
              renderItem={({ item }) => {
                return (
                  <TouchableHighlight
                    style={{ borderRadius: 10 }}
                    underlayColor={"#eee"}
                    style={{
                      flex: 1
                    }}
                    onPress={() =>
                      this.props.navigation.navigate("AllProducts", {
                        backScreen: "Main",
                        pageText: item.title
                      })
                    }
                  >
                    <Card
                      imageUrl={{ uri: item.image }}
                      title={item.title}
                      borderRad={10}
                      h={222}
                      opacity={0.4}
                      w={167}
                      showText
                    />
                  </TouchableHighlight>
                );
              }}
              sliderWidth={screenWidth}
              sliderHeight={300}
              itemWidth={200}
              itemHeight={222}
            />
          </View>
          {/* <View style={{}}>
            <FlatList
              style={{ paddingLeft: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={categories}
              keyExtractor={item => JSON.stringify(item)}
              renderItem={({ item }) => (
                <TouchableHighlight
                  style={{ borderRadius: 10 }}
                  underlayColor={"#eee"}
                  style={{
                    flex: 1
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("AllProducts", {
                      backScreen: "Main",
                      pageText: item.title
                    })
                  }
                >
                  <Card
                    imageUrl={{ uri: item.image }}
                    title={item.title}
                    borderRad={10}
                    h={222}
                    opacity={0.4}
                    w={167}
                    showText
                  />
                </TouchableHighlight>
              )}
            />
          </View> */}

          <View style={{ marginTop: -20, marginBottom: 100 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "space-between",

                height: 50,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 0
              }}
            >
              <View
                style={{
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 17,
                    fontWeight: "bold",
                    marginLeft: 5,
                    letterSpacing: 0.32,
                    textAlign: "center",
                    alignSelf: "flex-start"
                  }}
                >
                  {"Popular stores"}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1
                }}
                onPress={() => {}}
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 13,
                    fontWeight: "400",
                    letterSpacing: -0.41,
                    textAlign: "right",
                    lineHeight: 12,
                    alignSelf: "flex-end"
                  }}
                >
                  {""}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 10
              }}
            >
              <FlatList
                style={{
                  height: 200,
                  paddingVertical: 10,
                  paddingLeft: 10,
                  alignSelf: "flex-start",
                  width: screenWidth
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={businesses}
                horizontal
                keyExtractor={item => JSON.stringify(item)}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    style={{ borderRadius: 30 }}
                    underlayColor={"#eee"}
                    onPress={() => {
                      this.props.navigation.navigate("Shop", {
                        business: item
                      });
                    }}
                  >
                    <Card
                      imageUrl={item.image}
                      borderRad={30}
                      h={137}
                      w={137}
                      showText={false}
                      showTextBellow={true}
                      textBellow={item.name.substring(0, 20)}
                    />
                  </TouchableHighlight>
                )}
              />
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: STATUS_BAR_HEIGHT,
            right: 0,
            zIndex: 999
          }}
        >
          <View
            style={{
              flex: 80,
              flexDirection: "row",
              height: moderateScale(40, scaleIndice),
              margin: moderateScale(10, scaleIndice),
              backgroundColor: "#fff",
              alignSelf: "center",
              borderRadius: moderateScale(20, scaleIndice),
              justifyContent: "flex-start",
              alignItems: "center",
              elevation: 1,
              paddingLeft: moderateScale(20, scaleIndice),
              shadowColor: "#000000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: {
                height: 1,
                width: 1
              }
            }}
          >
            <FontAwesome
              name="search"
              size={moderateScale(17, scaleIndice)}
              color="#aaa"
            />
            <TextInput
              placeholder="Search"
              style={{
                width: screenWidth - moderateScale(130, scaleIndice),
                marginLeft: moderateScale(10, scaleIndice),
                fontSize: moderateScale(14, scaleIndice)
              }}
              value={searchText}
              onChangeText={searchText => this.setState({ searchText })}
            />
            {searchText != "" ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ searchText: "" });
                }}
                style={{}}
              >
                <Ionicons
                  name="ios-close"
                  size={moderateScale(30, scaleIndice)}
                  color={"#000"}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}
