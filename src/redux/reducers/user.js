import { SET_USER } from "../actionTypes";

const INTIAL_STATE = {
  user: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
