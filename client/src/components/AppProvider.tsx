"use client";
import { AuthContextProvider } from "@/store/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginIcon from "./LoginIcon";
import { Toaster } from "./ui/toaster";
import { DashContextProvider } from "@/store/dash-context";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DashContextProvider>
          <LoginIcon />
          <Toaster />
          {children}
        </DashContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
