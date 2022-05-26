import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/Context";
import logo from "../../resources/dumbbell.png";

import "./LoginForm.scss";
const LoginForm = () => {
  const { handleLogin } = useContext(MyContext);

  const navigate = useNavigate();
  // const { handleLogin } = useContext(AppContext);

  // const[isError, setIsError] = useState(false)//is there an error?
  // const[errorMessage, setErrorMessage] = useState("")//the error message itself.

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post("/api/users/login", data);

      handleLogin(response.data.user.username);
      // redirect
      navigate("/");
      // setShowLoginModal(false)
      // nav
    } catch (error) {
      console.log(error);
      // setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-title"> <div className="logo">
          <img className="logo" src={logo} alt="logo" />
          <span>fitme</span>
        </div></div>
      <h2 className="login-form-subtitle">Demo account: demo@demo.com Password: 1234</h2>
      <form className="login-area-container" onSubmit={handleSubmit}>
        <div className="login-input-container">
          <input id="login-email" name="email" type="email" placeholder=" " required={true} />

          <label htmlFor='login-email' className="placeholder">
            Email
          </label>
        </div>
        <div className="login-input-container">
          <input id="login-password" name="password" type="password" placeholder=" " required={true} />

          <label htmlFor='login-password' className="placeholder">
            Password
          </label>
        </div>
        {/* <ErrorMessage isVisible={isError} errorMessage={errorMessage}  /> */}
        <button>Login</button>
      </form>
      <div>
        <span>No account? </span>
        <Link to="/register">Sign Up!</Link>
      </div>
    </div>
  );
};

export default LoginForm;
