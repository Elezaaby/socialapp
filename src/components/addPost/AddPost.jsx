/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useReducer, useRef, useEffect } from 'react'
import './addPost.scss'
import { AuthContext } from '../../context/authContext'
import { PostsReducer, postActions, postsStates, } from "../../context/PostReducer";
import Friends from "../../assets/friend.png";
import AddImg from "../../assets/img.png";
import Map from "../../assets/map.png";
import { collection, doc, serverTimestamp, setDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { orderBy } from 'firebase/firestore';


const AddPost = () => {
  const { userData, user } = useContext(AuthContext)
  const postRef = doc(collection(db, "posts"));
  const collectionRef = collection(db, "posts");
  const document = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const inputText = useRef("");


  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (inputText.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          profilePic: user?.photoURL || userData?.profileImg,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          desc: inputText.current.value,
          // image: image,
          timestamp: serverTimestamp(),
        });
        inputText.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
      });
    };
    return () => postData();
  }, [SUBMIT_POST]);


  return (
    <div className='addPost'>
      <div className="top">
        <div className="user">
          <img src={userData.profileImg} alt="" />
        </div>
        <form onSubmit={handleSubmitPost} className="inputP">
          <input ref={inputText} type="text" placeholder={`What's on your mind ${userData.name}?`} />
        </form>
      </div>
      <div className="bottom">
        <div className="menu">
          <div className="item">
            <img src={AddImg} alt="" />
            <span>Add Image</span>
          </div>
          <div className="item">
            <img src={Map} alt="" />
            <span>Add Place</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Tag Friends</span>
          </div>
        </div>
        <button onClick={handleSubmitPost}>Share</button>
      </div>
    </div>
  )
}

export default AddPost