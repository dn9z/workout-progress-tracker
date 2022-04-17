import "./App.scss";
import Home from "./routes/Home/Home";
import { MyProvider } from "./components/context/Context";
import {Routes, Route} from 'react-router-dom'
import Details from "./routes/Details/Details";
import Edit from "./routes/Edit/Edit";
function App() {
  return (
    <MyProvider>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route path="/details/:id" element={<Details/>}/>
            <Route path="/edit/:id" element={<Edit/>}/>
          </Route>
        </Routes>
      </main>
    </MyProvider>
  );
}

export default App;
