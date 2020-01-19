import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../utils/colors";
import MapView from "react-native-maps";
export default class shopInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Info",
      gesturesEnabled: false,
      headerLeft: (
        <TouchableOpacity
          style={{
            flex: 20,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingHorizontal: 15
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
            iconStyle={{ padding: 15 }}
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
    state = {
      business: []
    };
    //console.log(this.props.navigation.getParam("business", {}));
  }
  componentWillMount() {
    this.setState({ business: this.props.navigation.getParam("business", {}) });
  }
  render() {
    return (
      <View>
        <MapView style={{ height: 200, width: "100%" }}>
          <MapView.Marker
            coordinate={{
              latitude: 45.524548,
              longitude: -122.6749817
            }}
          />
        </MapView>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginHorizontal: 20,
            marginVertical: 10
          }}
        >
          Info
        </Text>

        <View
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <FontAwesome name="map-marker" size={30} color="#0C4767" />
          <Text
            style={{
              color: "#7A7F83",
              fontSize: 14,
              marginLeft: 10
            }}
          >
            {this.state.business && this.state.business.address
              ? this.state.business.address
              : ""}
          </Text>
        </View>

        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Icon name="ios-time" type="ionicon" color="#0C4767" size={25} />
          <View>
            <Text
              style={{
                color: "#7A7F83",
                fontWeight: "500",
                fontSize: 14,
                marginLeft: 10,
                marginTop: 10
              }}
            >
              {`Monday - Trusday`}
            </Text>
            <Text
              style={{
                color: "#7A7F83",
                fontWeight: "500",
                fontSize: 14,
                marginLeft: 10,
                marginTop: 10
              }}
            >
              {`08h am - 10h pm`}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Icon name="ios-time" type="ionicon" color="#fff" size={25} />
          <View>
            <Text
              style={{
                color: "#7A7F83",
                fontWeight: "500",
                fontSize: 14,
                marginLeft: 10
              }}
            >
              {`Friday - Sunday `}
            </Text>
            <Text
              style={{
                color: "#7A7F83",
                fontWeight: "500",
                fontSize: 14,
                marginLeft: 10,
                marginTop: 10
              }}
            >
              {`08h am - 10h pm`}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
