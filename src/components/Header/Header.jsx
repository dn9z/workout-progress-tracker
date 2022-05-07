import { useContext } from 'react'
import './Header.scss'
import { MyContext } from "../context/Context";
const Header = () => {
  const {searchQueryInput, setSearchQueryInput, setPageNumber} = useContext(MyContext)

  function handleSearch(e) {
    setSearchQueryInput(e.target.value)
    setPageNumber(1)
  }

  return (
    <div className='header-container'>
      <div>LOGO</div>
      <input value={searchQueryInput} onChange={handleSearch} type="text" />
    </div>
  )
}

export default Header