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
const List = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const { searchQueryInput, pageNumber, setPageNumber } = useContext(MyContext);
  // const data = usePaginate(searchQueryInput, pageNumber);
  const [hasMore, sethasMore] = useState(true);
  const [workouts, setWorkouts] = useState([]);

  function handleNavigate(ele) {
    navigate(`/workouts/details/${ele._id}`);
    setActiveItem(ele);
  }

  useEffect(() => {
    setWorkouts([])
    return () => {
      setPageNumber(1)
    }
  }, [searchQueryInput])

 async function loadMore(){
   try {
      const res = await axios.get(`/api/workouts/paginate?searchquery=${searchQueryInput}&page=${pageNumber}`) 
      setWorkouts([...workouts,...res.data])    
      setPageNumber(pageNumber+1) 
      if (res.data.length === 0) sethasMore(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className="list-container">
        <button
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          New
        </button>

          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
            useWindow={false}
          >
            {workouts.map((ele, i) => {
              return (
                <li
                  key={i+1}
                  onClick={() => handleNavigate(ele)}
                  className={activeItem && activeItem._id === ele._id ? `active` : ""}
                >
                  <div>{ele._type.name}</div>
                  <div>{ele.date.slice(0, 10)}</div>
                </li>
              );
            })}
          </InfiniteScroll>
      </div>
      {/* <Outlet /> */}
      {showAddModal && (
        <Modal
          component={<AddWorkoutForm setShowAddModal={setShowAddModal} />}
          setShowModal={setShowAddModal}
        />
      )}
    </>
  );
};

export default List;
