import React from "react";
import {
  View,
  AsyncStorage,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../utils/colors";
import { scaleIndice, hp, wp } from "../utils/variables";
import {
  Stitch,
  UserPasswordCredential,
  UserPasswordAuthProviderClient
} from "mongodb-stitch-react-native-sdk";

const PADDINGLEFT = Platform.OS === "ios" ? 0 : 5;

export default class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      password: "",
      selected: this.props.navigation.getParam("selected", 0),
      currentUserId: undefined,
      client: undefined,
      authenticating: false
    };

    this._authClient = this._authClient.bind(this);
    this._onPressLogin = this._onPressLogin.bind(this);
    this._onPressRegister = this._onPressRegister.bind(this);
  }

  componentWillMount() {
    this._authClient();
  }

  componentDidMount() {}

  _authClient() {
    const client = Stitch.defaultAppClient;
    this.setState({ client });
    //alert(client.auth.activeUserAuthInfo.loggedInProviderType);
    if (
      Stitch.defaultAppClient.auth.activeUserAuthInfo &&
      Stitch.defaultAppClient.auth.activeUserAuthInfo.userId != undefined
    ) {
      this.setState(
        {
          currentUserId: client.auth.user.id
        },
        () => this.props.navigation.navigate("Main")
      );
    }
  }

  _onPressLogin(credential) {
    this.state.client.auth
      .loginWithCredential(credential)
      .then(user => {
        // Switch active user to to user1

        this.setState({ currentUserId: user.id, authenticating: false }, () => {
          this.props.navigation.navigate("Main");
          let activeUser = this.state.client.auth.switchToUserWithId(user.id);
          console.log("active user is user1" + activeUser.id === user.id);
        });
      })
      .catch(err => {
        console.log(`Failed to log in anonymously: ${err}`);
        this.setState({ currentUserId: undefined });
      });
  }

  _onPressRegister(emailPasswordClient, email, password) {
    emailPasswordClient
      .registerWithEmail(email, password)
      .then(() => {
        Alert.alert(
          "Registration",
          "Successfully sent account confirmation email!"
        );
        console.log("Successfully sent account confirmation email!");
      })
      .catch(err => {
        Alert.alert("Registration", "Error registering new user");
        console.error("Error registering new user:", err);
      });
  }

  render() {
    const { selected, fullname, email, password, authenticating } = this.state;
    const height = moderateScale(500, scaleIndice);

    let loginStatus = "Currently logged out.";

    if (this.state.currentUserId) {
      loginStatus = `Currently logged in as ${this.state.currentUserId}!`;
    }

    return (
      <View
        style={{
          backgroundColor: "#ffffff",

          flex: 1
        }}
      >
        <Image
          source={require("../images/logo2.png")}
          style={{
            height: hp("8%"),
            width: hp("8%"),
            alignSelf: "center",
            marginTop: hp("5%")
          }}
        />
        <View style={{ marginTop: hp("3%"), marginBottom: 20 }}>
          <FlatList
            data={["Sign in", "Sign up"]}
            style={{
              marginVertical: 10,

              alignSelf: "center"
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={item => JSON.stringify(item)}
            renderItem={({ item, index }) =>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 130
                }}
                onPress={() => this.setState({ selected: index })}
              >
                <Text
                  style={{
                    fontSize: hp("2.3%"),
                    marginHorizontal: wp("6%"),
                    color: selected === index ? colors.blue : colors.grey,
                    fontWeight: "bold"
                  }}
                >
                  {item}
                </Text>
                {selected === index
                  ? <View
                      style={{
                        height: hp("1.0%"),
                        width: hp("1.0%"),
                        borderRadius: hp("0.8%"),
                        backgroundColor: colors.blue
                      }}
                    />
                  : <View
                      style={{
                        height: hp("1.6%")
                      }}
                    />}
              </TouchableOpacity>}
          />
        </View>
        <View
          style={{
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 0,
            height
          }}
        >
          <Text
            style={{
              textAlign: "left",
              alignSelf: "flex-start",
              marginLeft: 25,

              color: "#000",
              fontWeight: "bold",
              fontSize: hp("2.5%"),
              marginVertical: moderateScale(20, scaleIndice),
              width: wp("70%")
            }}
          >
            {"Log in to your account to shop faster."}
          </Text>

          {selected === 0
            ? <View
                style={{
                  width: wp("90%"),
                  alignSelf: "center",
                  height: hp("20%"),
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  shadowColor: "#000000",
                  shadowOpacity: 0.15,
                  elevation: 2,
                  shadowRadius: 6,
                  shadowOffset: {
                    height: 2,
                    width: 0
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D8D8D8",
                    paddingLeft: 30,
                    paddingTop: 20
                  }}
                >
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 14,
                      paddingLeft: PADDINGLEFT
                    }}
                  >
                    {"Email"}
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType="go"
                    autoCapitalize="none"
                    placeholder="exemple@gmail.com"
                    value={email}
                    onChangeText={text => {
                      this.setState({
                        email: text
                      });
                    }}
                    style={{
                      width: "100%",
                      fontSize: 15,
                      paddingVertical: 7
                    }}
                  />
                  <Icon
                    name="ios-checkmark"
                    color={colors.yellow}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 30,
                      fontSize: 40,
                      marginLeft: 20
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    paddingLeft: 30,
                    paddingTop: 20
                  }}
                >
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 14,
                      paddingLeft: PADDINGLEFT
                    }}
                  >
                    {"Password"}
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    secureTextEntry
                    returnKeyType="go"
                    keyboardType="default"
                    placeholder="****************"
                    value={password}
                    onChangeText={text => {
                      this.setState({
                        password: text
                      });
                    }}
                    style={{
                      width: "90%",
                      fontSize: 15,
                      paddingVertical: 7
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 30
                    }}
                    onPress={() => {
                      this.setState({ selected: 2 });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp("2%"),
                        color: colors.grey
                      }}
                    >
                      {"Forgot?"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            : null}
          {selected === 1
            ? <View
                style={{
                  width: wp("90%"),
                  alignSelf: "center",
                  height: hp("25%"),
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  shadowColor: "#000000",
                  shadowOpacity: 0.15,
                  elevation: 2,
                  shadowRadius: 6,
                  shadowOffset: {
                    height: 2,
                    width: 0
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D8D8D8",
                    paddingHorizontal: 30,
                    paddingVertical: 10
                  }}
                >
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 14,
                      paddingLeft: PADDINGLEFT
                    }}
                  >
                    {"Full Name"}
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType="go"
                    value={fullname}
                    onChangeText={text => {
                      this.setState({
                        fullname: text
                      });
                    }}
                    placeholder="John Bob"
                    style={{
                      width: "100%",
                      fontSize: 15,
                      paddingVertical: 7
                    }}
                  />
                  <Icon
                    name="ios-checkmark"
                    color={colors.yellow}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 10,
                      fontSize: 40,
                      marginLeft: 20
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D8D8D8",
                    paddingHorizontal: 30,
                    paddingVertical: 10
                  }}
                >
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 14,
                      paddingLeft: PADDINGLEFT
                    }}
                  >
                    {"Email"}
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType="go"
                    autoCapitalize="none"
                    placeholder="exemple@gmail.com"
                    value={email}
                    onChangeText={text => {
                      this.setState({
                        email: text
                      });
                    }}
                    style={{
                      width: "100%",
                      fontSize: 15,
                      paddingVertical: 7
                    }}
                  />
                  <Icon
                    name="ios-checkmark"
                    color={colors.yellow}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 10,
                      fontSize: 40,
                      marginLeft: 20
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    borderBottomColor: "#D8D8D8",
                    paddingHorizontal: 30,
                    paddingVertical: 10
                  }}
                >
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 14,
                      paddingLeft: PADDINGLEFT
                    }}
                  >
                    {"Password"}
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    secureTextEntry
                    returnKeyType="go"
                    keyboardType="default"
                    placeholder="****************"
                    value={password}
                    onChangeText={text => {
                      this.setState({
                        password: text
                      });
                    }}
                    style={{
                      width: "100%",
                      fontSize: 15,
                      paddingVertical: 7
                    }}
                  />
                  <Icon
                    name="ios-checkmark"
                    color={colors.yellow}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 10,
                      fontSize: 40,
                      marginLeft: 20
                    }}
                  />
                </View>
              </View>
            : null}
          {selected === 2
            ? <View
                style={{
                  width: wp("90%"),
                  alignSelf: "center",
                  height: hp("13%"),
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  shadowColor: "#000000",
                  shadowOpacity: 0.15,
                  elevation: 2,
                  shadowRadius: 6,
                  shadowOffset: {
                    height: 2,
                    width: 0
                  }
                }}
              >
                <View
                  style={{
                    flex: 1,

                    paddingLeft: 30,
                    paddingRight: 10,
                    paddingTop: 20
                  }}
                >
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 14,
                      paddingLeft: PADDINGLEFT
                    }}
                  >
                    {"Email"}
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType="go"
                    autoCapitalize="none"
                    placeholder="exemple@gmail.com"
                    value={email}
                    onChangeText={text => {
                      this.setState({
                        email: text
                      });
                    }}
                    style={{
                      width: "100%",
                      fontSize: 15,
                      paddingVertical: 7,
                      borderBottomWidth: 0,
                      borderBottomColor: "#D8D8D8"
                    }}
                  />
                  <Icon
                    name="ios-checkmark"
                    color={colors.yellow}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: 30,
                      fontSize: 40,
                      marginLeft: 20
                    }}
                  />
                </View>
              </View>
            : null}
          {authenticating == true
            ? <ActivityIndicator
                style={{ alignSelf: "center", marginTop: 10 }}
              />
            : null}
          <TouchableOpacity
            style={{
              height: 53,
              width: 305,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.blue,
              borderRadius: 26.52,
              alignSelf: "center",
              marginTop: 30,
              marginVertical: 5
            }}
            onPress={() => {
              //this.props.navigation.navigate("Main");
              if (selected === 1) {
                const emailPasswordClient = Stitch.defaultAppClient.auth.getProviderClient(
                  UserPasswordAuthProviderClient.factory
                );
                this._onPressRegister(emailPasswordClient, email, password);
              } else {
                const credential = new UserPasswordCredential(email, password);
                this.setState({ authenticating: true }, () => {
                  this._onPressLogin(credential);
                });
              }
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: colors.white
              }}
            >
              {selected === 0 ? "Sign in" : "Sign up"}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 53,
              width: 305,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              borderRadius: 26.52,
              alignSelf: "center",
              marginVertical: 5
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: colors.back
              }}
            >
              {"Or sign in with"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 60,
              width: 146,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.white,
              borderRadius: 26.52,
              alignSelf: "center",
              marginTop: 0,
              marginVertical: 10,
              shadowColor: "#000000",
              shadowOpacity: 0.15,
              elevation: 2,
              shadowRadius: 6,
              shadowOffset: {
                height: 2,
                width: 0
              }
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#3C5999"
              }}
            >
              {"facebook"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
