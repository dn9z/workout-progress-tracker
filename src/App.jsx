import "./App.scss";
import Dashboard from "./routes/Dashboard/Dashboard";
import { MyProvider } from "./components/context/Context";
import { Routes, Route } from "react-router-dom";
import Details from "./routes/Workout/Details/Details";
import Edit from "./routes/Workout/Edit/Edit";
import Chart from "./routes/Chart/Chart";
import Workout from "./routes/Workout/Workout";
import Navbar from "./components/Navbar/Navbar";
import Calendar from "./routes/Calendar/Calendar";
import Header from "./components/Header/Header";
import Profile from "./routes/Profile/Profile";
import Settings from "./routes/Settings/Settings";
function App() {
  return (
    <MyProvider>
      <main>
        <Navbar />
        <section>
          <Header />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workouts" element={<Workout />}>
                <Route path="/workouts/details/:_id" element={<Details />} />
                <Route path="/workouts/edit/:_id" element={<Edit />} />
              </Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
              {/* <Route path="*" element={<Home/>} /> */}
            </Routes>
          </div>
        </section>
      </main>
    </MyProvider>
  );
}

export default App;
