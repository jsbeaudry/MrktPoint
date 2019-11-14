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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../utils/colors";
import { Icon } from "../utils/icons";
import { Business } from "../utils/class";
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
    // let business = new Business();
    // business.name = "Thompson Electronics";
    // business.image =
    //   "http://www.flashhaiti.com/ads-library/Thompson%20Cell/thompson_cell-ad9.jpg";
    // business.subTitle = "slogan i don't know";
    // business.delivery_time = "10 - 20 mins";
    // business.is_open = true;
    // business.free_delivery = true;
    // this.state.businesses.push(business);

    // const business_concat = _.concat(this.state.businesses, []);

    // this.setState({
    //   businesses: business_concat
    // });

    getAll("assets", {}).then(results => {
      this.setState({
        businesses: results.map(element => {
          return {
            id: element._id,
            owner_id: element.owner_id,
            type: element.type,
            name: element.legalName,
            logo: element.logo,
            // image:
            //   element.pictures && element.pictures[0] && element.pictures[0].url
            //     ? element.pictures[0].url
            //     : element.logo,
            image: require("../images/logo_mrkt.jpg"),
            subTitle: element.slogan,
            categories: element.categories ? element.categories : [],
            delivery_time: "10 - 20 mins",
            is_open: true,
            free_delivery: true
          };
        })
      });
    });
  }

  render() {
    const { businesses, categories } = this.state;
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

          <View style={{}}>
            <FlatList
              style={{ paddingLeft: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={categories}
              keyExtractor={item => JSON.stringify(item)}
              renderItem={({ item }) =>
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
                    })}
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
                </TouchableHighlight>}
            />
          </View>

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
                  flex: 1,
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
                renderItem={({ item }) =>
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
                    />
                  </TouchableHighlight>}
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
            />
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Carts");
            }}
            style={{
              flex: 9,
              height: moderateScale(33, scaleIndice),
              marginRight: moderateScale(10, scaleIndice),
              backgroundColor: colors.blue,
              alignSelf: "center",
              borderRadius: moderateScale(17, scaleIndice),
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="bag"
              size={moderateScale(17, scaleIndice)}
              color={colors.white}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
