import React, { useEffect } from 'react'
import './home.scss'
import Stories from './../stories/Stories';
import AddPost from '../addPost/AddPost';
import Posts from './../posts/Posts';

const Home = () => {


  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }, [])


  return (
    <div className='home'>
      <Stories />
      <AddPost />
      <Posts />
    </div>
  )
}

export default Home