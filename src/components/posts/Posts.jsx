import React, { useContext } from 'react'
import './posts.scss'
import Post from './Post';
import { PostsContext } from './../../context/postsContext';


const Posts = () => {
  const { postsArray } = useContext(PostsContext)

  return (
    <div className='posts'>
      {postsArray?.map((post, ke) => (
        <Post post={post} key={ke} />
      ))}
    </div>
  )
}

export default Posts