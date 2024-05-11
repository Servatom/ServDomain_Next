"use client";

import { useGetDefaultDomain } from "@/api/query/domain/query";
import React, { useEffect, useState } from "react";

export interface IDashContextType {
  defaultDomainId: string;
  setDefaultDomainId: (value: string) => void;
  defaultDomainName: string;
  setDefaultDomainName: (value: string) => void;
}

type Props = {
  children?: React.ReactNode;
};

const DashContext = React.createContext<IDashContextType>({
  defaultDomainId: "",
  setDefaultDomainId: (value) => {},
  defaultDomainName: "",
  setDefaultDomainName: (value) => {},
});

export const DashContextProvider = ({ children }: Props) => {
  const { data: defaultDomainData } = useGetDefaultDomain();

  useEffect(() => {
    if (defaultDomainData) {
      setDefaultDomainId(defaultDomainData.domainID);
      setDefaultDomainName(defaultDomainData.domainName);
    }
  }, [defaultDomainData]);

  const [defaultDomainId, setDefaultDomainId] = useState<string>("");
  const [defaultDomainName, setDefaultDomainName] = useState<string>("");

  const contextValue = {
    defaultDomainId,
    setDefaultDomainId,
    defaultDomainName,
    setDefaultDomainName,
  };

  return (
    <DashContext.Provider value={contextValue}>{children}</DashContext.Provider>
  );
};

export default DashContext;
