import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyREnDXeA08aE93kNI5fQV106xncUiUgM",
  authDomain: "type-rpg.firebaseapp.com",
  projectId: "type-rpg",
  storageBucket: "type-rpg.appspot.com",
  messagingSenderId: "454864399902",
  appId: "1:454864399902:web:87d152d24c62a87897080f",
  measurementId: "G-B6C8SQCBQD"
};

const app = initializeApp(
  typeof window !== 'undefined' ? firebaseConfig : {}
);

export const auth = getAuth(app);
export const db = getFirestore(app);
//addDoc