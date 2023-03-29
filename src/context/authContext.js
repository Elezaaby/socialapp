import { createContext, useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import { db, auth, onAuthStateChanged } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [userData, setUserData] = useState()
  const [user, setUser] = useState()
  const collectionUserRef = collection(db, 'users')
  let navigate = useNavigate()


  /////////// function login with email and password
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('login done');
    } catch (err) {
      console.log(err.message)
    }
  }

  /////////// function logOut
  const logOutUser = async () => {
    await signOut(auth)
  }

  /////////// function register with email and password
  const registerWithEmailAndPassword = async (name, email, password, userName) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collectionUserRef, {
        uid: user.uid,
        name,
        userName,
        providerId: 'email/password',
        email: user.email,
        profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
        coverImg: 'https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      })
    } catch (err) {
      console.log(err.message)
    }
  }


  const userStateChanged = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUserRef, where("uid", "==", user?.uid));
        await onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data());
        });
        setUser(user);
      } else {
        setUser(null);
        navigate("/socialapp/login");
      }
    });
  }


  useEffect(() => {
    userStateChanged()
    if (user || userData) {
      navigate('/socialapp')
    }
    else {
      navigate('socialapp/login')
    }

    return () => userStateChanged()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <AuthContext.Provider value={{ userData, loginWithEmailAndPassword, registerWithEmailAndPassword, logOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}