import React, { useContext, useRef, useEffect } from 'react'
import './addPost.scss'
import { AuthContext } from '../../context/authContext'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { PostsContext } from '../../context/postsContext';
import Friends from "../../assets/friend.png";
import AddImg from "../../assets/img.png";
import Map from "../../assets/map.png";


const AddPost = () => {
  const { userData, user } = useContext(AuthContext)
  const { getPosts } = useContext(PostsContext)
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
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
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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