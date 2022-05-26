import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = ({setShowRegisterModal}) => {
  const navigate = useNavigate();
  // const [isError, setIsError] = useState(false)
  // const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit the form");
    const formData = new FormData(event.target);

    const data = {
      username: formData.get("username"), //get the data from the input with name username
      email: formData.get("email"), //...
      password: formData.get("password"),
    };
    if(formData.get("password") === formData.get("repassword")){
      try {
        const response = await axios.post("/api/users/register", data);
  
        if (response.status === 200) {
          //everything went well!
          console.log("user was created");
           navigate("/login/");
          // setShowRegisterModal(false)
        }
      } catch (error) {
        console.log(error);
        // setIsError(true);
        // setErrorMessage(error.response.data.message);
      }
    }else{
      alert('Password does not match!')
    }
    
  };

  return (
    <div className="login-form-container">
      <form className="login-area-container"  onSubmit={handleSubmit}>
        <h1 className="login-form-title">Sign Up</h1>
        <div className="login-input-container">
          <input id="register-username" type="text" name="username" placeholder=" " />
          <label htmlFor="register" className="placeholder">Username</label>
        </div>

        <div className="login-input-container">
          <input  id="register-email"type="email" name="email" placeholder=" " />
          <label htmlFor="register-email" className="placeholder">Email address</label>
        </div>

        <div className="login-input-container">
          <input id="register-password" type="password" name="password" placeholder=" " />
          <label htmlFor="register-password" className="placeholder">Password</label>
        </div>

        <div className="login-input-container">
          <input id="register-re-password" type="password" name="repassword" placeholder=" " />
          <label htmlFor="register-re-password" className="placeholder">Re-Password</label>
        </div>
        {/* <ErrorMessage isVisible={isError} errorMessage={errorMessage} /> */}
        <button>Sign Up</button>
        <p>
          Already registered? <Link to="/login">Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
