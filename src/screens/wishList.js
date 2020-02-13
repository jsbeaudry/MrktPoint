import React, { Component } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  Platform
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Ionicons";
import { scaleIndice } from "../utils/variables";
import { CardItem } from "../components";
import { formatNumber } from "../utils/variables";
import { getUserWishlist } from "../services";
import { connect } from "react-redux";
const noitem = require("../images/noitem.png");
class Wishlist extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Wish list",
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
            size={30}
            iconStyle={{}}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        borderBottomColor: "#fff",
        backgroundColor: "#fff"
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      business: {},
      load: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    // Find asset products
    getUserWishlist(this.props.user.user_id)
      .then(results => {
        console.log(results);

        this.setState({
          products: results.map(element0 => {
            let element = element0.products[0];
            return {
              assetId: element.asset.id,
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
              shop: element0.asset[0],
              image: element.pictures
            };
          }),
          load: true
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          load: true,
          products: []
        });
      });
  }
  getBusiness = element => {
    return {
      id: element._id,
      owner_id: element.owner_id,
      type: element.type,
      name: element.legalName,
      logo: element.logo ? element.logo : "asdadas",
      image:
        element.pictures && element.pictures[0] && element.pictures[0].url
          ? { uri: element.pictures[0].url }
          : require("../images/logo_mrkt.jpg"),
      address: `${element.address.address1}, ${element.address.city}, ${element.address.state}, ${element.address.country}`,
      subTitle: element.slogan,
      currency: element.currency,
      categories: element.categories ? element.categories : [],
      delivery_time: "10 - 20 mins",
      is_open: true,
      free_delivery: true,
      all:element
    };
  };
  render() {
    const { products, pageText, load } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 0 }}>
          <Text
            style={{
              width: moderateScale(200, scaleIndice),
              marginTop: 0,
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

            {products.length == 0 && load == true ? (
              <View>
                <Image
                  source={noitem}
                  style={{
                    width: 200,
                    height: 200,
                    marginTop: 100,
                    resizeMode: "contain",
                    alignSelf: "center"
                  }}
                />
                <Text
                  style={{
                    marginTop: 0,
                    color: "#000",
                    fontSize: 13,
                    marginHorizontal: 30,
                    fontWeight: "600",
                    textAlign: "center"
                  }}
                >
                  {`No item found`}
                </Text>
              </View>
            ) : null}
            <FlatList
              style={{
                backgroundColor: "#fff",
                alignSelf: products.length > 1 ? "center" : "flex-start",
                marginLeft: products.length > 1 ? 0 : 11
              }}
              data={products}
              numColumns={2}
              keyExtractor={item => JSON.stringify(item)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Details", {
                      product: item,
                      business: this.getBusiness(item.shop)
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
                    price={`${formatNumber(item.price)} `}
                    deliveryTime={item.delivery_time}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.user;
  return { user };
};
export default connect(mapStateToProps, {})(Wishlist);
