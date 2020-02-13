import React, { Component } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  View,
  ActivityIndicator,
  FlatList,
  Platform
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { moderateScale } from "react-native-size-matters";
import { StateContainer } from "../utils/stateContainer";

import {
  screenWidth,
  STATUS_BAR_HEIGHT,
  scaleIndice
} from "../utils/variables";

import { CardItem } from "../components";
import { formatNumber } from "../utils/variables";
import { getAll } from "../services";
import { Ionicons } from "@expo/vector-icons";

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      load: false,
      pageText: this.props.navigation.getParam("pageText", ""),
      business: this.props.navigation.getParam("business", null)
    };
  }

  componentWillMount() {}

  componentDidMount() {
    if (
      this.state.pageText == "Best sellers" ||
      this.state.pageText == "Trending"
    ) {
      // Find asset products
      let obj = {
        "asset.id": this.state.business.id.toString()
      };

      getAll("products", obj, null).then(results => {
        this.setState({
          products: results.map(element => {
            return {
              assetId: this.state.business.id,
              productId: element._id,
              name: element.name,
              product_by: element.brand,
              price: element.price ? element.price : 0.0,
              stock: element.quantity,
              currency: element.currency
                ? element.currency.toUpperCase()
                : "HTG",
              delivery_time: "10 - 20 mins",
              cretedAt: Math.floor(Math.random() * 100) + 1,
              shop: this.state.business.name,
              image: element.pictures
            };
          }),
          load: true
        });
      });
    }
  }
  render() {
    const { products, pageText, load, business } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 0 }}>
          <Text
            style={{
              width: moderateScale(200, scaleIndice),
              marginTop: 100,
              marginLeft: moderateScale(13, scaleIndice),
              color: "#000",
              fontWeight: "600",
              fontSize: moderateScale(25, scaleIndice),
              letterSpacing: 0.32,
              alignSelf: "flex-start"
            }}
          >
            {pageText}
          </Text>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}
          >
            {products.length == 0 && load == false ? (
              <ActivityIndicator style={{ marginTop: 100 }} />
            ) : null}
            <FlatList
              style={{
                backgroundColor: "#fff",
                alignSelf: "center"
              }}
              data={products}
              numColumns={2}
              keyExtractor={item => JSON.stringify(item)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Details", {
                      product: item,
                      business: this.state.business
                    });
                  }}
                >
                  <CardItem
                    height_={220}
                    image={
                      item.image && item.image[0]
                        ? { uri: item.image[0].url }
                        : require("../images/logo_mrkt.jpg")
                    }
                    backgroundColor="#596b9f"
                    title={
                      item.name.length <= 17
                        ? item.name
                        : item.name.substring(0, 17) + "..."
                    }
                    subTitle={item.product_by}
                    showPrice
                    price={`${formatNumber(
                      item.price *
                        (business.currency == item.currency
                          ? 1
                          : business.all.rate.value),
                      business.currency
                    )} `}
                    deliveryTime={item.delivery_time}
                  />
                </TouchableOpacity>
              )}
            />
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
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{
              flex: 9,
              height: moderateScale(33, scaleIndice),
              marginRight: moderateScale(10, scaleIndice),
              backgroundColor: "transparent",
              alignSelf: "center",
              borderRadius: moderateScale(17, scaleIndice),
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10
            }}
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
        </View>
      </View>
    );
  }
}
