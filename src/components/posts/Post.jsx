import React, { useContext, useEffect, useState } from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from './../comments/Comments';
import { AuthContext } from '../../context/authContext';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { PostsContext } from '../../context/postsContext';

const Post = ({ post }) => {

  const [menuTogle, setMenuTogle] = useState(false)
  const [commentTogle, setCommentTogle] = useState(false);
  const { userData, avtar } = useContext(AuthContext)
  const { commentsArray } = useContext(PostsContext)
  const singlePostDocument = doc(db, "posts", post.documentId);
  const likesRef = doc(collection(db, "posts", post.documentId, "likes"));
  const likesCollection = collection(db, "posts", post.documentId, "likes");
  const [liked, setLiked] = useState(null)


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

  const getLikes = async () => {
    try {
      const q = collection(db, "posts", post.documentId, "likes");
      await onSnapshot(q, (doc) => {
        setLiked(doc.docs.map((item) => item.data()))
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLike = async () => {
    const q = query(likesCollection, where("uid", "==", userData?.uid));
    const querySnapshot = await getDocs(q);
    const likesDocId = await querySnapshot?.docs[0]?.id;
    try {
      if (likesDocId !== undefined) {
        const deleteId = doc(db, "posts", post.documentId, "likes", likesDocId);
        await deleteDoc(deleteId);
      }
      else {
        await setDoc(likesRef, {
          name: userData?.name,
          uid: userData?.uid,
        });
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    getLikes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="user_info">
            <Link to={`/socialapp/profile/${post.uid}`}>
              <img src={post.profilePic || avtar} alt="" />
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
          <img onDoubleClick={handleLike} src={post.img} alt="" />
        </div>
        <div className="info" onClick={() => setMenuTogle(false)}>
          <div className="item">
            {liked ?
              <FavoriteOutlinedIcon style={{ color: '#5271ff' }} onClick={handleLike} />
              :
              <FavoriteBorderOutlinedIcon onClick={handleLike} />}
            <span className='like'>
              {liked?.length > 0 && liked?.length}
              <div className="user_like">
                {liked?.map((item, ke) =>
                  <Link key={ke} to={`/socialapp/profile/${post.uid}`}>
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            </span>
          </div>
          <div className="item" onClick={() => setCommentTogle(!commentTogle)}>
            <TextsmsOutlinedIcon />
            {commentsArray?.length > 0 && commentsArray?.length}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentTogle && <Comments documentId={post.documentId} userUid={post.uid} />}
      </div>
    </div>
  )
}

export default Post