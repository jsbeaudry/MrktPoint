import { SET_USER } from "../actionTypes";

import { Stitch } from "mongodb-stitch-react-native-sdk";

import { getOne, getAll } from "../../services/stitch";

export const setUser = () => {
  let user = {};
  user.favorites = [];
  user.wishlist = [];
  user.addressShipping = [];
  user.settings = {
    promotion: false,
    newItems: false,
    messages: false,
    autoNight: false,
    usingCellular: false,
    autoLock: false
  };
  return dispatch => {
    dispatch({ type: SET_USER, user: user });
    getOne("users", { user_id: Stitch.defaultAppClient.auth.user.id })
      .then(results => {
        user = results[0];
        if (user.addressShipping == null) {
          user.addressShipping = [];
        }
        dispatch({ type: SET_USER, user: user });
        getAll("favorites_assets", { custumerId: results[0].user_id })
          .then(results2 => {
            getAll("favorites_products", { custumerId: results[0].user_id })
              .then(results3 => {
                user.favorites = results2;
                user.wishlist = results3;
                dispatch({ type: SET_USER, user: user });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);

        dispatch({ type: SET_USER, user: user });
      });
  };
};
