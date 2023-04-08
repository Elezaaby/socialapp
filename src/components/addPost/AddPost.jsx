import React, { useContext, useRef, useEffect } from 'react'
import './addPost.scss'
import { AuthContext } from '../../context/authContext'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../../firebase';
import { PostsContext } from '../../context/postsContext';
import Friends from "../../assets/friend.png";
import AddImg from "../../assets/img.png";
import Map from "../../assets/map.png";


const AddPost = () => {
  const { userData, user, avtar } = useContext(AuthContext)
  const { getPosts, imageInput, setImageInput, progressBar, setProgressBar, image, setImage } = useContext(PostsContext)
  const postRef = doc(collection(db, "posts"));
  const storage = getStorage();
  const document = postRef.id;
  const inputText = useRef("");


  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (inputText.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          profilePic: user?.photoURL || userData?.profileImg,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          desc: inputText.current.value,
          img: image,
          timestamp: serverTimestamp(),
        });
        inputText.current.value = "";
      } catch (err) {
        console.log(err.message);
      }
    }
  };

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
    const fileType = imageInput && metadata.contentType.includes(imageInput["type"]);
    if (!imageInput) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${imageInput.name}${userData.uid}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          imageInput,
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
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    submitImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageInput?.name]);


  return (
    <div className='addPost'>
      <div className="top">
        <div className="input">
          <div className="user">
            <img src={userData.profileImg || avtar} alt="" />
          </div>
          <form onSubmit={handleSubmitPost} className="inputP">
            <input ref={inputText} type="text" placeholder={`What's on your mind ${userData.name}?`} />
          </form>
        </div>
        {image && (
          <div className='uplodImg'>
            <img src={image} alt="previewImage" />
          </div>
        )}
      </div>
      <div className='progressBar' style={{ width: `${progressBar}%` }}></div>
      <div className="bottom">
        <div className="menu">
          <div className="item">
            <input onChange={(e) => setImageInput(e.target.files[0])} id="addImage" type="file" style={{ display: "none" }} />
            <label htmlFor="addImage">
              <img src={AddImg} alt="" />
            </label>
            <label htmlFor="addImage">Add Image</label>
          </div>
          <div className="item">
            <img src={Map} alt="" />
            <span>Add Place</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Tag Friends</span>
          </div>
        </div>
        <button onClick={handleSubmitPost}>Share</button>
      </div>
    </div>
  )
}

export default AddPost