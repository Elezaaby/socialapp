import React, { useContext, useEffect, useState } from 'react'
import './modelUpdate.scss'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/authContext'
import { CameraAltOutlined } from '@mui/icons-material'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const ModelUpdate = ({ setToggleModelUpdateName, usrId }) => {
  const collectionUserRef = collection(db, 'users')
  const { userData, avtar } = useContext(AuthContext)
  const [inputName, setInputName] = useState(userData?.name)
  const storage = getStorage();
  const [imageUpdate, setImageUpdate] = useState(null);
  const [progressBar, setProgressBar] = useState(0);


  const updateName = async () => {
    const q = query(collectionUserRef, where("uid", "==", userData?.uid))
    const doc = await getDocs(q);
    const data = doc.docs[0].ref;
    await updateDoc(data, {
      "name": inputName
    });
    setToggleModelUpdateName(false)
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


  const handelSave = () => {
    updateName()
    setToggleModelUpdateName(false)
  }

  console.log(imageUpdate)
  useEffect(() => {
    submitImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUpdate?.name])


  return (
    <div className='update_name'>
      <div className="close" onClick={() => setToggleModelUpdateName(false)}></div>
      <div className="container">
        <div className="profile_img">
          <img src={userData?.profileImg || avtar} alt="" />
          <label className="update_img" htmlFor='updateImage'>
            <input type="file" id="updateImage" onChange={(e) => setImageUpdate(e.target.files[0])} style={{ display: "none" }} />
            <CameraAltOutlined />
          </label>
        </div>

        <input autoFocus type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} />

        <button onClick={handelSave}>Save</button>
        <div className='progressBar' style={{ width: `${progressBar}%` }}></div>
      </div>
    </div>
  )
}

export default ModelUpdate