import React, { useContext } from 'react'
import './addPost.scss'
import { AuthContext } from '../../context/authContext'

import Friends from "../../assets/friend.png";
import AddImg from "../../assets/img.png";
import Map from "../../assets/map.png";


const AddPost = () => {
  const { userData } = useContext(AuthContext)

  return (
    <div className='addPost'>
      <div className="top">
        <div className="user">
          <img src={userData.profileImg} alt="" />
        </div>
        <div className="inputP">
          <input type="text" placeholder={`What's on your mind ${userData.name}?`} />
        </div>
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
        <button>Share</button>
      </div>
    </div>
  )
}

export default AddPost