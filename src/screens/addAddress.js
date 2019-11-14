import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Picker,
  TextInput,
  View
} from "react-native";
import { screenWidth, screenHeight } from "../utils/variables";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { Formik } from "formik";
import * as yup from "yup";
import { Subscribe } from "unstated";
import { StateContainer } from "../utils/stateContainer";
import SelectPicker from "react-native-select-picker";

const validationSchema = yup.object().shape({
  fullname: yup.string().required().label("fullname"),
  address1: yup.string().required().label("address"),
  address2: yup.string().required().label("address"),
  phone: yup.string().required().label("phone"),
  city: yup.string().required().label("city")
});

class Delivery extends React.Component {
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
      fullname: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "Haiti",
      zipcode: "",
      phone: "",
      email: "",
      selected: "apple"
    };
  }
  componentWillMount() {}

  render() {
    const { country } = this.state;
    return (
      <Subscribe to={[StateContainer]}>
        {container =>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
                //alert(JSON.stringify(values));

                container.addAddress(values);
                container.addSelectAddress(values);
                setTimeout(() => {
                  actions.setSubmitting(false);
                  this.props.navigation.goBack();
                }, 1000);
              }}
              validationSchema={validationSchema}
            >
              {formikProps =>
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
                        autoCorrect={false}
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
                      <Text style={{ color: "red" }}>
                        {formikProps.errors.fullname}
                      </Text>
                    </View>
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
                        autoCorrect={false}
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
                      <Text style={{ color: "red" }}>
                        {formikProps.errors.address1}
                      </Text>
                    </View>
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
                      <Text style={{ color: "red" }}>
                        {formikProps.errors.address2}
                      </Text>
                    </View>
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
                        placeholder={""}
                        onChangeText={formikProps.handleChange("phone")}
                        style={{
                          fontSize: 16,
                          paddingVertical: 7,
                          borderBottomWidth: 1,
                          borderBottomColor: "#D8D8D8"
                        }}
                      />
                      <Text style={{ color: "red" }}>
                        {formikProps.errors.phone}
                      </Text>
                    </View>
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
                        <Text style={{ color: "red" }}>
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
                    <SelectPicker
                      onValueChange={value => {
                        // Do anything you want with the value.
                        // For example, save in state.
                        this.setState({
                          selected: value
                        });
                      }}
                      selected={this.state.selected}
                      placeholder={"apple"}
                      showIOS={true}
                    >
                      <SelectPicker.Item label="Apple" value="apple" />
                      <SelectPicker.Item label="Banana" value="banana" />
                      <SelectPicker.Item label="Orange" value="orange" />
                    </SelectPicker>
                  </View>

                  {formikProps.isSubmitting
                    ? <ActivityIndicator
                        color={"#000"}
                        style={{
                          position: "absolute",
                          bottom: 30,
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      />
                    : <View
                        style={{
                          position: "absolute",
                          bottom: 15,
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
                      </View>}
                </React.Fragment>}
            </Formik>
          </View>}
      </Subscribe>
    );
  }
}

export default Delivery;
