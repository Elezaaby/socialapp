import React, { useContext } from 'react'
import './comments.scss'
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';


const Comments = () => {
  const { userData } = useContext(AuthContext);


  ////////////////////////// Temparary //////////////////////////////
  const comments = [
    {
      id: 1,
      desc: "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium recusandae nihil cumque ratione animi, eius accusantium aliquid velit architecto nobis tempora totam quam aut ullam ducimus deleniti repudiandae? Nesciunt, eius.",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      name: "Jane Doe",
      userId: 6,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return (
    <div className='comments'>
      <div className="write_comment">
        <img src={userData.profileImg} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>comment</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <Link to={`/socialapp/profile/${comment.userId}`}>
            <img src={comment.profilePicture} alt="" />
          </Link>
          <div className="comment_info">
            <Link to={`/socialapp/profile/${comment.userId}`}>
              <span>{comment.name}</span>
            </Link>
            <p>{comment.desc}</p>
          </div>
          <span className='comment_date'>1 hour ago</span>
        </div>
      ))}
    </div>
  )
}

export default Comments