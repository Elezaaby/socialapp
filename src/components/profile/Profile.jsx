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
import { Link, useParams } from 'react-router-dom';
import Post from './../posts/Post';
import { useState } from 'react';
import { collection, where, query, onSnapshot, orderBy } from "firebase/firestore";

import { db } from '../../firebase';
import { AuthContext } from '../../context/authContext';
import AddPost from './../addPost/AddPost';
import { FollowUserContext } from '../../context/followUserContext';


const Profile = () => {

  const { usrId } = useParams();
  const { userData } = useContext(AuthContext)
  const { followUser, unFollowedUser } = useContext(FollowUserContext)
  const [profileData, setProfileData] = useState(null);
  const [postsUoser, setPostsUoser] = useState(null);
  const [unfollowed, setUnfollowed] = useState(null);


  const fro = () => {
    userData.followers?.map((item) => item.uid === usrId && (
      setUnfollowed(item)
    ))
  }

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })

    const getUserProfile = async () => {
      const q = query(collection(db, "users"), where("uid", "==", usrId));
      await onSnapshot(q, (doc) => {
        setProfileData(doc.docs[0].data());
      });
    };

    const getPostsUser = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "asc"), where("uid", "==", usrId));
      await onSnapshot(q, (doc) => {
        setPostsUoser(doc?.docs?.map((item) => item?.data()).reverse());
      });
    };
    getUserProfile();
    getPostsUser()
    setUnfollowed(null)
    fro()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usrId, userData.followers])

  return (
    <div className='profile'>
      <div className="images">
        <img src={profileData?.coverImg} alt="" className="cover" />
        <img src={profileData?.profileImg} alt="" className="profile_img" />
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
            <span>{profileData?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{profileData?.userName}</span>
              </div>
            </div>
            {unfollowed ?
              <button onClick={() => unFollowedUser(usrId, profileData.profileImg, profileData.name)} className='unfollowed'>unfollowed</button>
              :
              userData?.uid !== usrId ?
                <button onClick={() => followUser(usrId, profileData.profileImg, profileData.name)} >follower</button>
                : ""
            }
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>

        {userData?.uid === usrId && <AddPost />}

        <div className='posts'>
          {postsUoser?.length >= 1 ?
            postsUoser?.map((post, ke) => (
              <Post post={post} key={ke} />
            ))
            :
            <div className='no_posts'>There are no posts for this account</div>
          }
        </div>

      </div>
    </div >
  )
}

export default Profile