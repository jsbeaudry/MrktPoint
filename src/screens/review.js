import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
class Review extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Review",
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
    this.state = { selectedRate: 1 };
  }

  render() {
    return (
      <View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}> review </Text>
        <View
          style={{
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            elevation: 1,
            shadowRadius: 3,
            shadowOffset: {
              height: 0,
              width: 0
            },
            margin: 10,
            borderRadius: 5
          }}
        >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Image
              source={{
                uri:
                  "https://theblogimages.adobe.com/wp-content/uploads/2019/11/avatar_user_113857_1574442076-300x300.jpeg"
              }}
              style={{ height: 60, width: 60, borderRadius: 10 }}
            />
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginVertical: 2 }}
              >
                Smith MikeSon
              </Text>
              <Text style={{ fontSize: 14, color: "grey" }}>
                Port-au-Prnice
              </Text>
            </View>
            <Point
              style={{
                backgroundColor: "#0C4767",
                alignSelf: "center",
                position: "absolute",
                right: 10
              }}
              count={5}
            />
          </View>
          <Text style={{ fontSize: 14, padding: 10, color: "grey" }}>
            {
              " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            }
          </Text>
        </View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}> Your rating </Text>
        <View style={{ flexDirection: "row", padding: 10 }}>
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
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item }) =>
              <Point
                style={{
                  backgroundColor:
                    this.state.selectedRate == 1 ? "#0C4767" : "#bbb",
                  margin: 4
                }}
                count={item}
                onPressIt={count => this.setState({ selectedRate: count })}
              />}
          />
        </View>
        <Text style={{ fontSize: 14, color: "grey" }}>
          {"We would love to hear more about your experience!"}
        </Text>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const { user } = state.user;
  return { user };
};
export default connect(mapStateToProps, {})(Review);

const Point = ({ style, count, onPressIt }) =>
  <TouchableOpacity
    onPress={() => {
      onPressIt(count);
    }}
    style={[
      {
        height: 30,
        width: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      },
      style
    ]}
  >
    <Text style={{ fontSize: 16, color: "#fff", marginRight: 4 }}>
      {count || 0}
    </Text>
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "#fff"
      }}
    />
  </TouchableOpacity>;
