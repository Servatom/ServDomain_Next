"use client";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
// import customToast from "../components/common/CustomToast";
import { auth } from "../firebase.config";
import { TUser } from "@/types";

export interface IContextType {
  user: TUser | null;
  isLoggedIn: boolean;
  login: (user: TUser) => void;
  logout: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

type Props = {
  children?: React.ReactNode;
};

const AuthContext = React.createContext<IContextType>({
  user: {
    phoneNumber: "",
    firebaseUID: "",
    userID: "",
    token: "",
  },
  isLoggedIn: false,
  login: (user) => {},
  logout: () => {},
  isMenuOpen: false,
  setIsMenuOpen: (value) => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const initialUser = localStorage.getItem("user");

  const [user, setUser] = useState<TUser | null>(
    !!initialUser ? JSON.parse(initialUser) : null
  );

  const userIsLoggedIn = !!user;
  const loginHandler = (user: TUser) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        // customToast("Logged out successfully!", "logout");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const contextValue = {
    user: user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isMenuOpen: isMenuOpen,
    setIsMenuOpen: setIsMenuOpen,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
