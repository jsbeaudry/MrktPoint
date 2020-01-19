import React, { Component } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import { FontAwesome, Ionicons } from "react-native-vector-icons";
import { moderateScale } from "react-native-size-matters";
import _ from "lodash";

import {
  screenWidth,
  STATUS_BAR_HEIGHT,
  scaleIndice
} from "../utils/variables";
import { colors } from "../utils/colors";
import { CardItem } from "../components";
import { getAll } from "../services";
const noitem = require("../images/noitem.png");

import { connect } from "react-redux";

class HomeScreen extends Component {
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

  componentWillMount() {
    this.getAllBusiness();
  }

  componentWillUnmount() {
    this.abortController.Abort();
  }

  componentDidMount() {}

  /* -------------------------------------------------------------------------- */
  /*                          Refresh the business list                         */
  /* -------------------------------------------------------------------------- */
  onRefresh = () => {
    this.getAllBusiness();

    this.setState({ refreshing: true });

    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 6000);
  };

  /* -------------------------------------------------------------------------- */
  /*                           Get all valid business                           */
  /* -------------------------------------------------------------------------- */
  getAllBusiness = () => {
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
                address: `${element.address.address1}, ${element.address.city}, ${element.address.state}, ${element.address.country}`,
                subTitle: element.slogan,
                currency: element.currency,
                categories: element.categories ? element.categories : [],
                delivery_time: "10 - 20 mins",
                is_open: true,
                free_delivery: true,
                all: element
              };
            })
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

  /* -------------------------------------------------------------------------- */
  /*                                Search filter                               */
  /* -------------------------------------------------------------------------- */
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

        {/* -------------------------------------------------------------------------- */
        /*                                Search Header                               */
        /* -------------------------------------------------------------------------- */}

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: STATUS_BAR_HEIGHT,
            right: 0,
            zIndex: 999
          }}
        >
          <View style={styles.searchContainer}>
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
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Maps");
            }}
            style={styles.markerButton}
          >
            <FontAwesome
              name="map-marker"
              size={moderateScale(17, scaleIndice)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>

        {/* -------------------------------------------------------------------------- */
        /*                            Scroll view contents                            */
        /* -------------------------------------------------------------------------- */}

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
          <Text
            style={{
              width: moderateScale(200, scaleIndice),
              marginTop: 100,
              marginLeft: moderateScale(10, scaleIndice),
              color: "#000",
              fontWeight: "600",
              fontSize: moderateScale(25, scaleIndice),
              letterSpacing: 0.32,
              alignSelf: "flex-start"
            }}
          >
            {"Discover new"}
          </Text>

          <Text
            style={{
              width: moderateScale(300, scaleIndice),
              color: "#000",
              marginLeft: moderateScale(10, scaleIndice),
              fontSize: moderateScale(25, scaleIndice),
              fontWeight: "600",
              letterSpacing: 0.32,
              alignSelf: "flex-start"
            }}
          >
            {"Shopping experiences"}
          </Text>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}
          >
            {/* -------------------------------------------------------------------------- */
            /*                         Business search is loading                         */
            /* -------------------------------------------------------------------------- */}

            {businesses.length == 0 && load == false ? (
              <ActivityIndicator style={{ marginTop: 200 }} />
            ) : null}

            {/* -------------------------------------------------------------------------- */
            /*                              No business found                             */
            /* -------------------------------------------------------------------------- */}

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

            {/* -------------------------------------------------------------------------- */
            /*                              The business list                             */
            /* -------------------------------------------------------------------------- */}

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
export default connect(mapStateToProps, {})(HomeScreen);

const styles = StyleSheet.create({
  searchContainer: {
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
  },
  markerButton: {
    flex: 9,
    height: moderateScale(33, scaleIndice),
    marginRight: moderateScale(10, scaleIndice),
    backgroundColor: colors.blue,
    alignSelf: "center",
    borderRadius: moderateScale(17, scaleIndice),
    justifyContent: "center",
    alignItems: "center"
  }
});
