import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import axios from "../utils/axiosInstance";
import { MyContext } from "../context/Context";

export default function Logout() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(MyContext);

  useEffect(() => {
    // declare a function and call it separately
    
    async function _logout() {
      try {
        await axios.get("/api/users/logout");
        handleLogin(""); // empty strings will resolve to falsey value
  
        navigate("/");
      } catch (e) {
        console.log(e)
      }
     
    }

    //  setTimeout(() => {
      _logout();
    // }, 500);

    // IIFE - create and run a function immediately
    // void (async function () {
    //   await axios.get("http://localhost:3001/api/users/logout");
    // })();
  }, []); // run once when component mounts

  return <h1>You are currently being logged out...</h1>;
}
