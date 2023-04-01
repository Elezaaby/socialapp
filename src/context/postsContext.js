import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {

  const collectionRef = collection(db, "posts");
  const [postsArray, setPostsArray] = useState([])
  const [imageInput, setImageInput] = useState(null);
  const [progressBar, setProgressBar] = useState(100);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosts = async () => {
    const q = query(collectionRef, orderBy("timestamp", "asc"));
    await onSnapshot(q, (doc) => {
      setPostsArray(doc?.docs?.map((item) => item?.data()).reverse())
      setImage(null);
      setImageInput(null);
      setProgressBar(0);
    });
  };



  return (
    <PostsContext.Provider value={{ postsArray, getPosts, imageInput, setImageInput, progressBar, setProgressBar, image, setImage }}>
      {children}
    </PostsContext.Provider>
  )
}