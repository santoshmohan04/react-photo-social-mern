import React, { useState } from "react";
import "./ImageUpload.css";
import axios from "../axios";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebase";

interface IProps {
  user: any;
}

let ImageUpload: React.FC<IProps> = ({ user }) => {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        const starsRef = ref(storage, "images/" + image.name);
        getDownloadURL(starsRef).then((url: any) => {
          setUrl(url);
          axios.post("/upload", {
            caption: caption,
            user: user.username,
            image: url,
          });
          setProgress(0);
          setCaption("");
          setImage(null);
        });
      }
    );
  };

  return (
    <React.Fragment>
      <div className="imageUpload">
        <progress
          className="imageUpload__progress"
          value={progress}
          max="100"
        />
        <input
          type="text"
          placeholder="Enter a caption..."
          className="imageUpload__input"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          className="imageUpload__file"
          type="file"
          onChange={handleChange}
        />
        <button className="imageUpload__button" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </React.Fragment>
  );
};
export default ImageUpload;
