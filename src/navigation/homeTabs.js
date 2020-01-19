import React, { Component } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../utils/colors";
import { scaleIndice, STATUS_BAR_HEIGHT } from "../utils/variables";
import { HomeScreen, SearchScreen, CartsTab, Profile } from "../screens";

import { Icon } from "../utils/icons";

const HomeTabs = createBottomTabNavigator(
  {
    Tab1: {
      screen: HomeScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => {
          return (
            <Icon
              name="shop"
              size={moderateScale(22, scaleIndice)}
              color={focused ? colors.blue : "#bbb"}
            />
          );
        }
      })
    },
    Tab2: {
      screen: SearchScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => {
          return (
            <Icon
              name="search"
              size={moderateScale(22, scaleIndice)}
              color={focused ? colors.blue : "#bbb"}
            />
          );
        }
      })
    },
    Tab3: {
      screen: CartsTab,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => {
          return (
            <Icon
              name="shopping"
              size={moderateScale(22, scaleIndice)}
              color={focused ? colors.blue : "#bbb"}
            />
          );
        }
      })
    },
    Tab4: {
      screen: Profile,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => {
          return (
            <Icon
              name="user"
              size={moderateScale(22, scaleIndice)}
              color={focused ? colors.blue : "#bbb"}
            />
          );
        }
      })
    }
  },
  {
    lazy: true,
    tabBarPosition: "bottom",
    initialRouteName: "Tab1",
    animationEnabled: true,
    //
    useNativeAnimations: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      showIndicator: false,
      position: "absolute",
      bottom: 0,
      left: 0,
      titleStyle: {
        justifyContent: "center",
        alignItems: "center"
      },
      style: {
        borderWidth: 0,
        paddingTop: 10,
        height: 60,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        elevation: 9,
        shadowRadius: 5,
        shadowOffset: {
          height: 4,
          width: 0
        },
        borderTopColor: "transparent"
      },
      activeBackgroundColor: "transparent",
      inactiveBackgroundColor: colors.white,
      labelStyle: {},
      iconStyle: {},
      tabStyle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
      }
    }
  }
);

export default createAppContainer(HomeTabs);
