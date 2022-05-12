import { createContext, useState } from "react";
// import { useLocation } from "react-router-dom";
import mockEntries from "../../mockEntries";
const MyContext = createContext(null);

const MyProvider = ({ children }) => {
  const loginSession = JSON.parse(sessionStorage.getItem("login")) || {
    username: "",
    loggedIn: false,
  };

  const [username, setUsername] = useState(loginSession["username"]);
  const [loggedIn, setLoggedIn] = useState(loginSession["loggedIn"]);

  const handleLogin = (_username) => {
    if (_username) {
      setUsername(_username);
      setLoggedIn(true);
    } else {
      setUsername("");
      setLoggedIn(false);
    }
  };

  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <MyContext.Provider
      value={{
        username,
        loggedIn,
        handleLogin,
        searchQueryInput,
        setSearchQueryInput,
        pageNumber,
        setPageNumber,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
