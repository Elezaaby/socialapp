import React, { useState } from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';

const Post = ({ post }) => {

  const [liked, setLiked] = useState(false)

  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="user_info">
            <Link to={`/socialapp/profile/${post.userId}`}>
              <img src={post.profilePic} alt="" />
            </Link>
            <div className="details">
              <Link to={`/socialapp/profile/${post.userId}`}>
                <span>{post.name}</span>
              </Link>
              <span>1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img onDoubleClick={() => setLiked(!liked)} src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon style={{ color: '#5271ff' }} onClick={() => setLiked(!liked)} /> : <FavoriteBorderOutlinedIcon onClick={() => setLiked(!liked)} />}
            120 Likes
          </div>
          <div className="item">
            <TextsmsOutlinedIcon />
            10 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post