import axios from "axios";
import { useState ,useEffect} from "react";

const ProfileAvatarUi = () => {
  const [path, setPath] = useState("");
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
      setPath(res.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    async function getAvatar(){
      const res = await axios.get('/api/users/getavatar')
      setPath(res.data.user.avatar)
    }
    getAvatar()
  }, [])

  return (
    <div className="App">
      <h1>File upload</h1>

      <img src={`/${path}`} alt="" />

      <form onSubmit={handleSubmitForm} encType="multipart/form-data">
        <label>
          Upload your avatar
          <input type="file" name="avatar" accept="image/*" />
        </label>
        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default ProfileAvatarUi;
