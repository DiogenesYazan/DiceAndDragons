import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyREnDXeA08aE93kNI5fQV106xncUiUgM",
  authDomain: "type-rpg.firebaseapp.com",
  projectId: "type-rpg",
  storageBucket: "type-rpg.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
};

const app = initializeApp(
  typeof window !== 'undefined' ? firebaseConfig : {}
);

export const auth = getAuth(app);
export const db = getFirestore(app);