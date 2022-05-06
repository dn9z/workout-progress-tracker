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
    console.log('triggered')
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
              return <li ref={lastWorkoutElementRef} key={i}>{ele.type.name}</li>
            }else{
              return <li key={i}>{ele.type.name}</li>
            }
          })}


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
