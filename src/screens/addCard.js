import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";
import { screenHeight } from "../utils/variables";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { Formik } from "formik";
import * as yup from "yup";
import { Subscribe } from "unstated";
import { StateContainer } from "../utils/stateContainer";

const validationSchema = yup.object().shape({
  card_fullname: yup.string().required().label("fullname"),
  card_number: yup.string().required().label("number"),
  card_expiry: yup.string().required().label("expiry"),
  card_cvc: yup.string().required().label("cvc")
});

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
      card_fullname: "",
      card_number: "",
      card_expiry: "",
      card_cvc: ""
    };
  }
  componentWillMount() {}

  render() {
    const { card_fullname, card_number, card_expiry, card_cvc } = this.state;
    return (
      <Subscribe to={[StateContainer]}>
        {container =>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            <Formik
              initialValues={{
                card_fullname: "",
                card_number: "",
                card_expiry: "",
                card_cvc: ""
              }}
              onSubmit={(values, actions) => {
                container.addCard(values);
                container.addSelectCard(values);
                setTimeout(() => {
                  actions.setSubmitting(false);
                  this.props.navigation.goBack();
                }, 1000);
              }}
              validationSchema={validationSchema}
            >
              {formikProps =>
                <React.Fragment>
                  <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />

                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 28,
                        marginLeft: 20,
                        marginTop: 50,
                        fontWeight: "bold"
                      }}
                    >
                      Card Details.{container.getCards().length}
                    </Text>
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 13,
                        marginLeft: 20,
                        marginTop: 10,
                        marginBottom: 20,
                        fontWeight: "bold"
                      }}
                    >
                      Verify and complete your card information.
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
                          returnKeyType={"done"}
                          placeholder={""}
                          onChangeText={formikProps.handleChange(
                            "card_fullname"
                          )}
                          style={{
                            fontSize: 16,
                            paddingVertical: 7,
                            borderBottomWidth: 1,
                            borderBottomColor: "#D8D8D8"
                          }}
                        />
                        <Text style={{ color: "red" }}>
                          {formikProps.errors.card_fullname}
                        </Text>
                      </View>

                      <View style={{ marginHorizontal: 20, marginVertical: 7 }}>
                        <Text
                          style={{
                            color: "#D8D8D8",
                            fontSize: 16
                          }}
                        >
                          {"Card Number"}
                        </Text>
                        <TextInput
                          autoCorrect={false}
                          returnKeyType={"done"}
                          placeholder={""}
                          maxLength={16}
                          returnKeyType={"done"}
                          onChangeText={formikProps.handleChange("card_number")}
                          keyboardType={"number-pad"}
                          style={{
                            fontSize: 16,
                            paddingVertical: 7,
                            borderBottomWidth: 1,
                            borderBottomColor: "#D8D8D8"
                          }}
                        />
                        <Text style={{ color: "red" }}>
                          {formikProps.errors.card_number}
                        </Text>
                      </View>

                      <View
                        style={{
                          marginVertical: 7,
                          marginHorizontal: 20
                        }}
                      >
                        <Text
                          style={{
                            color: "#D8D8D8",
                            fontSize: 16
                          }}
                        >
                          {"Expiry Date"}
                        </Text>

                        <TextInput
                          autoCorrect={false}
                          returnKeyType={"done"}
                          placeholder={""}
                          maxLength={5}
                          onChangeText={formikProps.handleChange("card_expiry")}
                          style={{
                            fontSize: 16,
                            paddingVertical: 7,
                            borderBottomWidth: 1,
                            borderBottomColor: "#D8D8D8"
                          }}
                        />
                        <Text style={{ color: "red" }}>
                          {formikProps.errors.card_expiry}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginVertical: 7,
                          marginHorizontal: 20
                        }}
                      >
                        <Text
                          style={{
                            color: "#D8D8D8",
                            fontSize: 16
                          }}
                        >
                          {"CVC"}
                        </Text>

                        <TextInput
                          autoCorrect={false}
                          returnKeyType={"done"}
                          placeholder={""}
                          maxLength={3}
                          onChangeText={formikProps.handleChange("card_cvc")}
                          keyboardType={"number-pad"}
                          style={{
                            fontSize: 16,
                            paddingVertical: 7,
                            borderBottomWidth: 1,
                            borderBottomColor: "#D8D8D8"
                          }}
                        />
                        <Text style={{ color: "red" }}>
                          {formikProps.errors.card_cvc}
                        </Text>
                      </View>
                    </View>

                    <View
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
                    </View>
                  </View>
                </React.Fragment>}
            </Formik>
          </View>}
      </Subscribe>
    );
  }
}

export default AddCard;
