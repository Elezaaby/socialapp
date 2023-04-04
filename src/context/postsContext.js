import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {

  const collectionRef = collection(db, "posts");
  const [postsArray, setPostsArray] = useState([])
  const [commentsArray, setCommentsArray] = useState([])
  const [imageInput, setImageInput] = useState(null);
  const [progressBar, setProgressBar] = useState(100);
  const [image, setImage] = useState(null);
  const [searchToggle, setSearchToggle] = useState(false)

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


  const getComments = async (postId) => {
    try {
      const collectionOfComments = collection(db, `posts/${postId}/comments`);
      const q = query(collectionOfComments, orderBy("timestamp", "desc"));
      await onSnapshot(q, (doc) => {
        setCommentsArray(doc.docs?.map((item) => item.data()))
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <PostsContext.Provider value={{ postsArray, getPosts, imageInput, setImageInput, progressBar, setProgressBar, image, setImage, getComments, commentsArray, setSearchToggle, searchToggle }}>
      {children}
    </PostsContext.Provider>
  )
}