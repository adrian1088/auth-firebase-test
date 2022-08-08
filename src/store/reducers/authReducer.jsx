import {
  initialAuthState,
  LOGIN,
  LOGOUT
} from "../actions/authAction";

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        uid: action.payload.uid
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        uid:null
      };
    default:
      return state;
  }
};
