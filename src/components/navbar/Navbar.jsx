import React, { useContext } from 'react'
import './navbar.scss'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from 'react-router-dom';
import { AuthContext } from './../../context/authContext';
import { ModeContext } from '../../context/modeContext';


const Navbar = () => {

  const { userData, logOutUser } = useContext(AuthContext)
  const { toggle, pageMode } = useContext(ModeContext)


  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/socialapp/home" style={{ textDecoration: "none" }}>
          <span>SocialApp</span>
        </Link>
        <HomeOutlinedIcon />
        {pageMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type='text' placeholder='search' />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={`/socialapp/profile/${userData.uid}`}>
          <div className="user_info">
            <img src={userData.profileImg} alt="" />
            <span>{userData.name}</span>
          </div>
        </Link>
        <button onClick={logOutUser}>logOut</button>
      </div>
    </div>
  )
}

export default Navbar