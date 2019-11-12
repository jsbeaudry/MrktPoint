import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView,
  DatePickerIOS,
  DatePickerAndroid
} from "react-native";
import { screenHeight } from "../utils/variables";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { colors } from "../utils/colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { bold } from "ansi-colors";
class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Card Details",
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
      birthdate: new Date(),
      showDate: false,
      image: null,
      fullname: "",
      email: "",
      phone: "",
      gender: ""
    };

    this.setDate = this.setDate.bind(this);
  }
  componentWillMount() {
    this.getPermissionAsync();
  }

  showDate = () => {
    this.setState({ showDate: !this.state.showDate });
  };

  setDate(newDate) {
    this.setState({ birthdate: newDate });
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  dateAdroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };
  render() {
    const {
      showDate,
      image,
      fullname,
      email,
      phone,
      gender,
      birthdate
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 100 }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <KeyboardAvoidingView style={{}} behavior="padding" enabled>
          <View
            style={{
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              elevation: 1,
              shadowRadius: 7,
              shadowOffset: {
                height: 1,
                width: 0
              },
              margin: 20,
              borderRadius: 5
            }}
          >
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                marginTop: -75,
                shadowColor: "#777",
                shadowOpacity: 0.14,
                elevation: 1,
                shadowRadius: 7,
                shadowOffset: {
                  height: 1,
                  width: 0
                }
              }}
            >
              <Image
                source={{
                  uri: image
                    ? image
                    : "https://www.leisureopportunities.co.uk/images/995586_746594.jpg"
                }}
                borderRadius={142 / 2}
                style={{
                  width: 142,
                  height: 142,
                  alignSelf: "center"
                }}
              />
              <TouchableOpacity
                onPress={this._pickImage}
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: colors.blueDark,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name={"ios-camera"} size={30} color="#fff" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 40,
                marginVertical: 10,
                marginHorizontal: 20,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8",
                paddingBottom: 15
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: "#D8D8D8",
                  fontSize: 16
                }}
              >
                {"Full name"}
              </Text>
              <TextInput
                autoCorrect={false}
                returnKeyType={"done"}
                placeholder={""}
                value={fullname}
                onChangeText={text => {
                  this.setState({
                    fullname: text
                  });
                }}
                style={{
                  flex: 3,
                  fontSize: 16,
                  width: "100%",
                  position: "absolute",
                  paddingLeft: 100,
                  color: colors.blueDark,
                  fontWeight: "500",
                  bottom: 10,
                  right: 0,
                  textAlign: "right"
                }}
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8",
                paddingBottom: 15
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: "#D8D8D8",
                  fontSize: 16
                }}
              >
                {"Email"}
              </Text>
              <TextInput
                autoCorrect={false}
                returnKeyType={"done"}
                placeholder={""}
                value={email}
                onChangeText={text => {
                  this.setState({
                    email: text
                  });
                }}
                style={{
                  flex: 3,
                  fontSize: 16,
                  width: "100%",
                  position: "absolute",
                  paddingLeft: 100,
                  color: colors.blueDark,
                  fontWeight: "500",
                  bottom: 10,
                  right: 0,
                  textAlign: "right"
                }}
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8",
                paddingBottom: 15
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: "#D8D8D8",
                  fontSize: 16
                }}
              >
                {"Phone"}
              </Text>
              <TextInput
                autoCorrect={false}
                returnKeyType={"done"}
                placeholder={""}
                value={phone}
                onChangeText={text => {
                  this.setState({
                    phone: text
                  });
                }}
                style={{
                  flex: 3,
                  fontSize: 16,
                  width: "100%",
                  color: colors.blueDark,
                  fontWeight: "500",
                  position: "absolute",
                  paddingLeft: 100,
                  bottom: 10,
                  right: 0,
                  textAlign: "right"
                }}
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8",
                paddingBottom: 15
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: "#D8D8D8",
                  fontSize: 16
                }}
              >
                {"Gender"}
              </Text>
              <TextInput
                autoCorrect={false}
                returnKeyType={"done"}
                placeholder={""}
                value={gender}
                onChangeText={text => {
                  this.setState({
                    gender: text
                  });
                }}
                style={{
                  flex: 3,
                  fontSize: 16,
                  color: colors.blueDark,
                  fontWeight: "500",
                  width: "100%",
                  position: "absolute",
                  paddingLeft: 100,
                  bottom: 10,
                  right: 0,
                  textAlign: "right"
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.showDate()}
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                flexDirection: "row",
                borderBottomWidth: 0,
                borderBottomColor: "#D8D8D8",
                paddingBottom: 15
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: "#D8D8D8",
                  fontSize: 16
                }}
              >
                {"Birth date"}
              </Text>

              <Text
                style={{
                  flex: 3,
                  fontSize: 16,
                  color: colors.blueDark,
                  fontWeight: "500",
                  width: "100%",
                  position: "absolute",
                  paddingLeft: 100,
                  bottom: 10,
                  right: 0,
                  textAlign: "right"
                }}
              >
                {birthdate.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {showDate ? (
          <View style={{ height: 200, marginBottom: 100 }}>
            <TouchableOpacity
              style={{
                height: 20,
                alignSelf: "flex-end"
              }}
              onPress={() => this.showDate()}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: colors.blueDark,
                  marginRight: 20
                }}
              >
                Done
              </Text>
            </TouchableOpacity>

            <DatePickerIOS
              mode={"date"}
              date={this.state.birthdate}
              onDateChange={this.setDate}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default AddCard;
