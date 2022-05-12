import { useState, useContext } from "react";
import "./Header.scss";
import { MyContext } from "../context/Context";
import Modal from "../utils/Modal/Modal";
import LoginForm from "../RegisterForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { Navigate } from "react-router-dom";
import axios from "axios";
const Header = () => {
  const { username, loggedIn,handleLogin, searchQueryInput, setSearchQueryInput, setPageNumber } =
    useContext(MyContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  function handleSearch(e) {
    setSearchQueryInput(e.target.value);
    setPageNumber(1);
  }

  const logout =async () => {
    try {
      await axios.get("/api/users/logout");
      handleLogin(""); // empty strings will resolve to falsey value

      // Navigate("/");
    } catch (error) {
      console.log(error);
      // setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  }

  return (
    <div className="header-container">
      <div>LOGO</div>
      <input value={searchQueryInput} onChange={handleSearch} type="text" />
      {!loggedIn ? <>
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
      </>:
      <button onClick={logout}>Logout</button>
      }
      {showLoginModal && (
        <Modal
          component={<LoginForm setShowLoginModal={setShowLoginModal} />}
          setShowModal={setShowLoginModal}
        />
      )}
      {showRegisterModal && (
        <Modal
          component={<RegisterForm setShowRegisterModal={setShowRegisterModal} />}
          setShowModal={setShowRegisterModal}
        />
      )}
      {  (username && loggedIn) && <p>Logged in as {username}</p>}
    </div>
  );
};

export default Header;
