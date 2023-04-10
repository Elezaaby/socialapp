import React from 'react'
import Message from './Message';
import './messages.scss'
import MessageDetails from './MessageDetails';

const Messages = () => {

  const MessageArray = [
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
    {
      uid: '121',
      idChat: '232323',
      profileImg: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png',
      name: 'mahmoud',
    },
  ]


  return (
    <div className='messages'>
      <div className="container_message">
        {MessageArray.map((item, ke) =>
          <Message key={ke} item={item} />
        )}
      </div>
      <MessageDetails />
    </div>
  )
}

export default Messages