import { ADD_ITEM, SELECTED_ADDREESS, SET_CARTS } from "../actionTypes";

const INTIAL_STATE = {
  carts: [],
  selectedAddress: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      state.carts.push(action.item);
      return { ...state, carts: state.carts };
    case SET_CARTS:
      return { ...state, carts: action.carts };
    case SELECTED_ADDREESS:
      return { ...state, selectedAddress: action.address };

    default:
      return state;
  }
};
