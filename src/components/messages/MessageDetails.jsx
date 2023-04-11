import React, { useContext } from 'react'
import './messages.scss'
import { Send } from '@mui/icons-material'
import { AuthContext } from '../../context/authContext';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const MessageDetails = () => {

  const { avtar } = useContext(AuthContext)

  return (
    <div className='message_details'>
      <div className="user_info">
        <div className="user">
          <img
            src={avtar}
            alt=""
          />
          <div className="online" />
          <span>mahmoud</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className="chat">
        <div className="left_message">
          <div className="message_text">
            test maessag
          </div>
        </div>
        <div className="left_message">
          <div className="message_text">
            test maessag
          </div>
        </div>
        <div className="right_message">
          <div className="message_text">
            test maessag2
          </div>
        </div>
        <div className="left_message">
          <div className="message_text">
            test maessag
          </div>
        </div>
        <div className="right_message">
          <div className="message_text">
            test maessag2
          </div>
        </div>
        <div className="left_message">
          <div className="message_text">
            test maessag
          </div>
        </div>
        <div className="right_message">
          <div className="message_text">
            test maessag2
          </div>
        </div>
        <div className="left_message">
          <div className="message_text">
            test maessag
          </div>
        </div>
        <div className="right_message">
          <div className="message_text">
            test maessag2
          </div>
        </div>
      </div>
      <div className="input_message">
        <input type="text" placeholder='Whats on your mind ' />
        <Send />
      </div>
    </div>
  )
}

export default MessageDetails