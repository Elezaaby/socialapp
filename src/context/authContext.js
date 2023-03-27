import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  )

  const login = (e) => {
    setUserData({
      id: 232,
      name: 'Adel ali',
      profileImg: 'https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600',
      coverImg: 'https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    });
  }


  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);


  return (
    <AuthContext.Provider value={{ login, userData }}>
      {children}
    </AuthContext.Provider>
  )
}