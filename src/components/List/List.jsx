import { useState, useEffect, useRef, useCallback, useContext } from "react";
import "./List.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal/Modal";
import AddEntryForm from "../EntryForms/AddEntryForm";
import AddWorkoutForm from "../EntryForms/AddWorkoutForm";
import usePaginate from "../utils/usePaginate";
import { MyContext } from "../context/Context";
import InfiniteScroll from "react-infinite-scroller";
import { format, parseISO } from "date-fns";

const List = ({ activeItem, setActiveItem ,workouts, setWorkouts}) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const { searchQueryInput, pageNumber, setPageNumber } = useContext(MyContext);
  // const data = usePaginate(searchQueryInput, pageNumber);
  const [hasMore, setHasMore] = useState(true);

  function handleNavigate(ele) {
    navigate(`/workouts/details/${ele._id}`);
    setActiveItem(ele);
  }

  useEffect(() => {
    setWorkouts([]);
    loadMore();
    return () => {
      setPageNumber(1);
    };
  }, [searchQueryInput]);

  async function loadMore() {
    try {
      const res = await axios.get(
        `/api/workouts/paginate?searchquery=${searchQueryInput}&page=${pageNumber}`
      );
      setWorkouts([...workouts, ...res.data]);
      setPageNumber(pageNumber + 1);
      setHasMore(res.data.length > 0);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="list-container-wrapper">
        <div className="list-container">
          <li
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            <i className="add-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </i>
          </li>

          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
            useWindow={false}
          >
            {workouts.map((ele, i) => {
              return (
                <li
                  key={i + 1}
                  onClick={() => handleNavigate(ele)}
                  className={activeItem && activeItem._id === ele._id ? `active` : ""}
                >
                  <div className="left-display">
                    <div>{ele._type.name}</div>
                    <div>{format(parseISO(ele.date), "MMM dd, yyyy")}</div>
                  </div>
                  {ele._type.category === "weights" ? (
                    <div className="right-display">
                      <p>{ele.data.weights} kg</p>
                      <p>Best: {Math.max(...ele.data.sets)} Reps</p>
                    </div>
                  ) : ele._type.category === "bodyweight" ? (
                    <div className="right-display">
                      <p>Best: {Math.max(...ele.data.sets)} Reps</p>
                    </div>
                  ) : (
                    ele._type.category === "distance" && (
                      <div className="right-display">
                        <p>{ele.data.distance}km</p>
                        <p>Best: {getBestRound(ele.data.rounds)}</p>
                      </div>
                    )
                  )}
                </li>
              );
            })}
          </InfiniteScroll>
        </div>

        {/* <Outlet /> */}
      </div>
      {showAddModal && (
        <Modal
          component={<AddWorkoutForm setShowAddModal={setShowAddModal} setWorkouts={setWorkouts} setPageNumber={setPageNumber}/>}
          setShowModal={setShowAddModal}
        />
      )}
    </>
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

export default List;
