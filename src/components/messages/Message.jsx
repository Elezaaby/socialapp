import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const Message = ({ item }) => {

  const { avtar } = useContext(AuthContext)

  return (
    <div className='message'>
      <div className="menu">
        <div className="user">
          <div className="user_info">
            <img
              src={item.profileImg || avtar}
              alt=""
            />
            <div className="online" />
            <span>{item.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message