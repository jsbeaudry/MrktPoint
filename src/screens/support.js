import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
  Keyboard,
  StyleSheet
} from "react-native";
import PubNubReact from "pubnub-react";

import Icon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { GiftedChat } from "react-native-gifted-chat";

export default class App extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Messages",
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
      messages: [],
      history: []
    };
    this.id = this.randomid();

    this.pubnub = new PubNubReact({
      publishKey: "pub-c-89db6849-dee2-4217-ba3f-4ed2fa7c1a80",
      subscribeKey: "sub-c-126fcce0-0482-11e9-9231-4abfa1972993"
    });
    this.pubnub.init(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({
      channels: ["ReactChat"],
      message: message => console.log("sub", message)
    });

    this.pubnub.getMessage("ReactChat", m => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, m["message"])
      }));
      // this.setState({ messages: m['message'] });
      // console.log(m['message']);
    });
  }
  onSend(messages = []) {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages)
    // }));
    console.log("49", messages);
    this.pubnub
      .publish({
        message: messages,
        channel: "ReactChat"
      })
      .catch(error => {
        console.log(error);
      });
  }
  randomid = () => {
    return Math.floor(Math.random() * 100);
  };
  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: ["ReactChat"] });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.id
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React from "react";
// import {
//   Platform,
//   StatusBar,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   View,
//   TextInput,
//   Text,
//   Animated,
//   Keyboard,
//   KeyboardAvoidingView
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

// import Feather from "react-native-vector-icons/Feather";
// import { colors } from "../utils/colors";
// import { screenHeight } from "../utils/variables";
// import { SafeAreaView } from "react-navigation";
// const MARGIN_HEIGHT_BIG = 220;
// const MARGIN_HEIGHT_SMALL = 0;
// class Support extends React.Component {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       title: "Settings",
//       headerLeft: (
//         <TouchableOpacity
//           style={{
//             flex: 20,
//             backgroundColor: "transparent",
//             justifyContent: "center",
//             alignItems: "flex-start",
//             paddingLeft: 20
//           }}
//           onPress={() => {
//             navigation.goBack();
//           }}
//         >
//           <Icon
//             name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
//             type="ionicon"
//             color="#000"
//             size={30}
//             iconStyle={{}}
//           />
//         </TouchableOpacity>
//       ),
//       headerStyle: {
//         borderBottomColor: "#fff",
//         backgroundColor: "#fff"
//       }
//     };
//   };
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.marginHeight = new Animated.Value(MARGIN_HEIGHT_SMALL);
//   }

//   componentWillMount() {
//     this.keyboardWillShowSub = Keyboard.addListener(
//       "keyboardWillShow",
//       this.keyboardWillShow
//     );
//     this.keyboardWillHideSub = Keyboard.addListener(
//       "keyboardWillHide",
//       this.keyboardWillHide
//     );
//   }

//   componentWillUnmount() {
//     this.keyboardWillShowSub.remove();
//     this.keyboardWillHideSub.remove();
//   }

//   keyboardWillShow = event => {
//     Animated.timing(this.marginHeight, {
//       duration: event.duration,
//       toValue: MARGIN_HEIGHT_BIG
//     }).start();
//   };

//   keyboardWillHide = event => {
//     Animated.timing(this.marginHeight, {
//       duration: event.duration,
//       toValue: MARGIN_HEIGHT_SMALL
//     }).start();
//   };
//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//         <StatusBar backgroundColor="#fff" barStyle="dark-content" />
//         <ScrollView style={{}}>
//           <Animated.View
//             style={{
//               height: screenHeight - 150,
//               justifyContent: "flex-end",
//               paddingBottom: this.marginHeight
//             }}
//           >
//             <Index />
//             <Index2 />
//           </Animated.View>
//         </ScrollView>
//         <Animated.View
//           style={{
//             height: 70,
//             flexDirection: "row",
//             alignItems: "center",
//             borderTopColor: "#eee",
//             borderTopWidth: 1,
//             marginBottom: this.marginHeight
//           }}
//         >
//           <TouchableOpacity>
//             <Feather
//               name="plus"
//               type="Feather"
//               style={{ padding: 10 }}
//               size={40}
//               color={"#B8B7B7"}
//             />
//           </TouchableOpacity>
//           <TextInput
//             autoCorrect={false}
//             placeholder={"Write something here …"}
//             numberOfLines={3}
//             value={this.state.text}
//             onChangeText={text => {
//               this.setState({
//                 text: text
//               });
//             }}
//             style={{
//               flex: 1,
//               height: 60,
//               fontSize: 16,
//               color: colors.blueDark,
//               fontWeight: "500",
//               borderColor: "#eee",
//               borderWidth: 0
//             }}
//           />
//           <TouchableOpacity>
//             <Feather
//               name="send"
//               type="Feather"
//               style={{ padding: 10 }}
//               size={30}
//               color={"#B8B7B7"}
//             />
//           </TouchableOpacity>
//         </Animated.View>
//       </SafeAreaView>
//     );
//   }
// }

// function Index() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.group5}>
//         <View style={styles.rectangle1}>
//           <Text style={styles.text1}>
//             How c hgj hj kh ahskd haskd ahdk ahd kan na hdasgdjg g g g asuhkj hk
//             haks hduksah jh hask h kashd ahsk dI do that?
//           </Text>
//         </View>
//       </View>
//       <Text style={styles.style3}>12:05</Text>
//     </View>
//   );
// }
// function Index2() {
//   return (
//     <View style={styles.container2}>
//       <View style={styles.group5}>
//         <View style={styles.rectangle2}>
//           <Text style={styles.text2}>
//             How c hgj hj kh ahskd haskd ahdk ahd kan na hdasgdjg g g g asuhkj hk
//             haks hduksah jh hask h kashd ahsk dI do that?
//           </Text>
//         </View>
//       </View>
//       <Text style={styles.style3}>12:05</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     maxWidth: 250,
//     marginRight: 20,
//     alignSelf: "flex-end"
//   },
//   container2: {
//     maxWidth: 250,
//     marginLeft: 20,
//     alignSelf: "flex-start"
//   },
//   group5: {
//     maxWidth: 250
//   },
//   rectangle1: {
//     backgroundColor: "#0C4767",
//     borderTopLeftRadius: 15,
//     borderBottomRightRadius: 15,
//     borderBottomLeftRadius: 15,
//     paddingVertical: 5,
//     shadowOffset: {
//       height: 2,
//       width: -2
//     },
//     shadowColor: "rgba(0,0,0,0.1)",
//     shadowOpacity: 1,
//     shadowRadius: 5,
//     overflow: "hidden"
//   },
//   rectangle2: {
//     backgroundColor: "#E6E6E6",
//     borderTopRightRadius: 15,
//     borderBottomRightRadius: 15,
//     borderBottomLeftRadius: 15,
//     paddingVertical: 5,
//     shadowOffset: {
//       height: 2,
//       width: -2
//     },
//     shadowColor: "rgba(0,0,0,0.1)",
//     shadowOpacity: 1,
//     shadowRadius: 5,
//     overflow: "hidden"
//   },
//   rectangle65_imageStyle: {},
//   text1: {
//     backgroundColor: "transparent",
//     color: "#ffffff",
//     fontSize: 14,
//     textAlign: "right",
//     marginTop: 10,
//     marginHorizontal: 10
//   },
//   text2: {
//     backgroundColor: "transparent",
//     color: "#404040",
//     fontSize: 14,
//     textAlign: "right",
//     marginTop: 10,
//     marginHorizontal: 10
//   },
//   style3: {
//     backgroundColor: "transparent",
//     color: "rgba(35,35,35,1)",
//     opacity: 0.5,
//     fontSize: 10,
//     marginTop: 3,
//     alignSelf: "flex-end"
//   }
// });

// export default Support;
