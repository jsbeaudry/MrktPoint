import React from "react";
import {
  Platform,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  Switch,
  ScrollView
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { updateUser } from "../services";
import { connect } from "react-redux";

import { setUser } from "../redux/actions/user";
class Settings extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Settings",
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
      promotion: false,
      newItems: false,
      messages: false,
      autoNight: false,
      usingCellular: false,
      autoLock: false
    };
  }

  componentWillMount() {}
  componentDidMount() {
    const { user } = this.props;
    this.setState({
      promotion: user.settings.promotion,
      newItems: user.settings.newItems,
      messages: user.settings.messages,
      autoNight: user.settings.autoNight,
      usingCellular: user.settings.usingCellular,
      autoLock: user.settings.autoLock
    });
  }

  setPromotion = () => {
    this.setState({ promotion: !this.state.promotion }, () => {
      this.setSettings();
    });
  };
  setNewItems = () => {
    this.setState({ newItems: !this.state.newItems }, () => {
      this.setSettings();
    });
  };
  setMessages = () => {
    this.setState({ messages: !this.state.messages }, () => {
      this.setSettings();
    });
  };

  setAutoNight = () => {
    this.setState({ autoNight: !this.state.autoNight }, () => {
      this.setSettings();
    });
  };
  setUsingCellular = () => {
    this.setState({ usingCellular: !this.state.usingCellular }, () => {
      this.setSettings();
    });
  };
  setAutoLock = () => {
    this.setState({ autoLock: !this.state.autoLock }, () => {
      this.setSettings();
    });
  };
  setSettings = () => {
    updateUser(
      "users",
      { user_id: this.props.user.user_id },
      {
        settings: this.state
      }
    )
      .then(results => {
        console.log(results);
        this.props.setUser();
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const {
      promotion,
      newItems,
      messages,
      autoNight,
      usingCellular,
      autoLock
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {this.props.user && this.props.user.settings
          ? <ScrollView>
              <StatusBar backgroundColor="#fff" barStyle="dark-content" />
              <View
                style={{
                  marginTop: 40,
                  marginHorizontal: 40,
                  flexDirection: "row",
                  borderBottomWidth: 0,
                  paddingBottom: 0,
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: colors.blue,
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "bold"
                  }}
                >
                  {"Notifications"}
                </Text>
              </View>
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
                  margin: 20,
                  borderRadius: 5
                }}
              >
                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    borderBottomWidth: 0,
                    borderBottomColor: "#D8D8D8",
                    paddingBottom: 0,
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#1D1D1D",
                      fontSize: 16
                    }}
                  >
                    {"Promotions"}
                  </Text>
                  <Switch
                    onValueChange={() => this.setPromotion()}
                    value={promotion}
                    thumbColor={colors.blueDark}
                  />
                </View>

                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    borderBottomWidth: 0,
                    borderBottomColor: "#D8D8D8",
                    paddingBottom: 0,
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#1D1D1D",
                      fontSize: 16
                    }}
                  >
                    {"New Items"}
                  </Text>
                  <Switch
                    onValueChange={() => this.setNewItems()}
                    value={newItems}
                    thumbColor={colors.blueDark}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    borderBottomWidth: 0,
                    borderBottomColor: "#D8D8D8",
                    paddingBottom: 0,
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#000",
                      fontSize: 16
                    }}
                  >
                    {"Messages"}
                  </Text>
                  <Switch
                    onValueChange={() => this.setMessages()}
                    value={messages}
                    thumbColor={colors.blueDark}
                  />
                </View>
              </View>

              <View
                style={{
                  marginHorizontal: 40,
                  flexDirection: "row",
                  borderBottomWidth: 0,
                  marginTop: 30,
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: colors.blue,
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "bold"
                  }}
                >
                  {"General"}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  shadowColor: "#1D1D1D",
                  shadowOpacity: 0.1,
                  elevation: 1,
                  shadowRadius: 3,
                  shadowOffset: {
                    height: 0,
                    width: 0
                  },
                  margin: 20,
                  borderRadius: 5
                }}
              >
                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    borderBottomWidth: 0,
                    borderBottomColor: "#D8D8D8",
                    paddingBottom: 0,
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#1D1D1D",
                      fontSize: 16
                    }}
                  >
                    {"Auto-Night Mode"}
                  </Text>
                  <Switch
                    onValueChange={() => this.setAutoNight()}
                    value={autoNight}
                    thumbColor={colors.blueDark}
                  />
                </View>

                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    borderBottomWidth: 0,
                    borderBottomColor: "#D8D8D8",
                    paddingBottom: 0,
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#1D1D1D",
                      fontSize: 16
                    }}
                  >
                    {"Using Cellular"}
                  </Text>
                  <Switch
                    onValueChange={() => this.setUsingCellular()}
                    value={usingCellular}
                    thumbColor={colors.blueDark}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    borderBottomWidth: 0,
                    borderBottomColor: "#D8D8D8",
                    paddingBottom: 0,
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#1D1D1D",
                      fontSize: 16
                    }}
                  >
                    {"Auto-Lock"}
                  </Text>
                  <Switch
                    onValueChange={() => this.setAutoLock()}
                    value={autoLock}
                    thumbColor={colors.blueDark}
                  />
                </View>

                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    borderBottomWidth: 0,
                    borderBottomColor: "#D8D8D8",
                    paddingBottom: 0,
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#1D1D1D",
                      fontSize: 16
                    }}
                  >
                    {"Passcode & Face ID"}
                  </Text>
                  <View>
                    <Feather
                      name="chevron-right"
                      type="Feather"
                      style={{}}
                      size={25}
                      color={colors.blue}
                    />
                  </View>
                </View>

                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    borderBottomWidth: 0,
                    borderBottomColor: "#D8D8D8",
                    paddingBottom: 0,
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#1D1D1D",
                      fontSize: 16
                    }}
                  >
                    {"User Agreement"}
                  </Text>
                  <View>
                    <Feather
                      name="chevron-right"
                      type="Feather"
                      style={{}}
                      size={25}
                      color={colors.blue}
                    />
                  </View>
                </View>

                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    borderBottomWidth: 0,
                    borderBottomColor: "#D8D8D8",
                    paddingBottom: 0,
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#1D1D1D",
                      fontSize: 16
                    }}
                  >
                    {"Privacy"}
                  </Text>
                  <View>
                    <Feather
                      name="chevron-right"
                      type="Feather"
                      style={{}}
                      size={25}
                      color={colors.blue}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.user;
  return { user };
};
export default connect(mapStateToProps, { setUser })(Settings);
