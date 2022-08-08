import React, { useEffect, useState, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { AuthContext } from "./AuthContext";
import { authReducer } from "../store/reducers/authReducer";
import { initialAuthState } from "../store/actions/authAction";

const AuthContextProvider = ({ children }) => {
  // TODO: Descomentar para usar sin useReducer
  // const [currentUser, setCurrentUser] = useState(null);
  const [currentUser, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(
    () => {
      onAuthStateChanged(auth, user => {
        if (user) {
          // TODO: Descomentar para usar sin useReducer
          // setCurrentUser(user);
          console.log("onAuthStateChanged: ",user);
          dispatch({ type: "LOGIN", payload: user });
        } else {
          // TODO: Descomentar para usar sin useReducer
          // setCurrentUser(null);
          dispatch({ type: "LOGOUT" });
        }
      });
    },
    [currentUser.uid]
  );

  return (
    <AuthContext.Provider value={{ currentUser, dispatch }}>
      // TODO: Descomentar para usar sin useReducer
      {/* <AuthContext.Provider value={{ currentUser }}> */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
