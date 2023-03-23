import { createContext, useEffect, useState } from "react";

export const ModeContext = createContext();

export const ModeContextProvider = ({ children }) => {

  const [pageMode, setPageMode] = useState(
    JSON.parse(localStorage.getItem("pageMode")) || false
  )

  const toggle = () => {
    setPageMode(!pageMode)
  }


  useEffect(() => {
    localStorage.setItem("pageMode", pageMode);
  }, [pageMode]);


  return (
    <ModeContext.Provider value={{ toggle, pageMode }}>
      {children}
    </ModeContext.Provider>
  )
}