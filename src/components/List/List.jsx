import { useState, useEffect, useRef, useCallback, useContext } from "react";
import "./List.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal/Modal";
import AddEntryForm from "../EntryForms/AddEntryForm";
import AddWorkoutForm from "../EntryForms/AddWorkoutForm";
import usePaginate from "../utils/usePaginate";
import { MyContext } from "../context/Context";
const List = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const { searchQueryInput, pageNumber, setPageNumber } = useContext(MyContext);
  const data = usePaginate(searchQueryInput, pageNumber);

  const observer = useRef();
  const lastWorkoutElementRef = useCallback(
    (node) => {
      if (data.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [data.loading, data.hasMore]
  );

  function handleNavigate(ele) {
    navigate(`/workouts/details/${ele._id}`);
    setActiveItem(ele);
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

        {data.workouts.map((ele, i) => {
          if (data.workouts.length === i + 1) {
            // if last element of fetch call, add ref to element to trigger intersectionobserver when element is visible
            return (
              <li
                ref={lastWorkoutElementRef}
                onClick={() => handleNavigate(ele)}
                className={activeItem && activeItem._id === ele._id ? `active` : ""}
                key={i}
              >
                <div>{ele._type.name}</div>
                <div>{ele.date.slice(0, 10)}</div>
              </li>
            );
          } else {
            return (
              <li
                key={i}
                onClick={() => handleNavigate(ele)}
                className={activeItem && activeItem._id === ele._id ? `active` : ""}
              >
                <div>{ele._type.name}</div>
                <div>{ele.date.slice(0, 10)}</div>
              </li>
            );
          }
        })}
        {data.loading && <div>loading....</div>}
        {data.error && <div>error</div>}
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
