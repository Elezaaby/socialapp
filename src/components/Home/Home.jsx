import React from 'react'
import './home.scss'
import Stories from './../stories/Stories';
import AddPost from '../addPost/AddPost';
import Posts from './../posts/Posts';

const Home = () => {
  return (
    <div className='home'>
      <Stories />
      <AddPost />
      <Posts />
    </div>
  )
}

export default Home