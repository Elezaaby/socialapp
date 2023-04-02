import React, { useContext } from 'react'
import './rightBar.scss'
import { UsersContext } from '../../context/usersContext'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const RightBar = () => {

  const { users } = useContext(UsersContext)
  const { userData } = useContext(AuthContext)
  return (
    <div className='rightBar'>
      <div className="container">
        <div className="menu">
          <span>Suggestions For You</span>
          {users?.map((user, ke) => ke <= 2 && (
            <div className="user" key={ke}>
              <Link to={`/socialapp/profile/${user.uid}`} style={{ textDecoration: 'none' }} className="user_info">
                <img src={user.profileImg} alt="" />
                <span>{user.name}</span>
              </Link>
              <div className="btn">
                <button>follow</button>
                <button>dismiss</button>
              </div>
            </div>
          ))}
        </div>
        <div className="menu">
          <span>Latest Activities</span>
          <div className="user">
            <div className="user_info">
              <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
              <p>
                <span>Adisdc md </span>
                Lorem ipsum dolor sit amet .
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="user_info">
              <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
              <p>
                <span>Adisdc md </span>
                Lorem ipsum dolor sit amet .
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="user_info">
              <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
              <p>
                <span>Adisdc md </span>
                Lorem ipsum dolor sit amet .
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="user_info">
              <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
              <p>
                <span>Adisdc md </span>
                Lorem ipsum dolor sit amet .
              </p>
            </div>
            <span>1 min ago</span>
          </div>

        </div>
        <div className="menu">
          <span>Online Friends</span>
          {userData.followers ?
            userData.followers?.map((item, ke) =>
              <div className="user" key={ke}>
                <div className="user_info">
                  <img
                    src={item.profileImg}
                    alt=""
                  />
                  <div className="online" />
                  <span>{item.name}</span>
                </div>
              </div>
            )
            :
            <div className='no_follow'>Follow more friends</div>
          }
        </div>
      </div>
    </div>
  )
}

export default RightBar