import React from "react";

const RecentWorkouts = ({ workouts }) => {
  // console.log(workouts[workouts.length - 1])

  function displayRecent(workout) {
    return (
      <>
        <span>{workout._type.name}</span>
        {workout._type.category === "weights" ? (
          <div className="right-display">
            <p>{workout.data.weights} kg</p>
            <p>Best: {Math.max(...workout.data.sets)} Reps</p>
          </div>
        ) : workout._type.category === "bodyweight" ? (
          <div className="right-display">
            <p>Best: {Math.max(...workout.data.sets)} Reps</p>
          </div>
        ) : (
          workout._type.category === "distance" && (
            <div className="right-display">
              <p>{workout.data.distance}km</p>
              <p>Best: {getBestRound(workout.data.rounds)}</p>
            </div>
          )
        )}
      </>
    );
  }

  return (
    <div className="recent-container">
      <div>{workouts.length && displayRecent(workouts[workouts.length - 1])}</div>
      <div>{workouts.length && displayRecent(workouts[workouts.length - 2])}</div>
    </div>
  );
};

function getBestRound(arr) {
  let secondsArr = [];
  for (let i = 0; i < arr.length; i++) {
    const timeArr = arr[i].split(":");
    let seconds = +timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2];
    secondsArr.push(seconds);
  }
  const highestValue = Math.max(...secondsArr);
  let highestIndex = secondsArr.indexOf(highestValue);

  return arr[highestIndex];
}

export default RecentWorkouts;
