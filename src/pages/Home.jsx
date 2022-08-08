import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";

function Home() {
  const { currentUser,dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(
    () => {
      if (currentUser.isAuthenticated) {
        console.log("currentUser.isAuthenticated: ",currentUser.isAuthenticated);
        const starCountRef = ref(db, "users/" + currentUser.uid);
        onValue(starCountRef, snapshot => {
          if (snapshot.exists()) {
            var data = snapshot.val();
            setUsername(data.firstName + " " + data.lastName);
          }
        });
      }
    },
    [currentUser]
  );

  const clickLogin = () => {
    if (currentUser.isAuthenticated) {
      signOut(auth);
      dispatch({ type: "LOGOUT" });
    } else {
      navigate("/signin");
    }
  };

  const clickSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="mainContainer">
      <h1>Home</h1>
      {currentUser.isAuthenticated &&
        <p>
          Welcome, {username}
        </p>}
      <div className="buttons">
        <button onClick={clickLogin}>
          {currentUser.isAuthenticated ? "Log Out" : "Sign In"}
        </button>
        {!currentUser.isAuthenticated && <button onClick={clickSignup}>Sign Up</button>}
      </div>
    </div>
  );
}

export default Home;
