import React, { useContext, useState } from 'react'
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
import Search from '../search/Search';
import { PostsContext } from './../../context/postsContext';


const Navbar = () => {

  const { userData, logOutUser } = useContext(AuthContext)
  const { toggle, pageMode } = useContext(ModeContext)
  const { setSearchToggle, searchToggle } = useContext(PostsContext)
  const [inputSearch, setInputSearch] = useState('')


  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/socialapp/home" style={{ textDecoration: "none" }}>
          <span>SocialApp</span>
        </Link>
        <Link to="/socialapp/home" >
          <HomeOutlinedIcon />
        </Link>
        {pageMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon onClick={() => setSearchToggle(!searchToggle)} />
          <input onClick={() => setSearchToggle(!searchToggle)} onChange={(e) => setInputSearch(e.target.value)} type='text' placeholder='search' />
        </div>
        {searchToggle && <Search inputSearch={inputSearch} setInputSearch={setInputSearch} />}
      </div>
      <div className="right">
        <Link to={`/socialapp/profile/${userData.uid}`}>
          <PersonOutlinedIcon />
        </Link>
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