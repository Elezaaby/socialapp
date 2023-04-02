import { collection, onSnapshot, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {

  const [users, setUsers] = useState()
  const collectionUserRef = collection(db, 'users')

  const getPosts = async () => {
    const q = query(collectionUserRef);
    await onSnapshot(q, (doc) => {
      setUsers(doc?.docs?.map((item) => item?.data()))
    });
  };

  useEffect(() => {
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <UsersContext.Provider value={{ users }}>
      {children}
    </UsersContext.Provider>
  )
}