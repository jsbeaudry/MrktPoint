import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import {
  LaunchScreen,
  BoardingScreen,
  SigninScreen,
  ForgetPassword,
  Shop,
  FavoritesStore,
  WishList,
  ShopInfo,
  AllProducts,
  Maps,
  Details,
  TermesAndConditions,
  Carts,
  Payment,
  Address,
  AddAddress,
  AddressList,
  AddCard,
  CardList,
  Orders,
  OrderConfirm,
  OrderDetails,
  EditProfile,
  Settings,
  Support,
  Review
} from "../screens";
import demo from "../services/demo";
import HomeTabs from "./homeTabs";

export class Screen extends Component {
  render() {
    return (
      <View>
        <Text>tab1</Text>
      </View>
    );
  }
}
const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: HomeTabs,
      navigationOptions: () => ({
        title: "",
        header: null
      })
    },
    Shop: {
      screen: Shop,
      navigationOptions: () => ({
        title: "",
        header: null
      })
    },
    FavoritesStore: {
      screen: FavoritesStore
    },
    WishList: {
      screen: WishList
    },
    ShopInfo: {
      screen: ShopInfo
    },
    AllProducts: {
      screen: AllProducts,
      navigationOptions: () => ({
        title: "",
        header: null
      })
    },
    Details: {
      screen: Details,
      navigationOptions: () => ({})
    },
    Carts: {
      screen: Carts
    },
    Address: {
      screen: Address
    },
    AddAddress: {
      screen: AddAddress
    },
    AddressList: {
      screen: AddressList
    },
    Payment: {
      screen: Payment
    },
    Orders: {
      screen: Orders
    },
    OrderConfirm: {
      screen: OrderConfirm
    },
    OrderDetails: {
      screen: OrderDetails
    },
    AddCard: {
      screen: AddCard
    },
    CardList: {
      screen: CardList
    },
    EditProfile: {
      screen: EditProfile
    },
    Settings: {
      screen: Settings
    },
    Support: {
      screen: Support
    },

    Welcome: {
      screen: Screen,
      navigationOptions: () => ({
        title: "",
        header: null
      })
    },
    Location: {
      screen: Screen,
      navigationOptions: () => ({
        title: "",
        header: null
      })
    },

    ForgetPassword: {
      screen: ForgetPassword,
      navigationOptions: () => ({
        title: ""
      })
    },
    TermesAndConditions: {
      screen: TermesAndConditions
    },
    Review: {
      screen: Review
    },
    Maps: {
      screen: Maps
    }
  },
  {
    initialRouteName: "Main"
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    Main: MainNavigator,
    Signin: {
      screen: SigninScreen,
      navigationOptions: () => ({
        title: "",
        header: null
      })
    },
    Splash: {
      screen: LaunchScreen,
      navigationOptions: () => ({
        title: "",
        header: null
      })
    },
    Intro: {
      screen: BoardingScreen,
      navigationOptions: () => ({
        title: "",
        header: null
      })
    }
  },
  { initialRouteName: "Splash" }
);

export default createAppContainer(SwitchNavigator);
//export default demo;
