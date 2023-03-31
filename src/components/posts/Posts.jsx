import React, { useReducer, useEffect } from 'react'
import './posts.scss'
import Post from './Post';
import { PostsReducer, postActions, postsStates, } from "../../context/PostReducer";
import { query, onSnapshot, collection } from 'firebase/firestore';
import { orderBy } from 'firebase/firestore';
import { db } from '../../firebase';


const Posts = () => {

  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST } = postActions;
  const collectionRef = collection(db, "posts");


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SUBMIT_POST]);



  return (
    <div className='posts'>
      {[...state?.posts].reverse().map((post, ke) => (
        <Post post={post} key={ke} />
      ))}
    </div>
  )
}

export default Posts