import { Close } from '@mui/icons-material'
import React from 'react'

const ViewStorie = ({ setPlayStorie, storieImg, storieName }) => {
  return (
    <div className='view_storie'>
      <div className="close_storie" onClick={() => setPlayStorie(false)}></div>
      <div className="storie_container">
        <Close onClick={() => setPlayStorie(false)} />
        <img src={storieImg} alt="" />
        <span>{storieName}</span>
      </div>
    </div>
  )
}

export default ViewStorie