import { useContext } from "react";
import { MyContext } from "../../context/Context";
import "./Welcome.scss";
const Welcome = ({ workouts }) => {
  const { username } = useContext(MyContext);

  function getDaysSinceLastWorkout() {
    const lastDate = new Date(Date.parse(workouts[workouts.length - 1].date));
    const today = new Date();
    const milliseconds = today.getTime() - lastDate.getTime();
    const days = milliseconds / (1000 * 60 * 60 * 24);
    return Math.floor(days);
  }
  return (
    <div className="welcome-container">
      <p className="greeting">
        Welcome <span>{username}</span>
      </p>
      {workouts.length && (
        <p className="since-last-days">
          It's been {getDaysSinceLastWorkout()} days since your last workout!
        </p>
      )}
    </div>
  );
};

export default Welcome;
