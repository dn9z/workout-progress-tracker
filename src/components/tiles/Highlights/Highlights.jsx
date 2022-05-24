import { useState, useEffect } from "react";

const Highlights = ({ workouts }) => {
  const [myRecords, setMyRecords] = useState({});

  // function displayHighlight() {
  //   return (
  //     <>
  //       <span>{workout._type.name}</span>
  //       {workout._type.category === "weights" ? (
  //         <div className="right-display">
  //           <p>{workout.data.weights} kg</p>
  //           <p>Best: {Math.max(...workout.data.sets)} Reps</p>
  //         </div>
  //       ) : workout._type.category === "bodyweight" ? (
  //         <div className="right-display">
  //           <p>Best: {Math.max(...workout.data.sets)} Reps</p>
  //         </div>
  //       ) : (
  //         workout._type.category === "distance" && (
  //           <div className="right-display">
  //             <p>{workout.data.distance}km</p>
  //             <p>Best: {getBestRound(workout.data.rounds)}</p>
  //           </div>
  //         )
  //       )}
  //     </>
  //   );
  // }

  // console.log(first)

  function getBestWorkouts() {
    const records = {};
    workouts.forEach((ele, i) => {
      if (ele._type.category === "weights") {
        if (records[ele._type.name]) {
          if (records[ele._type.name] < ele.data.weights) {
            records[ele._type.name] = ele.data.weights;
          }
        } else {
          records[ele._type.name] = ele.data.weights;
        }
      }
      if (ele._type.category === "bodyweight") {
        if (records[ele._type.name]) {
          if (records[ele._type.name] < Math.max(...ele.data.sets)) {
            records[ele._type.name] = Math.max(...ele.data.sets);
          }
        } else {
          records[ele._type.name] = Math.max(...ele.data.sets);
        }
      }
      if (ele._type.category === "distance") {
        if (records[ele._type.name]) {
          if (records[ele._type.name] < ele.data.distance) {
            records[ele._type.name] = ele.data.distance;
          }
        } else {
          records[ele._type.name] = ele.data.distance;
        }
      }
    });
    return records;
  }

  useEffect(() => {
    setMyRecords(getBestWorkouts());
  }, [workouts]);

  console.log(myRecords);
  return (
    <div className="highlights-container">
      <div>
        <div>{Object.keys(myRecords)[0]}</div> <div>{Object.values(myRecords)[0]}</div>{" "}
        <div>{Object.keys(myRecords)[1]}</div> <div>{Object.values(myRecords)[1]}</div>{" "}
        <div>{Object.keys(myRecords)[2]}</div> <div>{Object.values(myRecords)[2]}</div>{" "}

      </div>
    </div>
  );
};

export default Highlights;
