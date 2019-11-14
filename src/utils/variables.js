import { Dimensions, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const formatNumber = num => {
  return `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
};

const scaleIndice = 0.3;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const IS_IPHONE_X = screenHeight === 812 || screenHeight === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 30 : 20) : 30;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 80 : 80) : 80;
export {
  scaleIndice,
  screenWidth,
  screenHeight,
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT,
  wp,
  hp,
  formatNumber
};
