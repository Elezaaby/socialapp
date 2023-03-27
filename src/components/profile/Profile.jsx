import React, { useContext, useEffect } from 'react'
import './profile.scss'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AuthContext } from './../../context/authContext';
import { Link } from 'react-router-dom';
import Posts from './../posts/Posts';

const Profile = () => {

  const { userData } = useContext(AuthContext)

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }, [])

  return (
    <div className='profile'>
      <div className="images">
        <img src={userData.coverImg} alt="" className="cover" />
        <img src={userData.profileImg} alt="" className="profile_img" />
      </div>
      <div className="profile_container">
        <div className="user_profile_info">
          <div className="left">
            <Link to="http://facebook.com" target='_blank'>
              <FacebookTwoToneIcon />
            </Link>
            <Link to="https://www.instagram.com" target='_blank'>
              <InstagramIcon />
            </Link>
            <Link to="https://twitter.com" target='_blank'>
              <TwitterIcon />
            </Link>
            <Link to="https://www.linkedin.com" target='_blank'>
              <LinkedInIcon />
            </Link>
          </div>
          <div className="center">
            <span>{userData.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>socialapp.dev</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        
        <Posts />

      </div>
    </div>
  )
}

export default Profile