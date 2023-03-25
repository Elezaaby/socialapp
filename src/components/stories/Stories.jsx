import React, { useContext } from 'react'
import './stories.scss'
import { AuthContext } from './../../context/authContext';
import Storie from './Storie';

const Stories = () => {

  const { userData } = useContext(AuthContext)

  ////////////////////////// Temporary //////////////////////////////
  const stories = [
    {
      id: 1,
      name: "test name",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "test name2",
      img: "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      name: "test name 3",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 4,
      name: "test name 4",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];


  return (
    <div className='stories'>
      <div className="storie">
        <img src={userData.profileImg} alt="" />
        <button>+</button>
      </div>
      {stories.map((storieItem, ke) => (
        <Storie storieItem={storieItem} key={ke} />
      ))}
    </div>
  )
}

export default Stories