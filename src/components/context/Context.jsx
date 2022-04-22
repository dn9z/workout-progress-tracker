import { createContext, useState } from "react";
// import { useLocation } from "react-router-dom";
import mockEntries from "../../mockEntries";
const MyContext = createContext(null)

const types = [{
  typeName: 'weights',
  withWeights: true,
},{
  typeName: 'bodyweight',
  withWeights: false,
},{
  typeName: 'distance',
  withWeights: false,
}]

const MyProvider = ({children}) => {

  const [entries, setEntries] = useState(mockEntries);
  const [types, setTypes] = useState([]);
  
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