import React from "react";
import {
  StyleSheet,
  Platform,
  Button,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
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
import { Formik } from "formik";
import * as yup from "yup";
import DateTimePicker from "react-native-modal-datetime-picker";
import ModalPicker from "react-native-modal-picker";
import { Stitch, BSON } from "mongodb-stitch-react-native-sdk";
import { updateUser, getOne } from "../services";

const validationSchema = yup.object().shape({
  firstname: yup.string().required().label("firstname"),
  lastname: yup.string().required().label("lastname"),
  email: yup.string().required().email().label("email"),
  phone: yup.string().required().label("phone")
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
      birthdate: new Date(),
      image: null,
      gender: "",
      user: {},
      isDateTimePickerVisible: false
    };
  }
  componentWillMount() {
    this.getPermissionAsync();
    let data_ = Stitch.defaultAppClient.auth.activeUserAuthInfo;
    if (
      Stitch.defaultAppClient.auth.activeUserAuthInfo &&
      Stitch.defaultAppClient.auth.activeUserAuthInfo.userId != undefined
    ) {
      getOne("users", { user_id: data_.userId })
        .then(results => {
          console.log(results);

          this.setState(
            {
              user: results[0],
              birthdate: results[0].birthdate
                ? results[0].birthdate
                : new Date(),
              image: results[0].image ? results[0].image : ""
            },
            () => {
              //alert(JSON.stringify(this.state.user));
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ birthdate: date });
    this.hideDateTimePicker();
  };

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
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    //console.log(result.uri);

    if (!result.cancelled) {
      this.setState({ image: result });
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
    const { image, gender, birthdate, user } = this.state;
    let index = 0;
    const data = [
      // { key: index++, section: true, label: "Fruits" },
      { key: index++, label: "Male" },
      { key: index++, label: "Female" }
    ];
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <KeyboardAvoidingView style={{}} behavior="padding" enabled>
          <View
            style={{
              paddingTop: 100,
              height: screenHeight,
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
                    ? `data:image/jpg;base64,${image.base64}`
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

            <Formik
              enableReinitialize
              initialValues={{
                firstname: user.firstName ? user.firstName : "",
                lastname: user.lastName ? user.lastName : "",
                email: user.email ? user.email : "",
                phone: user.phone ? user.phone : ""
              }}
              onSubmit={(values, actions) => {
                values.gender = gender;
                (values._id = user.id), (values.email =
                  user.email), (values.birthdate = birthdate);

                updateUser(
                  "users",
                  { email: user.email },
                  {
                    firstName: values.firstname,
                    lastName: values.lastname,
                    phone: values.phone,
                    gender: gender,
                    birthdate: birthdate,
                    image: image
                  }
                )
                  .then(results => {
                    console.log(results);
                  })
                  .catch(error => {
                    console.log(error);
                  });

                //this.state.address.push(values);
                //this._storeData("address",JSON.stringify(this.state.address));
                // try {
                //   AsyncStorage.setItem(
                //     "address",
                //     JSON.stringify(this.state.address)
                //   );
                // } catch (error) {
                //   // Error saving data
                // }
                // container.addAddress(values);
                // container.addSelectAddress(values);
                // setTimeout(() => {
                //   actions.setSubmitting(false);
                //   this.props.navigation.goBack();
                // }, 1000);
              }}
              validationSchema={validationSchema}
            >
              {formikProps =>
                <React.Fragment>
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
                      {"First name"}
                    </Text>
                    <TextInput
                      autoCorrect={false}
                      returnKeyType={"done"}
                      placeholder={""}
                      value={formikProps.values.firstname}
                      onChangeText={formikProps.handleChange("firstname")}
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
                  <Text
                    style={{
                      color: "red",
                      fontSize: 10,
                      marginHorizontal: 20,
                      marginTop: -4
                    }}
                  >
                    {formikProps.errors.firstname}
                  </Text>

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
                      {"Last name"}
                    </Text>
                    <TextInput
                      autoCorrect={false}
                      returnKeyType={"done"}
                      placeholder={""}
                      value={formikProps.values.lastname}
                      onChangeText={formikProps.handleChange("lastname")}
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
                  <Text
                    style={{
                      color: "red",
                      fontSize: 10,
                      marginHorizontal: 20,
                      marginTop: -4
                    }}
                  >
                    {formikProps.errors.lastname}
                  </Text>

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
                      disabled
                      placeholder={""}
                      value={formikProps.values.email}
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
                  <Text
                    style={{
                      color: "red",
                      fontSize: 10,
                      marginHorizontal: 20,
                      marginTop: -4
                    }}
                  >
                    {formikProps.errors.email}
                  </Text>
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
                      value={formikProps.values.phone}
                      onChangeText={formikProps.handleChange("phone")}
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
                  <Text
                    style={{
                      color: "red",
                      fontSize: 10,
                      marginHorizontal: 20,
                      marginTop: -4
                    }}
                  >
                    {formikProps.errors.phone}
                  </Text>
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
                  </View>
                  <ModalPicker
                    data={data}
                    selectStyle={{
                      backgroundColor: "transparent",
                      marginTop: -50,
                      height: 40,
                      borderWidth: 0
                    }}
                    selectTextStyle={{
                      textAlign: "right",
                      color: colors.blueDark,
                      marginRight: 10
                    }}
                    optionStyle={{
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    cancelTextStyle={{ color: "#fff", fontSize: 17 }}
                    cancelStyle={{
                      height: 53,

                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#0C4767",
                      borderRadius: 26.52
                    }}
                    initValue={user.gender ? user.gender : ""}
                    onChange={option => {
                      this.setState({ gender: option.label });
                      //alert(`${option.label} (${option.key}) nom nom nom`);
                    }}
                  />
                  <TouchableOpacity
                    onPress={this.showDateTimePicker}
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

                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                  />
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
                          bottom: 0,
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
                            {"SAVE"}
                          </Text>
                        </TouchableOpacity>
                      </View>}
                </React.Fragment>}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default AddCard;
