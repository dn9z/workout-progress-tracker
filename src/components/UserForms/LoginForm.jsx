import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../context/Context";

const LoginForm = ({setShowLoginModal}) => {
  const { handleLogin } = useContext(MyContext);

  // const navigate = useNavigate();
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
      // navigate("/list-users");
      setShowLoginModal(false)
    } catch (error) {
      console.log(error);
      // setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" required={true} />
        </label>
        <label>
          Password
          <input name="password" type="password" required={true} />
        </label>
        {/* <ErrorMessage isVisible={isError} errorMessage={errorMessage}  /> */}
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
