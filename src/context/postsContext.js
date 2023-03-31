import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {

  const collectionRef = collection(db, "posts");
  const [postsArray, setPostsArray] = useState([])


  useEffect(() => {
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosts = async () => {
    const q = query(collectionRef, orderBy("timestamp", "asc"));
    await onSnapshot(q, (doc) => {
      setPostsArray(doc?.docs?.map((item) => item?.data()).reverse())
    });
  };



  return (
    <PostsContext.Provider value={{ postsArray, getPosts }}>
      {children}
    </PostsContext.Provider>
  )
}