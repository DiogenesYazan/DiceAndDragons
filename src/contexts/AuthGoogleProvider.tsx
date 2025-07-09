import { createContext, useEffect, useState, ReactNode } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getAuth } from 'firebase/auth'
import { auth } from '../services/firebase-config';
import { collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSessionStorage } from 'usehooks-ts';
import { useNavigate } from "react-router-dom";
// import { UserDataContext } from "./UserDataProvider";

interface AuthContextProps {
  handleGoogleSignIn: () => void;
  handleGoogleSignOut: () => void;
  isSignedIn: boolean;
  isLoading: boolean;
  userId: string,
  userCredential: string | undefined,
  userPhotoUrl: string,
  signed: boolean;
}

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext<AuthContextProps>({
  handleGoogleSignIn: () => {},
  handleGoogleSignOut: () => {},
  isSignedIn: false,
  isLoading: false,
  userId: "",
  userCredential: "",
  userPhotoUrl: "",
  signed: false,
});

export const AuthGoogleProvider = ({ children }: { children: ReactNode }) => {
  const [userCredential , setUserCredential] = useSessionStorage<string | undefined>("accessToken", "");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState({});
  const [userId, setUserId] = useState("");
  const [userPhotoUrl, setUserPhotoUrl] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [userState, loading, error] = useAuthState(auth);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading])

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setIsSignedIn(true)
      setUserPhotoUrl(currentUser?.photoURL ?? "")
      setUserId(currentUser?.uid ?? "")
    } else {
      setIsSignedIn(false)
    }
  })

  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        setUserCredential(credential?.accessToken);
      })
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      
      console.error("Erro no login:", {
        errorCode,
        errorMessage,
        email,
        credential
      });
      
      // Se o popup falhar, você pode tentar redirect como fallback
      // await signInWithRedirect(auth, provider);
    }
  }

  function handleGoogleSignOut() {
    signOut(auth)
    .then(() => {
      console.log("sign out sucessfully");
      setUserCredential("");
      console.log("store clear");
    });
  }

  return (
    <AuthGoogleContext.Provider value={{ 
      handleGoogleSignIn, 
      handleGoogleSignOut,
      isLoading,
      userId,
      userCredential,
      isSignedIn,
      userPhotoUrl,
      signed: !!user, 
    }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}