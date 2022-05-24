import axios from "axios";
import { useState, useEffect } from "react";
import "./ProfileAvatarUi.scss";
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
          <img src={`/${avatarPath}`} alt="" />
        </div>

        <form className="avatar-form" onSubmit={handleSubmitForm} encType="multipart/form-data">
          <label>Upload your avatar</label>
          <input type="file" name="avatar" accept="image/*" />
          <button type="submit">Submit form</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileAvatarUi;
