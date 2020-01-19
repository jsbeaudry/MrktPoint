import { Dimensions, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const formatNumber = (num, curr) => {
  return `${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} ${
    curr ? curr : ""
  }`;
};

const scaleIndice = 0.3;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const IS_IPHONE_X = screenHeight === 812 || screenHeight === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 30 : 20) : 30;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 80 : 80) : 80;

const orderStatus = {
  AWAITING_FULFILLMENT: "awaiting_fulfillment", // when the order has been accepted and awaiting to be packed
  AWAITING_REVIEW: "awaiting_review", // when the order is waiting for review next by the seller
  AWAITING_SHIPMENT: "awaiting_shipment", // when the order is completely pack and waiting for shipment
  AWAITING_PICKUP: "awaiting_pickup", // when the client will come to take the order
  AWAITING_ONLINE_PAMENT: "awaiting_online_payment", // waiting for the online gateway to confirm the payment
  SHIPPED: "shipped", // when the order is out for delivery
  CANCELLED: "cancelled", // if the user cancel the order
  DECLINED: "declined", // when order completed review and has been declined * a final state
  REFUNDED: "refunded", // when the order has been refunded completely
  MANUAL_VERIFICATION_REQUIRED: "manual_verification_required", // when next step is manuel verification
  PARTIALLY_REFUNDED: "partially_refunded", // when a partial refund has been made
  COMPLETED: "completed", // when paid and delivered
  DISPUTED: "disputed" // In case the order is being disputed
};

export {
  scaleIndice,
  screenWidth,
  screenHeight,
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT,
  wp,
  hp,
  formatNumber,
  orderStatus
};
