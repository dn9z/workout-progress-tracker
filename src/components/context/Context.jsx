import { createContext, useState } from "react";
// import { useLocation } from "react-router-dom";
import mockArray from "../../mock";
const MyContext = createContext(null)

const MyProvider = ({children}) => {

  const [entries, setEntries] = useState(mockArray());
  // const [selection, setSelection] = useState({});
  // console.log(mockArray())

  // const location = useLocation()
  // console.log(location)
  return(
    <MyContext.Provider value={{entries, setEntries}}>
      {children}
    </MyContext.Provider>
  )

}




export {MyProvider, MyContext}