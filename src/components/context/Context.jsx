import { createContext, useState } from "react";
// import { useLocation } from "react-router-dom";
import mockEntries from "../../mockEntries";
const MyContext = createContext(null)



const MyProvider = ({children}) => {

  const [searchQueryInput, setSearchQueryInput] = useState('');
  const [pageNumber, setPageNumber] = useState(1)

  
  return(
    <MyContext.Provider value={{searchQueryInput, setSearchQueryInput,pageNumber, setPageNumber}}>
      {children}
    </MyContext.Provider>
  )

}

export {MyProvider, MyContext}