import { createContext, useContext } from "react";
import { db } from "../firebase";
import { collection, where, query, arrayUnion, getDocs, updateDoc, doc, arrayRemove } from "firebase/firestore";
import { AuthContext } from "./authContext";

export const FollowUserContext = createContext();


export const FollowUserContextProvider = ({ children }) => {
  const collectionUserRef = collection(db, 'users')
  const { userData } = useContext(AuthContext)


  const followUser = async (uid, profileImg, name) => {
    try {
      const q = query(collectionUserRef, where("uid", "==", userData?.uid))
      const doc = await getDocs(q);
      const data = doc.docs[0].ref;
      await updateDoc(data, {
        followers: arrayUnion({
          uid: uid,
          profileImg: profileImg,
          name: name,
        }),
      });
    } catch (err) {
      console.log(err.message);
    }
  };


  const unFollowedUser = async (uid, profileImg, name) => {
    const q = query(collectionUserRef, where("uid", "==", userData?.uid))
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      followers: arrayRemove({ uid: uid, name: name, profileImg: profileImg }),
    });
  };


  return (
    <FollowUserContext.Provider value={{ followUser, unFollowedUser }}>
      {children}
    </FollowUserContext.Provider>
  )
}
