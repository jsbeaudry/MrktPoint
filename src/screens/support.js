import React from "react";
import {
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  View,
  TextInput,
  Text,
  Animated,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Feather from "react-native-vector-icons/Feather";
import { colors } from "../utils/colors";
import { screenHeight } from "../utils/variables";
import { SafeAreaView } from "react-navigation";
const MARGIN_HEIGHT_BIG = 220;
const MARGIN_HEIGHT_SMALL = 0;
class Support extends React.Component {
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
    this.state = {};
    this.marginHeight = new Animated.Value(MARGIN_HEIGHT_SMALL);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    Animated.timing(this.marginHeight, {
      duration: event.duration,
      toValue: MARGIN_HEIGHT_BIG
    }).start();
  };

  keyboardWillHide = event => {
    Animated.timing(this.marginHeight, {
      duration: event.duration,
      toValue: MARGIN_HEIGHT_SMALL
    }).start();
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView style={{}}>
          <Animated.View
            style={{
              height: screenHeight - 150,
              justifyContent: "flex-end",
              paddingBottom: this.marginHeight
            }}
          >
            <View
              style={{
                marginRight: 80,
                marginLeft: 20,
                alignSelf: "flex-start"
              }}
            >
              <View
                style={{
                  backgroundColor: "#E6E6E6",
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  borderBottomLeftRadius: 15
                }}
              >
                <Text
                  style={{
                    padding: 10,
                    fontSize: 13,
                    lineHeight: 17,
                    fontWeight: "400",
                    color: "#404040"
                  }}
                >
                  Hi Edddric. How can I help you? dhja hdgjashjh gjdgjasgdsa
                  gjhgjdgas ghgsd ashdashj hjkas dhjaskd jhk AHKJSKAHD SKAHDUAS
                  DIS AKH hd jsajgdj asgygjs dhasg hghjas saj g
                </Text>
              </View>
              <Text
                style={{
                  paddingTop: 6,
                  color: colors.grey,
                  fontWeight: "bold"
                }}
              >
                12:00
              </Text>
            </View>

            <View
              style={{ marginRight: 20, marginLeft: 80, alignSelf: "flex-end" }}
            >
              <View
                style={{
                  backgroundColor: colors.blue,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 15
                }}
              >
                <Text
                  style={{
                    padding: 10,
                    fontSize: 13,
                    fontWeight: "400",
                    lineHeight: 17,
                    color: colors.white
                  }}
                >
                  Hi Edddric. How can I help you? dhja hdgjashjh gjdgjasgdsa
                  gjhgjdgas ghgsd ashdashj hjkas dhjaskd jhk AHKJSKAHD SKAHDUAS
                  DIS AKH hd jsajgdj asgygjs dhasg hghjas saj g
                </Text>
              </View>
              <Text
                style={{
                  paddingVertical: 6,
                  color: colors.grey,
                  fontWeight: "bold",
                  alignSelf: "flex-end"
                }}
              >
                12:00
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
        <Animated.View
          style={{
            height: 70,
            flexDirection: "row",
            alignItems: "center",
            borderTopColor: "#eee",
            borderTopWidth: 1,
            marginBottom: this.marginHeight
          }}
        >
          <TouchableOpacity>
            <Feather
              name="plus"
              type="Feather"
              style={{ padding: 10 }}
              size={40}
              color={"#B8B7B7"}
            />
          </TouchableOpacity>
          <TextInput
            autoCorrect={false}
            placeholder={"Write something here …"}
            numberOfLines={3}
            value={this.state.text}
            onChangeText={text => {
              this.setState({
                text: text
              });
            }}
            style={{
              flex: 1,
              height: 60,
              fontSize: 16,
              color: colors.blueDark,
              fontWeight: "500",
              borderColor: "#eee",
              borderWidth: 0
            }}
          />
          <TouchableOpacity>
            <Feather
              name="send"
              type="Feather"
              style={{ padding: 10 }}
              size={30}
              color={"#B8B7B7"}
            />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

export default Support;
