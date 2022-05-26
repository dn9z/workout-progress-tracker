import axios from "../utils/axiosInstance";
import { useState, useEffect } from "react";
import "./ProfileAvatarUi.scss";
import nopic from '../../resources/nopic.png'
const ProfileAvatarUi = () => {
  const [avatarPath, setAvatarPath] = useState("");
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const res = await axios.post("/api/users/uploadavatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAvatarPath(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getAvatar() {
      const res = await axios.get("/api/users/getavatar");
      setAvatarPath(res.data.user.avatar);
    }
    getAvatar();
  }, []);

  return (
    <div className="avatar-ui-container">
      <h1>Profile</h1>
      <div className="avatar-ui-wrapper">
        <div className="avatar-container">
          {avatarPath?<img src={`/${avatarPath}`} alt="" />:<img src={nopic} alt="" />}
        </div>

        <form className="avatar-form" onSubmit={handleSubmitForm} encType="multipart/form-data">
          <label>Upload your avatar</label>
          <input type="file" name="avatar" accept="image/*" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileAvatarUi;
