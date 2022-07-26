import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7g9Zz_iwrGNPZiQ2u9slv0YoXkvdtK7g",
  authDomain: "auth-firebase-test-a9d51.firebaseapp.com",
  projectId: "auth-firebase-test-a9d51",
  storageBucket: "auth-firebase-test-a9d51.appspot.com",
  messagingSenderId: "70443209976",
  appId: "1:70443209976:web:453fcebf003c28b1fd570d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
export default app;
