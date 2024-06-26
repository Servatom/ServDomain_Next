"use client";

import { signOut } from "firebase/auth";
import React, { useState } from "react";
// import customToast from "../components/common/CustomToast";
import { auth } from "../lib/firebase.config";
import { useToast } from "@/components/ui/use-toast";
import { TUser } from "@/types/types";

export interface IContextType {
  user: TUser | null;
  isLoggedIn: boolean;
  login: (user: TUser) => void;
  logout: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  updateEmail: (email: string) => void;
  updateWaitlistStatus: (value: boolean) => void;
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
    firstName: "",
    lastName: "",
    email: "",
    isStudent: false,
    onWaitlist: false,
  },
  isLoggedIn: false,
  login: (user: TUser) => {},
  logout: () => {},
  isMenuOpen: false,
  setIsMenuOpen: (value: boolean) => {},
  updateEmail: (email: string) => {},
  updateWaitlistStatus: (value: boolean) => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const { toast } = useToast();

  let initialUser;
  if (typeof window !== "undefined") {
    initialUser = localStorage.getItem("user");
  }

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
        toast({
          title: "Logged out successfully!",
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateEmail = (email: string) => {
    if (!user) return;
    let updatedUser = { ...user, email: email };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const updateWaitlistStatus = (value: boolean) => {
    if (!user) return;
    let updatedUser = { ...user, onWaitlist: value };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const contextValue = {
    user: user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isMenuOpen: isMenuOpen,
    setIsMenuOpen: setIsMenuOpen,
    updateEmail: updateEmail,
    updateWaitlistStatus: updateWaitlistStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
