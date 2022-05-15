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

    try {
      const response = await axios.post("/api/users/register", data);

      if (response.status === 200) {
        //everything went well!
        console.log("user was created");
        //  navigate("/login");
        setShowRegisterModal(false)
      }
    } catch (error) {
      console.log(error);
      // setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div>
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>

        <div>
          <label>Email address</label>
          <input type="email" name="email" placeholder="Enter email" />
        </div>

        <div>
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password" />
        </div>

        <div>
          <label>Re-Password</label>
          <input type="password" name="repassword" placeholder="Enter password" />
        </div>
        {/* <ErrorMessage isVisible={isError} errorMessage={errorMessage} /> */}
        <button>Sign Up</button>
        <p>
          Already registered <Link to="/login">sign in?</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
