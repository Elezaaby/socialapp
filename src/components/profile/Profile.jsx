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
import { CameraAltOutlined } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import Post from './../posts/Post';
import { useState } from 'react';
import { collection, where, query, onSnapshot, orderBy, updateDoc, getDocs } from "firebase/firestore";

import { db } from '../../firebase';
import { AuthContext } from '../../context/authContext';
import AddPost from './../addPost/AddPost';
import { FollowUserContext } from '../../context/followUserContext';
import { PostsContext } from '../../context/postsContext';
import { UsersContext } from './../../context/usersContext';
import Follower from '../follower/Follower';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';


const Profile = () => {

  const { usrId } = useParams();
  const { userData, avtar } = useContext(AuthContext)
  const { users } = useContext(UsersContext)
  const { followUser, unFollowedUser, handelFollowers, unFollowersUser } = useContext(FollowUserContext)
  const [toggleModel, setToggleModel] = useState(false)
  const [toggleProps, setToggleProps] = useState('')
  const [profileData, setProfileData] = useState(null);
  const [postsUoser, setPostsUoser] = useState(null);
  const [unfollow, setUnfollow] = useState(null);
  const [imageUpdate, setImageUpdate] = useState(null);
  const [progressBar, setProgressBar] = useState(null);
  const collectionUserRef = collection(db, 'users')
  const { setSearchToggle } = useContext(PostsContext)
  const storage = getStorage();





  const fro = () => {
    userData.following?.map((item) => item.uid === usrId && (
      setUnfollow(item)
    ))
  }

  const handelfollowClick = () => {
    followUser(usrId, profileData.profileImg, profileData.name)
    handelFollowers(userData?.uid, userData?.profileImg, userData?.name, usrId)
  }
  const handelUnFollowClick = () => {
    unFollowedUser(usrId, profileData.profileImg, profileData.name)
    unFollowersUser(userData?.uid, userData?.profileImg, userData?.name, usrId)
  }

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
    setSearchToggle(false)

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
    setUnfollow(null)
    setToggleModel(false)
    setToggleProps('')
    fro()
    submitImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usrId, userData.following, imageUpdate?.name])

  const handelModelFollowing = () => {
    setToggleModel(true)
    setToggleProps('following')
  }
  const handelModelFollowers = () => {
    setToggleModel(true)
    setToggleProps('followers')
  }

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const submitImage = async () => {
    const fileType = imageUpdate && metadata.contentType.includes(imageUpdate["type"]);
    if (!imageUpdate) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `profileImages/${imageUpdate.name}${userData.uid}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          imageUpdate,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                const q = query(collectionUserRef, where("uid", "==", userData?.uid))
                const doc = await getDocs(q);
                const data = doc.docs[0].ref;
                await updateDoc(data, {
                  "profileImg": downloadURL
                });
                setImageUpdate(null)
                setProgressBar(0)
              }
            );
          }
        );
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  

  return (
    <div className='profile'>
      <div className="images">
        <img src={profileData?.coverImg} alt="" className="cover" />
        <div className="profile_img">
          <img src={profileData?.profileImg || avtar} alt="" />
          {userData?.uid === usrId &&
            <label className="update_img" htmlFor='updateImage'>
              <input type="file" id="updateImage" onChange={(e) => setImageUpdate(e.target.files[0])} style={{ display: "none" }} />
              <CameraAltOutlined />
            </label>
          }
        </div>
      </div>
      <div className="profile_container">
        <div className="user_profile_info">
          <div className="left">
            <div className="link">
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
            <div className="follow">
              {users?.map((item, ke) => item.uid === usrId && (<span key={ke} onClick={handelModelFollowing} >{item.following?.length} following</span>))}
              {users?.map((item, ke) => item.uid === usrId && (<span key={ke} onClick={handelModelFollowers}>{item.followers?.length} followers</span>))}
            </div>
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
            {unfollow ?
              <button onClick={handelUnFollowClick} className='unfollowed'>unfollow</button>
              :
              userData?.uid !== usrId ?
                <button onClick={handelfollowClick} >follow</button>
                : ""
            }
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>

        {toggleModel && <Follower setToggleModel={setToggleModel} usrId={usrId} toggleProps={toggleProps} />}

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