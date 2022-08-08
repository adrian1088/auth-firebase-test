export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const initialAuthState = {
  isAuthenticated: false,
  uid:null
};

export const doLogin = payload => ({
  type: LOGIN,
  payload
});

export const doLogOut = () => ({
  type: LOGOUT
});
