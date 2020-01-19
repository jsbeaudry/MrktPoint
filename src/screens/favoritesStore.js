import React, { Component } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
  Platform
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import _ from "lodash";

import { CardItem } from "../components";
import { getUserFavorites } from "../services";

import { connect } from "react-redux";

const noitem = require("../images/noitem.png");

class Favorites extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Favorites",
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
      businesses: [],
      bags: [],
      searchText: "",
      load: false,
      refreshing: false
    };
  }
  onRefresh = () => {
    this.getAllBusiness();
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 3000);
  };
  componentWillMount() {
    this.getAllBusiness();
  }

  componentDidMount() {}
  componentWillUnmount() {}

  getAllBusiness = () => {
    getUserFavorites(this.props.user.user_id)
      .then(results => {
        this.setState({
          businesses: results.map(element => {
            element = element.assets[0];
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
              delivery_time: "10 - 20 mins",
              is_open: true,
              free_delivery: true
            };
          }),
          load: true
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          load: true,
          businesses: []
        });
      });
  };
  filter(data, critere) {
    return data.filter(
      i =>
        JSON.stringify(i)
          .toLocaleLowerCase()
          .indexOf(critere.toLocaleLowerCase()) != -1
    );
  }
  render() {
    const { businesses, load, searchText, refreshing } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ zIndex: 0, marginTop: refreshing == true ? 70 : 0 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}
          >
            {businesses.length == 0 && load == false ? (
              <ActivityIndicator style={{ marginTop: 200 }} />
            ) : null}
            {this.filter(businesses, searchText).length == 0 && load == true ? (
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
                flex: 1,
                paddingVertical: 10,
                alignSelf:
                  this.filter(businesses, searchText).length > 1
                    ? "center"
                    : "flex-start",
                marginLeft:
                  this.filter(businesses, searchText).length > 1 ? 0 : 11
              }}
              showsVerticalScrollIndicator={false}
              data={this.filter(businesses, searchText)}
              numColumns={2}
              keyExtractor={item => JSON.stringify(item)}
              renderItem={({ item }) => (
                <TouchableHighlight
                  style={{ borderRadius: 10 }}
                  underlayColor={"#f9f9f9"}
                  onPress={() => {
                    this.props.navigation.navigate("Shop", {
                      business: item
                    });
                  }}
                >
                  <CardItem
                    image={item.image}
                    logo={{ uri: item.logo }}
                    backgroundColor="#596b9f"
                    height_={220}
                    title={
                      item.name.length <= 20
                        ? item.name
                        : item.name.substring(0, 20) + "..."
                    }
                    subTitle={item.subTitle}
                    isOpen={item.is_open}
                  />
                </TouchableHighlight>
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
export default connect(mapStateToProps, {})(Favorites);
