import React, { useState } from 'react'
import ViewStorie from './ViewStorie';

const Storie = ({ storieItem }) => {

  const [playStorie, setPlayStorie] = useState(false)

  return (
    <>
      <div className="storie" onClick={setPlayStorie} >
        <img src={storieItem.img} alt="" />
        <span>{storieItem.name}</span>
      </div>
      {playStorie && <ViewStorie storieName={storieItem.name} storieImg={storieItem.img} setPlayStorie={setPlayStorie} />}
    </>
  )
}

export default Storie