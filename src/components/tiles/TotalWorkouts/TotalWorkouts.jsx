import axios from "axios";
import { useEffect, useState } from "react";

const TotalWorkouts = ({ workouts }) => {
  // const [myTypes, setMyTypes] = useState([]);
const [totals, setTotals] = useState({});

  // useEffect(() => {
  //   const getListOfTypes = async () => {
  //     const res = await axios.get("/api/types/getall");
  //     setMyTypes(res.data.types);
  //   };
  //   getListOfTypes();
  // }, []);

  function getTotalOfWorkouts() {
    const totals = {};
    workouts.forEach((ele, i) => {
      if (totals[ele._type.name]) {
        totals[ele._type.name]++

      }
      else {
        totals[ele._type.name] = 1;
      }
    });
    return totals
  }

  // workouts&&console.log(getNumberOfWorkouts())


  useEffect(() => {
     setTotals(getTotalOfWorkouts())
  }, [workouts])


  return (
    <div>
      {workouts &&
        Object.keys(totals).map((ele, i) => {
          return <div key={i}>{ele}: {totals[ele]} Entries</div>;
        })}
    </div>
  );
};

export default TotalWorkouts;
