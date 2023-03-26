import React from 'react'
import './posts.scss'
import Post from './Post';

const Posts = () => {

  ////////////////////////// Temporary //////////////////////////////
  const posts = [
    {
      id: 1,
      name: "nhola ",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, quaerat assumenda ipsa quisquam quod blanditiis!",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "mahmoud adel",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, reiciendis quam ex enim aliquam neque sequi dignissimos sapiente quasi ducimus nemo in commodi fugiat tempore? Eos dignissimos ipsa eligendi sunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, reiciendis quam ex enim aliquam neque sequi dignissimos sapiente quasi ducimus nemo in commodi fugiat tempore? Eos dignissimos ipsa eligendi sunt.",
    },
    {
      id: 3,
      name: "test name",
      userId: 4,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam cum, tenetur sapiente fugit maiores amet eum assumenda aliquid! Odio, quas.",
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 4,
      name: "test name",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam cum, tenetur sapiente fugit maiores amet eum assumenda aliquid! Odio, quas.",
    },
  ];

  return (
    <div className='posts'>
      {posts.map((post, ke) => (
        <Post post={post} key={ke} />
      ))}
    </div>
  )
}

export default Posts