import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import "./Highlights.scss";
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
          if (records[ele._type.name].data < ele.data.weights) {
            records[ele._type.name] = {
              data: ele.data.weights,
              date: ele.date,
              category: ele._type.category,
            };
          }
        } else {
          records[ele._type.name] = {
            data: ele.data.weights,
            date: ele.date,
            category: ele._type.category,
          };
        }
      }
      if (ele._type.category === "bodyweight") {
        if (records[ele._type.name]) {
          if (records[ele._type.name].data < Math.max(...ele.data.sets)) {
            records[ele._type.name] = {
              data: Math.max(...ele.data.sets),
              date: ele.date,
              category: ele._type.category,
            };
          }
        } else {
          records[ele._type.name] = {
            data: Math.max(...ele.data.sets),
            date: ele.date,
            category: ele._type.category,
          };
        }
      }
      if (ele._type.category === "distance") {
        if (records[ele._type.name]) {
          if (records[ele._type.name].data < ele.data.distance) {
            records[ele._type.name] = {
              data: ele.data.distance,
              date: ele.date,
              category: ele._type.category,
            };
          }
        } else {
          records[ele._type.name] = {
            data: ele.data.distance,
            date: ele.date,
            category: ele._type.category,
          };
        }
      }
    });
    return records;
  }

  useEffect(() => {
    setMyRecords(getBestWorkouts());
  }, [workouts]);

  // myRecords&&console.log(Object.values(myRecords)[0]);
  // console.log(myRecords)
  return (
    <div className="highlights-container">
      {Object.keys(myRecords).length && (
        <>
          {[0, 1, 2].map((i) => {
            return (
              <div className="highlights-single-container" key={i}>
                <div>
                  {Object.keys(myRecords)[i]}{" "}
                  {Object.values(myRecords)[i].category === "weights" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 301.015 301.015"
                      enableBackground="new 0 0 301.015 301.015"
                    >
                      <path
                        d="M296.075,128.44H279.11v-22.88c0-2.665-2.21-4.875-4.875-4.875H246.74V77.74c0-2.665-2.21-4.875-4.875-4.875h-32.37
                      c-2.665,0-4.875,2.21-4.875,4.875v50.7H95.485v-50.7c0-2.665-2.21-4.875-4.875-4.875H58.24c-2.665,0-4.875,2.21-4.875,4.875v22.88
                      H25.87c-2.665,0-4.875,2.21-4.875,4.875v22.88H4.875c-2.665,0-4.875,2.21-4.875,4.875v33.67c0,2.665,2.21,4.875,4.875,4.875H21.06
                      v23.725c0,2.665,2.21,4.875,4.875,4.875H53.43v22.88c0,2.665,2.21,4.875,4.875,4.875h32.37c2.665,0,4.875-2.21,4.875-4.875V171.73
                      h109.135v51.545c0,2.665,2.21,4.875,4.875,4.875h32.37c2.665,0,4.875-2.21,4.875-4.875v-22.88H274.3
                      c2.665,0,4.875-2.21,4.875-4.875v-23.725h16.965c2.665,0,4.875-2.21,4.875-4.875v-33.67
                      C300.95,130.585,298.74,128.44,296.075,128.44z M21.06,162.11H9.75v-0.065V138.19h11.31V162.11z M53.43,190.71H30.81v-80.275
                      h22.62V190.71z M85.735,218.465h-22.62V82.615h22.62V218.465z M204.62,162.11H95.485v-0.065V138.19H204.62V162.11z
                      M236.99,218.465h-22.62V82.615h22.62V218.465z M269.36,190.71h-22.62v-80.275h22.62V190.71z M291.2,162.045h-12.09V138.19h12.09
                      V162.045z"
                      />
                    </svg>
                  ) : Object.values(myRecords)[i].category === "bodyweight" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      enableBackground="new 0 0 512 512"
                    >
                      <path
                        d="M128.409,172.138c-13.739-16.825-38.508-19.314-55.319-5.585c-16.818,13.734-19.319,38.501-5.584,55.319
		                	c13.735,16.82,38.501,19.318,55.318,5.585C139.641,213.724,142.143,188.956,128.409,172.138z"
                      />
                      <path
                        d="M495.432,357.937c-0.013,0-0.026,0-0.039,0c-149.637,0.348-179.122,0.433-207.516,0.433l43.188-52.963l135.495-27.691
                      c12.258-2.505,20.164-14.473,17.659-26.729c-2.505-12.257-14.468-20.171-26.729-17.659L314.08,262.637
                      c-5.119,1.046-9.719,3.83-13.021,7.879l-60.743,74.492l28.099-56.193l1.89-39.535l15.079,5.804
                      c6.704-11.114,16.914-12.02,24.384-13.546l43.468-8.884l-95.922-36.921c-14.385-5.542-30.027,4.638-30.765,20.058l-2.52,52.685
                      l-32.853-38.065l11.904-91.391c1.677-12.884-11.175-22.81-23.222-17.944l-63.257,25.598c8.855,3.273,16.784,8.855,22.929,16.382
                      c2.225,2.725,4.154,5.625,5.781,8.656l20.312-8.22l-7.031,53.983l-47.52,39.716l26.199,10.484l-68.305-4.862l4.561-18.01
                      c-6.521-3.334-12.375-7.999-17.149-13.845c-4.556-5.579-7.789-11.808-9.76-18.307l-15.594,61.57
                      c-2.6,10.267,4.742,20.408,15.326,21.123l100.832,6.21l-23.591,6.279l41.503,50.823l-148.562,0.389
                      C7.382,359.065-0.021,366.5,0,375.651c0.022,9.139,7.436,16.533,16.569,16.533c0.013,0,0.026,0,0.039,0
                      c21.044-0.049,456.156-1.053,478.859-1.105c9.152-0.022,16.553-7.457,16.533-16.608
                      C511.979,365.331,504.564,357.937,495.432,357.937z"
                      />
                    </svg>
                  ) : (
                    Object.values(myRecords)[i].category === "distance" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 490.1 490.1"
                        enableBackground="new 0 0 490.1 490.1"
                      >
                        <path d="m447.25,360.1l-187.7-49.1 165.8-33.9-4.2-21.8-210.6,43.7c-13,2.8-9.4,20.9 0,21.8l168.9,44.8-191.8,13.1c-10.5,1.5-12.6,13.3-6.3,19.7l62.6,59-136.6,10.9 1,21.8 159.5-13.1c7.7,0.6 14.9-11.2 6.3-19.7l-61.5-59 233.5-16.4c11.5-0.5 12.8-18.6 1.1-21.8z" />
                        <path d="m460.85,81.8c0-27.2-21.9-49.2-49-49.2s-49,22-49,49.2 21.9,49.2 49,49.2c26.1,0 49-22 49-49.2zm-77.1,1c0-15.7 12.5-28.3 28.1-28.3 14.6,0 28.1,11.5 28.1,27.2s-12.5,28.3-28.1,28.3c-15.6,0-28.1-11.5-28.1-27.2z" />
                        <path d="m490.05,78.6c0-44-35.4-78.6-78.2-78.6-42.7,0-78.2,34.6-78.2,78.6 0,43.9 78.2,161.3 78.2,161.3s78.2-117.4 78.2-161.3zm-78.2-57.6c32.3,0 57.3,26.2 57.3,57.6 0,25.1-36.5,88-57.3,122.6-20.8-34.6-57.3-97.4-57.3-122.6 0-31.4 25-57.6 57.3-57.6z" />
                        <path d="m78.25,269.9c-27.1,0-49,22-49,49.2s21.9,49.2 49,49.2c26.1,0 49-22 49-49.2s-21.9-49.2-49-49.2zm0,77.6c-15.6,0-28.1-11.5-28.1-27.2s12.5-28.3 28.1-28.3c14.6,0 28.1,11.5 28.1,27.2 0,15.7-12.5,28.3-28.1,28.3z" />
                        <path d="m78.25,237.5c-42.7,0-78.2,34.6-78.2,78.6 0,43.9 78.2,161.3 78.2,161.3s78.2-117.4 78.2-161.3c0-44.1-35.5-78.6-78.2-78.6zm-57.3,78.5c-3.55271e-15-31.4 25-57.6 57.3-57.6s57.3,26.2 57.3,57.6c0,25.1-36.5,88-57.3,122.6-20.9-34.6-57.3-97.4-57.3-122.6z" />
                      </svg>
                    )
                  )}
                </div>
                <div>
                  {Object.values(myRecords)[i].data}
                  {Object.values(myRecords)[i].category === "weights"
                    ? " kg"
                    : Object.values(myRecords)[i].category === "bodyweight"
                    ? " Reps"
                    : Object.values(myRecords)[i].category === "distance" && " km"}
                </div>
                <div>{format(parseISO(Object.values(myRecords)[i].date), "MMM dd, yyyy")}</div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Highlights;
