import React, { useContext, useState } from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from './../comments/Comments';
import { AuthContext } from '../../context/authContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const Post = ({ post }) => {

  const [liked, setLiked] = useState(false)
  const [menuTogle, setMenuTogle] = useState(false)
  const [commentTogle, setCommentTogle] = useState(false);
  const { userData } = useContext(AuthContext)
  const singlePostDocument = doc(db, "posts", post.documentId);


  const deletePost = async () => {
    try {
      if (userData?.uid === post.uid) {
        await deleteDoc(singlePostDocument);
        setMenuTogle(false)
      }
    } catch (err) {
      setMenuTogle(false)
      console.log(err.message);
    }
  };

  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="user_info">
            <Link to={`/socialapp/profile/${post.uid}`}>
              <img src={post.profilePic} alt="" />
            </Link>
            <div className="details">
              <Link to={`/socialapp/profile/${post.uid}`}>
                <span>{post.name}</span>
              </Link>
              <span>{new Date(post?.timestamp?.toDate())?.toUTCString()}</span>
            </div>
          </div>
          {userData?.uid === post.uid &&
            <div>
              <MoreHorizIcon onClick={() => setMenuTogle(!menuTogle)} />
              {menuTogle &&
                <div className='drop_delete_update'>
                  <button onClick={deletePost}>Delete</button>
                  <button>Update</button>
                </div>
              }
            </div>
          }
        </div>
        <div onClick={() => setMenuTogle(false)} className="content">
          <p>{post.desc}</p>
          <img onDoubleClick={() => setLiked(!liked)} src={post.img} alt="" />
        </div>
        <div className="info" onClick={() => setMenuTogle(false)}>
          <div className="item">
            {liked ? <FavoriteOutlinedIcon style={{ color: '#5271ff' }} onClick={() => setLiked(!liked)} /> : <FavoriteBorderOutlinedIcon onClick={() => setLiked(!liked)} />}
            120 Likes
          </div>
          <div className="item" onClick={() => setCommentTogle(!commentTogle)}>
            <TextsmsOutlinedIcon />
            10 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentTogle && <Comments />}
      </div>
    </div>
  )
}

export default Post