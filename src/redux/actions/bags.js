import { ADD_ITEM, SELECTED_ADDREESS, SET_CARTS } from "../actionTypes";
import { Stitch } from "mongodb-stitch-react-native-sdk";

import { getAll } from "../../services/stitch";
export const addItem = item => {
  return dispatch => {
    dispatch({ type: ADD_ITEM, item: item });
  };
};
export const setCarts = () => {
  return dispatch => {
    getAll("bags", { custumerId: Stitch.defaultAppClient.auth.user.id })
      .then(results => {
        console.log(results);
        dispatch({ type: SET_CARTS, carts: results[0].products });
      })
      .catch(error => {
        console.log(error);

        dispatch({ type: SET_CARTS, carts: [] });
      });
  };
};

export const selectedAddr = address => {
  console.log(address);
  return dispatch => {
    dispatch({ type: SELECTED_ADDREESS, address });
  };
};
