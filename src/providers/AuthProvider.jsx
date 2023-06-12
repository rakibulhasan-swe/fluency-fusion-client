import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  // create user
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // update user
  const updateUser = (name, photoURL) => {
    setLoader(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  // sign in user
  const userLogin = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // google sign in
  const googleSignIn = (provider) => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };
  // logout user
  const logOut = () => {
    setLoader(true);
    return signOut(auth);
  };

  // user watcher
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      // get and set token
      if (loggedUser) {
        axios
          .post(`${import.meta.env.VITE_URL}/jwt`, { email: loggedUser.email })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            setLoader(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoader(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const appInfo = {
    user,
    loader,
    createUser,
    updateUser,
    userLogin,
    googleSignIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={appInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
