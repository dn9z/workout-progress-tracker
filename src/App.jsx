import "./App.scss";
import Home from "./routes/Home/Home";
import { MyProvider } from "./components/context/Context";
import { Routes, Route } from "react-router-dom";
import Details from "./routes/Details/Details";
import Edit from "./routes/Edit/Edit";
import Chart from "./routes/Chart/Chart";
import Workout from "./routes/Workout/Workout";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <MyProvider>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workout />}>
            <Route path="/workouts/details/:id" element={<Details />} />
            <Route path="/workouts/edit/:id" element={<Edit />} />
          </Route>
          <Route path="/chart" element={<Chart />} />
          {/* <Route path="*" element={<Home/>} /> */}
        </Routes>
      </main>
    </MyProvider>
  );
}

export default App;
