import React, { useContext } from 'react'
import './follower.scss'
import { Link } from 'react-router-dom'
import { UsersContext } from '../../context/usersContext'
import { Close } from '@mui/icons-material'


const Follower = ({ setToggleModel, usrId, toggleProps }) => {
  const { users } = useContext(UsersContext)


  return (
    <div className='follower'>
      <div className="close" onClick={() => setToggleModel(false)}></div>
      <div className="container">
        <Close onClick={() => setToggleModel(false)} />
        {toggleProps === 'followers' &&
          users?.map((item) => item.uid === usrId && (
            item.followers?.map((user, ke) => (
              <div className="user" key={ke}>
                <Link to={`/socialapp/profile/${user.uid}`} style={{ textDecoration: 'none' }} className="user_info">
                  <img src={user.profileImg} alt="" />
                  <span>{user.name}</span>
                </Link>
                <button>follow</button>
              </div>
            ))
          ))
        }

        {toggleProps === 'following' &&
          users?.map((item) => item.uid === usrId && (
            item.following?.map((user, ke) => (
              <div className="user" key={ke}>
                <Link to={`/socialapp/profile/${user.uid}`} style={{ textDecoration: 'none' }} className="user_info">
                  <img src={user.profileImg} alt="" />
                  <span>{user.name}</span>
                </Link>
                <button>follow</button>
              </div>
            ))
          ))
        }
      </div>
    </div>
  )
}

export default Follower