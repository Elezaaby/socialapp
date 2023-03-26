import React from 'react'
import './home.scss'
import Stories from './../stories/Stories';
import AddPost from '../addPost/AddPost';

const Home = () => {
  return (
    <div className='home'>
      <Stories />
      <AddPost />
    </div>
  )
}

export default Home