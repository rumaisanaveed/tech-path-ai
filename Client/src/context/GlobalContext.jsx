import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [breadcrumbText, setBreadcrumbText] = useState("");

  // sidebar menu
  const [open, setOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        breadcrumbText,
        setBreadcrumbText,
        open,
        setOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
