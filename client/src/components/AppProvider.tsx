"use client";
import { AuthContextProvider } from "@/store/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginIcon from "./LoginIcon";
import { Toaster } from "./ui/toaster";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <LoginIcon />
        <Toaster />
        {children}
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
