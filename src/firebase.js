import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDOitxxpXSq0dkJzKgj-N9SuZEqcTZOj_o",
  authDomain: "socialapp-c44c3.firebaseapp.com",
  projectId: "socialapp-c44c3",
  storageBucket: "socialapp-c44c3.appspot.com",
  messagingSenderId: "838864334648",
  appId: "1:838864334648:web:9ed2cf5c957b5690811bcd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db, onAuthStateChanged }