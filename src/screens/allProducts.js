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
import { colors } from "../utils/colors";
import {
  screenWidth,
  STATUS_BAR_HEIGHT,
  scaleIndice
} from "../utils/variables";
import { Icon } from "../utils/icons";
import { CardItem } from "../components";

import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import { getAll } from "../services";
import { Ionicons } from "@expo/vector-icons";
const mystates = new StateContainer({
  orders: []
});

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      load: false,
      pageText: this.props.navigation.getParam("pageText", "")
    };
  }

  componentWillMount() {}

  componentDidMount() {
    // Find 10 documents and log them to console. this.state.business.asset

    getAll("products", {}, null).then(results => {
      console.log("Results:", results[0]);
      let resp = results;
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        this.state.products.push({
          name: element.name,
          product_by: "Tecno",
          price: element.price,
          stock: element.quantity,
          currency: element.currency,
          delivery_time: "10 - 20 mins",
          cretedAt: Math.floor(Math.random() * 100) + 1,
          image:
            "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fgordonkelly%2Ffiles%2F2019%2F07%2FScreenshot-2019-07-15-at-02.32.05.jpg"
        });
      }
      this.setState(prevState => ({
        products: prevState.products,
        load: true
      }));
    });
  }
  render() {
    const { products, pageText, load } = this.state;
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
              data={products.sort((a, b) => {
                return a.cretedAt - b.cretedAt;
              })}
              numColumns={2}
              keyExtractor={item => JSON.stringify(item)}
              renderItem={({ item, index }) => (
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
