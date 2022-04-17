import { createContext, useState } from "react";
// import { useLocation } from "react-router-dom";

const MyContext = createContext(null)

const MyProvider = ({children}) => {

  const [entries, setEntries] = useState([]);
  

  // const location = useLocation()
  // console.log(location)
  return(
    <MyContext.Provider value={{entries, setEntries}}>
      {children}
    </MyContext.Provider>
  )

}




export {MyProvider, MyContext}