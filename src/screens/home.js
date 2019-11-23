import React, { Component } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  View,
  FlatList,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../utils/colors";
import _ from "lodash";
import {
  screenWidth,
  STATUS_BAR_HEIGHT,
  scaleIndice
} from "../utils/variables";
import { Subscribe } from "unstated";
import { CardItem } from "../components";
import { getAll } from "../services";
import { AsyncStorage } from "react-native";
import { StateContainer } from "../utils/stateContainer";
const mystates = new StateContainer();
export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      bags: []
    };
  }

  componentWillMount() {
    console.log(_.groupBy(mystates.state.items, item => item.name));
  }

  componentDidMount() {
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
  componentWillUnmount() {
    this.setState({ businesses: [] });
  }
  render() {
    const { businesses, bags } = this.state;
    return (
      <Subscribe to={[StateContainer]}>
        {container => {
          return (
            <View style={{ flex: 1 }}>
              <StatusBar backgroundColor="#fff" barStyle="dark-content" />

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ zIndex: 0 }}
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
                  {"Discover new" + container.getItems().length}
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
                  {businesses.length == 0
                    ? <ActivityIndicator style={{ marginTop: 200 }} />
                    : null}

                  <FlatList
                    style={{
                      flex: 1,
                      paddingVertical: 10
                    }}
                    showsVerticalScrollIndicator={false}
                    data={businesses}
                    numColumns={2}
                    keyExtractor={item => JSON.stringify(item)}
                    renderItem={({ item }) =>
                      <TouchableHighlight
                        style={{ borderRadius: 10 }}
                        underlayColor={"#f9f9f9"}
                        onPress={() => {
                          //alert(container.getItems().length);
                          this.props.navigation.navigate("Shop", {
                            business: item
                          });
                        }}
                      >
                        <CardItem
                          image={item.image}
                          logo={{ uri: item.logo }}
                          backgroundColor="#596b9f"
                          title={
                            item.name.length <= 20
                              ? item.name
                              : item.name.substring(0, 20) + "..."
                          }
                          showDelivery
                          subTitle={item.subTitle}
                          deliveryTime={item.delivery_time}
                          isOpen={item.is_open}
                        />
                      </TouchableHighlight>}
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
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Maps");
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
                  <FontAwesome
                    name="map-marker"
                    size={moderateScale(17, scaleIndice)}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </Subscribe>
    );
  }
}
