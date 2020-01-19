import React from "react";
import {
  Platform,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  View,
  Animated,
  Keyboard
} from "react-native";
import { screenWidth } from "../utils/variables";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { Formik } from "formik";
import * as yup from "yup";
import { updateUser } from "../services/stitch";

import { connect } from "react-redux";
import { addItem, setCarts } from "../redux/actions/bags";
import { setUser } from "../redux/actions/user";
const validationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required()
    .label("Fullname"),
  address1: yup
    .string()
    .required()
    .label("Address"),
  phone: yup
    .string()
    .required()
    .label("Mobile phone"),
  city: yup
    .string()
    .required()
    .label("City")
});

const IMAGE_HEIGHT = 0;
const IMAGE_HEIGHT_SMALL = -90;

class Address extends React.Component {
  // Header
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add New Address",
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
    this.state = {
      backTo: this.props.navigation.getParam("backTo", ""),
      fullname: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "Haiti",
      zipcode: "",
      phone: "",
      email: "",
      selected: "",
      address: []
    };

    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
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
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL
    }).start();
  };

  keyboardWillHide = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT
    }).start();
  };

  render() {
    const { country, backTo } = this.state;
    return (
      <Animated.ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          marginTop: this.imageHeight
        }}
      >
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <Formik
          initialValues={{
            fullname: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: "",
            country: "Haiti",
            phone: "",
            email: ""
          }}
          onSubmit={(values, actions) => {
            if (
              this.props.user.addressShipping.filter(i => i.addNew == true) == 0
            ) {
              this.props.user.addressShipping.push({
                addNew: true
              });
            }
            this.props.user.addressShipping.unshift(values);

            /* -------------------------------------------------------------------------- */
            /*                                 Update user                                */
            /* -------------------------------------------------------------------------- */

            updateUser(
              "users",
              { user_id: this.props.user.user_id },
              { addressShipping: this.props.user.addressShipping }
            )
              .then(() => {
                this.props.setUser();
              })
              .catch(error => {
                console.log(error);
                alert("Has not save, no internet connection");
              });

            setTimeout(() => {
              actions.setSubmitting(false);
              this.props.navigation.push(backTo);
            }, 1000);
          }}
          validationSchema={validationSchema}
        >
          {formikProps => (
            <React.Fragment>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 28,
                  marginLeft: 20,
                  marginTop: 50,
                  fontWeight: "bold"
                }}
              >
                Delivery Address
              </Text>
              <View style={{ flex: 1 }}>
                {/* Field 1 */}
                <View style={{ marginHorizontal: 20, marginVertical: 7 }}>
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 16
                    }}
                  >
                    {"Full name"}
                  </Text>
                  <TextInput
                    returnKeyType={"go"}
                    placeholder={""}
                    onChangeText={formikProps.handleChange("fullname")}
                    autoFocus
                    style={{
                      fontSize: 16,
                      paddingVertical: 7,
                      borderBottomWidth: 1,
                      borderBottomColor: "#D8D8D8"
                    }}
                  />
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {formikProps.errors.fullname}
                  </Text>
                </View>
                {/* Field 2 */}
                <View style={{ marginHorizontal: 20, marginVertical: 7 }}>
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 16
                    }}
                  >
                    {"Address Line 1"}
                  </Text>
                  <TextInput
                    returnKeyType={"go"}
                    placeholder={""}
                    onChangeText={formikProps.handleChange("address1")}
                    style={{
                      fontSize: 16,
                      paddingVertical: 7,
                      borderBottomWidth: 1,
                      borderBottomColor: "#D8D8D8"
                    }}
                  />
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {formikProps.errors.address1}
                  </Text>
                </View>
                {/* Field 3 */}
                <View style={{ marginHorizontal: 20, marginVertical: 7 }}>
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 16
                    }}
                  >
                    {"Address Line 2"}
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType={"go"}
                    placeholder={""}
                    onChangeText={formikProps.handleChange("address2")}
                    style={{
                      fontSize: 16,
                      paddingVertical: 7,
                      borderBottomWidth: 1,
                      borderBottomColor: "#D8D8D8"
                    }}
                  />
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {formikProps.errors.address2}
                  </Text>
                </View>
                {/* Field 4 */}
                <View style={{ marginHorizontal: 20, marginVertical: 7 }}>
                  <Text
                    style={{
                      color: "#D8D8D8",
                      fontSize: 16
                    }}
                  >
                    {"Mobile Number"}
                  </Text>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType={"go"}
                    keyboardType="phone-pad"
                    placeholder={""}
                    onChangeText={formikProps.handleChange("phone")}
                    style={{
                      fontSize: 16,
                      paddingVertical: 7,
                      borderBottomWidth: 1,
                      borderBottomColor: "#D8D8D8"
                    }}
                  />
                  <Text style={{ color: "red", fontSize: 10 }}>
                    {formikProps.errors.phone}
                  </Text>
                </View>
                {/* Field 5 */}
                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 20,
                    justifyContent: "space-between"
                  }}
                >
                  <View
                    style={{
                      marginVertical: 7,
                      width: screenWidth / 2 - 30
                    }}
                  >
                    <Text
                      style={{
                        color: "#D8D8D8",
                        fontSize: 16
                      }}
                    >
                      {"City"}
                    </Text>

                    <TextInput
                      autoCorrect={false}
                      returnKeyType={"go"}
                      placeholder={""}
                      onChangeText={formikProps.handleChange("city")}
                      style={{
                        fontSize: 16,
                        paddingVertical: 7,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D8D8D8"
                      }}
                    />
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {formikProps.errors.city}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 7,
                      width: screenWidth / 2 - 30
                    }}
                  >
                    <Text
                      style={{
                        color: "#D8D8D8",
                        fontSize: 16
                      }}
                    >
                      {"Country"}
                    </Text>
                    {/*<Feather
                    name={"chevron-down"}
                    type={"Feather"}
                    style={{
                      flex: 11,
                      alignSelf: "center",
                      position: "absolute",
                      right: 0,
                      top: 15
                    }}
                    size={25}
                    color={"#aaa"}
                  />*/}
                    <TextInput
                      autoCorrect={false}
                      returnKeyType={"go"}
                      placeholder={""}
                      value={country}
                      style={{
                        fontSize: 16,
                        paddingVertical: 7,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D8D8D8"
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* Form submition  */}
              {formikProps.isSubmitting ? (
                <ActivityIndicator
                  color={"#000"}
                  style={{
                    position: "absolute",
                    bottom: 30,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                />
              ) : (
                <View
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 53,
                      width: 305,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#0C4767",
                      borderRadius: 26.52,

                      marginVertical: 10
                    }}
                    onPress={formikProps.handleSubmit}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#fff"
                      }}
                    >
                      {"Continue"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </React.Fragment>
          )}
        </Formik>
      </Animated.ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { carts } = state.bags;
  const { user } = state.user;
  return { carts, user };
};
export default connect(mapStateToProps, {
  addItem,
  setCarts,
  setUser
})(Address);
