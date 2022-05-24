import { useState, useContext, useEffect } from "react";
import "./Header.scss";
import { MyContext } from "../context/Context";
import Modal from "../utils/Modal/Modal";
import LoginForm from "../UserForms/LoginForm";
import RegisterForm from "../UserForms/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../resources/dumbbell.png";
const Header = () => {
  const { username, loggedIn, handleLogin, searchQueryInput, setSearchQueryInput, setPageNumber } =
    useContext(MyContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [avatarPath, setAvatarPath] = useState("");
  const navigate = useNavigate();
  function handleSearch(e) {
    setSearchQueryInput(e.target.value);
    setPageNumber(1);
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      handleLogin(""); // empty strings will resolve to falsey value

      // Navigate("/");
    } catch (error) {
      console.log(error);
      // setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  };

  async function getAvatar() {
    const res = await axios.get("/api/users/getavatar");
    setAvatarPath(res.data.user.avatar);
  }
  useEffect(() => {
    getAvatar();
  }, []);
  useEffect(() => {
    getAvatar();
  }, [showLoginModal]);
  return (
    <div className="header-container">
      <div className="searchbar">
        <input value={searchQueryInput} onChange={handleSearch} type="text" />
      </div>
      <div className="header-main">
        {/* {username && loggedIn && <p>Logged in as {username}</p>} */}
        <div className="logo">
          <img className="logo" src={logo} alt="logo" />
          <span>fitme</span>
        </div>

        {!loggedIn ? (
          <div className="logged-out">
            <button
              onClick={() => {
                setShowLoginModal(true);
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowRegisterModal(true);
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="logged-in">
            <div
              onClick={() => {
                navigate(`/profile`);
              }}
              className="avatar-container"
            >
              <img src={`/${avatarPath}`} alt="" />
            </div>
            <div className="logout-button" onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </div>
        )}
        {showLoginModal && (
          <Modal
            component={<LoginForm setShowLoginModal={setShowLoginModal} />}
            setShowModal={setShowLoginModal}
          />
        )}
      </div>

      {showRegisterModal && (
        <Modal
          component={<RegisterForm setShowRegisterModal={setShowRegisterModal} />}
          setShowModal={setShowRegisterModal}
        />
      )}
    </div>
  );
};

export default Header;
