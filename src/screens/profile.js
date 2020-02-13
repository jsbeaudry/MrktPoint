import React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
  View
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../utils/colors";
import { Icon } from "../utils/icons";
import {
  STATUS_BAR_HEIGHT,
  scaleIndice,
  screenWidth
} from "../utils/variables";
import { Ionicons } from "@expo/vector-icons";
import { Stitch } from "mongodb-stitch-react-native-sdk";
import { getOne } from "../services";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/user";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        user: {},
        firstName: "John Melville",
        lastName: "Bob",
        image:
          "https://www.leisureopportunities.co.uk/images/995586_746594.jpg",
        email: "jb@gmail.com",
        seller: false,
        client: null
      }
    };
    this._loadClient = this._loadClient.bind(this);
    this._onPressLogout = this._onPressLogout.bind(this);
  }

  _onPressLogout() {
    Stitch.defaultAppClient.auth
      .logout()
      .then(user => {
        console.log(`Successfully logged out`);
        this.setState({ currentUserId: undefined }, () =>
          this.props.navigation.navigate("Signin")
        );
      })
      .catch(err => {
        console.log(`Failed to log out: ${err}`);
        this.setState({ currentUserId: undefined });
      });
  }
  _loadClient() {
    const client = Stitch.defaultAppClient;
    this.setState({ client });

    if (client.auth.isLoggedIn) {
      this.setState(
        {
          currentUserId: client.auth.user.id
        }
      );
    }
  }

  componentWillMount() {
    this._loadClient();
    this.props.setUser();
  }
  render() {
    // this.props.navigation.addListener("didFocus", payload => {
    //   //console.debug("didFocus", payload);
    //   //this.load("user");
    // });
    const { user } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <View
          style={{ height: 70, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: "#000",
              alignSelf: "center",
              paddingTop: STATUS_BAR_HEIGHT,
              opacity: 1,
              fontSize: moderateScale(16, scaleIndice),
              fontWeight: "600"
            }}
          >
            {"Profile"}
          </Text>
        </View>
        <View
          style={{
            width: screenWidth - 30,

            marginTop: 50,
            height: 120,
            elevation: 1,
            zIndex: 888,
            backgroundColor: "#fff",
            alignSelf: "center",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            shadowOffset: {
              height: 2,
              width: 0
            }
          }}
        >
          <Image
            source={{
              uri: user.image
                ? `data:image/jpg;base64,${user.image.base64}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3aZcSyIAkT_7lCPpE8Ruc5k9Kk-yXYQdFHfjD1QbM1VZQLyod&s"
            }}
            borderRadius={40}
            style={{
              marginTop: -40,
              height: 80,
              width: 80,
              marginBottom: 10,
              alignSelf: "center"
            }}
          />

          <View
            style={{
              flex: 1,
              alignSelf: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                letterSpacing: 0.32,
                fontWeight: "600",
                textAlign: "center"
              }}
            >
              {user.firstName ? user.firstName + " " + user.lastName : "..."}
            </Text>
            <View style={styles.tagBlock}>
              <Text style={styles.tagText}>
                {user.seller ? "Buyer" : "Seller"}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={{ paddingTop: 10 }}>
          {[
            { title: "Favorites", icon: "shop", goTo: "FavoritesStore" },
            { title: "Wish List", icon: "shopping", goTo: "WishList" },
            { title: "Edit Profile", icon: "user", goTo: "EditProfile" },
            { title: "My orders", icon: "bag", goTo: "Orders" },
            {
              title: "My address",
              icon: "home",
              goTo: "AddressList",
              margin: 50
            }
            // {
            //   title: "Payment method",
            //   icon: "Icon",
            //   goTo: "CardList",
            //   margin: 50
            // }
          ].map(item => (
            <TouchableOpacity
              key={JSON.stringify(item)}
              onPress={() => {
                this.props.navigation.navigate(item.goTo);
              }}
              style={{
                alignItems: "center",
                backgroundColor: "transparent",
                marginLeft: 20,
                marginBottom: item.margin ? item.margin : 20
              }}
            >
              <View
                style={{
                  height: 40,

                  flexDirection: "row",
                  justifyContent: "flex-start"
                }}
              >
                <View
                  style={{
                    height: 36,
                    flex: 10,
                    marginRight: 10,
                    backgroundColor: colors.blue,
                    alignSelf: "center",
                    borderRadius: 18,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon name={item.icon} size={20} color="#fff" />
                </View>
                <Text
                  style={{ alignSelf: "center", fontWeight: "500", flex: 80 }}
                >
                  {item.title}
                </Text>
                <Feather
                  name="chevron-right"
                  type="Feather"
                  style={{ flex: 11, alignSelf: "center" }}
                  size={25}
                  color="#aaa"
                />
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Settings");
            }}
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
              marginLeft: 20,
              marginBottom: 20
            }}
          >
            <View
              style={{
                height: 40,

                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <View
                style={{
                  height: 36,
                  flex: 10,
                  marginRight: 10,
                  backgroundColor: colors.blue,
                  alignSelf: "center",
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name={"settings"} size={20} color="#fff" />
              </View>
              <Text
                style={{ alignSelf: "center", fontWeight: "500", flex: 80 }}
              >
                {"Settings"}
              </Text>
              <Feather
                name="chevron-right"
                type="Feather"
                style={{ flex: 11, alignSelf: "center" }}
                size={25}
                color="#aaa"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("");
            }}
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
              marginLeft: 20,
              marginBottom: 20
            }}
          >
            <View
              style={{
                height: 40,

                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <View
                style={{
                  height: 35,
                  flex: 10,
                  marginRight: 10,
                  alignSelf: "center",
                  borderRadius: 17,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={require("../images/logo2.png")}
                  style={{ height: 40, width: 40 }}
                />
              </View>
              <Text
                style={{ alignSelf: "center", fontWeight: "500", flex: 80 }}
              >
                {"About MRKT"}
              </Text>
              <Feather
                name="chevron-right"
                type="Feather"
                style={{ flex: 11, alignSelf: "center" }}
                size={25}
                color="#aaa"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("settings");
            }}
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
              marginLeft: 20,
              marginBottom: 20
            }}
          >
            <View
              style={{
                height: 40,

                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <View
                style={{
                  height: 36,
                  flex: 10,
                  marginRight: 10,
                  backgroundColor: "#2E294E",
                  alignSelf: "center",
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Feather name={"help-circle"} size={20} color="#fff" />
              </View>
              <Text
                style={{ alignSelf: "center", fontWeight: "500", flex: 80 }}
              >
                {"Help & FAQ"}
              </Text>
              <Feather
                name="chevron-right"
                type="Feather"
                style={{ flex: 11, alignSelf: "center" }}
                size={25}
                color="#aaa"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("settings");
            }}
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
              marginLeft: 20,
              marginBottom: 20
            }}
          >
            <View
              style={{
                height: 40,

                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <View
                style={{
                  height: 36,
                  flex: 10,
                  marginRight: 10,
                  backgroundColor: "#4FE7AF",
                  alignSelf: "center",
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Feather name={"share"} size={20} color="#fff" />
              </View>
              <Text
                style={{ alignSelf: "center", fontWeight: "500", flex: 80 }}
              >
                {"Refer Friend & Family"}
              </Text>
              <Feather
                name="chevron-right"
                type="Feather"
                style={{ flex: 11, alignSelf: "center" }}
                size={25}
                color="#aaa"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Support");
            }}
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
              marginLeft: 20,
              marginBottom: 20
            }}
          >
            <View
              style={{
                height: 40,

                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <View
                style={{
                  height: 36,
                  flex: 10,
                  marginRight: 10,
                  backgroundColor: colors.blue,
                  alignSelf: "center",
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Feather name={"headphones"} size={20} color="#fff" />
              </View>
              <Text
                style={{ alignSelf: "center", fontWeight: "500", flex: 80 }}
              >
                {"Support"}
              </Text>
              <Feather
                name="chevron-right"
                type="Feather"
                style={{ flex: 11, alignSelf: "center" }}
                size={25}
                color="#aaa"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this._onPressLogout();
            }}
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
              marginLeft: 20,
              marginBottom: 20
            }}
          >
            <View
              style={{
                height: 40,

                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <View
                style={{
                  height: 36,
                  flex: 10,
                  marginRight: 10,
                  backgroundColor: colors.blue,
                  alignSelf: "center",
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Ionicons name={"ios-log-out"} size={20} color="#fff" />
              </View>
              <Text
                style={{ alignSelf: "center", fontWeight: "500", flex: 80 }}
              >
                {"Log out"}
              </Text>
              <Feather
                name="chevron-right"
                type="Feather"
                style={{ flex: 11, alignSelf: "center" }}
                size={25}
                color="#aaa"
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.user;
  return { user };
};

export default connect(mapStateToProps, { setUser })(Profile);

const styles = StyleSheet.create({
  tagBlock: {
    width: moderateScale(75, scaleIndice),
    height: moderateScale(17, scaleIndice),
    borderRadius: 20,
    marginRight: moderateScale(3, scaleIndice),
    marginTop: moderateScale(5, scaleIndice),
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center"
  },
  tagText: {
    color: colors.blue,
    fontSize: moderateScale(8, scaleIndice),
    fontWeight: "800",
    letterSpacing: 0.16
  }
});
