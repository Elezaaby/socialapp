import React, { useEffect, useState } from 'react'
import './posts.scss'
import Post from './Post';
import { query, onSnapshot, collection } from 'firebase/firestore';
import { orderBy } from 'firebase/firestore';
import { db } from '../../firebase';


const Posts = () => {

  const [posts, setPosts] = useState([])
  const collectionRef = collection(db, "posts");


  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        setPosts(doc?.docs?.map((item) => item?.data()))
      });
    };
    return () => postData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className='posts'>
      {[...posts].reverse().map((post, ke) => (
        <Post post={post} key={ke} />
      ))}
    </div>
  )
}

export default Posts