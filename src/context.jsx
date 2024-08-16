// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useEffect } from "react";
import { getCurrentUserData } from "./db/apiAuthentication";
import useFetch from "./useHooks/fetch";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUserData);

  const isUserAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider
      value={{ user, fetchUser, loading, isUserAuthenticated }}
    >
      {children}
    </UrlContext.Provider>
  );
};

// Custom hook to use the UrlContext
export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
