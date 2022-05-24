import { useContext } from "react";
import { MyContext } from "../../context/Context";
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
    <>
      <p>Welcome {username}</p>
      {workouts.length && (
        <p>It's been {getDaysSinceLastWorkout()} days since your last workout!</p>
      )}
    </>
  );
};

export default Welcome;
