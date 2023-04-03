import React, { useContext } from 'react'
import './comments.scss'
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRef } from 'react';
import { db } from '../../firebase';
import { useEffect } from 'react';
import { PostsContext } from '../../context/postsContext';


const Comments = ({ documentId, userUid }) => {
  const { userData } = useContext(AuthContext);
  const commentRef = doc(collection(db, "posts", documentId, "comments"));
  const comment = useRef("");
  const { getComments, commentsArray } = useContext(PostsContext)


  const addComment = async (e) => {
    e.preventDefault();
    if (comment.current.value !== "") {
      try {
        await setDoc(commentRef, {
          id: commentRef.id,
          uid: userData?.uid,
          desc: comment.current.value,
          profileImg: userData?.profileImg,
          userName: userData?.userName,
          name: userData?.name,
          timestamp: serverTimestamp(),
        });
        comment.current.value = "";
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    getComments(documentId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsArray])



  return (
    <div className='comments'>
      <form onSubmit={addComment} className="write_comment">
        <img src={userData.profileImg} alt="" />
        <input autoFocus ref={comment} type="text" placeholder="write a comment" />
        <button type='submit' >comment</button>
      </form>
      {commentsArray.map((comment, ke) => (
        <div className="comment" key={ke}>
          <Link to={`/socialapp/profile/${comment.uid}`}>
            <img src={comment.profileImg} alt="" />
          </Link>
          <div className="comment_info">
            <Link to={`/socialapp/profile/${comment.uid}`}>
              <span>{comment.name}</span>
              <span className='userName'>{comment.userName}</span>
            </Link>
            <p>{comment.desc}</p>
          </div>
          <span className='comment_date'>{new Date(comment?.timestamp?.toDate())?.toUTCString()}</span>
        </div>
      ))}
    </div>
  )
}

export default Comments