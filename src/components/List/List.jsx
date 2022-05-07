import { useState, useEffect,useRef,useCallback } from "react";
import "./List.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import Form from "../AddEntryForm/AddEntryForm";
import usePaginate from "./usePaginate";
const List = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1)
  const data = usePaginate(pageNumber)


  const observer = useRef()
  const lastWorkoutElementRef = useCallback(node => {
    if (data.loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && data.hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [data.loading, data.hasMore])


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

          {data.workouts.map((ele,i) => {
            if(data.workouts.length === i + 1){
              // if last element of fetch call, add ref to element to trigger intersectionobserver when element is visible
              return <li ref={lastWorkoutElementRef} onClick={() => {
                navigate(`/workouts/details/${ele._id}`);
                setActiveItem(ele);
              }} className={activeItem && activeItem._id === ele._id ? `active` : ""} key={i}><div>{ele.type.name}</div><div>{ele.date.slice(0,10)}</div></li>
            }else{
              return <li key={i} onClick={() => {
                navigate(`/workouts/details/${ele._id}`);
                setActiveItem(ele);
              }} className={activeItem && activeItem._id === ele._id ? `active` : ""}><div>{ele.type.name}</div><div>{ele.date.slice(0,10)}</div></li>
            }
          })}
          {data.loading && <div>loading....</div>}
          {data.error && <div>error</div>}

      </div>
      {/* <Outlet /> */}
      {showAddModal && (
        <Modal
          component={<Form setShowAddModal={setShowAddModal} />}
          setShowAddModal={setShowAddModal}
        />
      )}
    </>
  );
};

export default List;
