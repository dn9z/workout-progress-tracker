import { useContext, useState } from "react";
import "./List.scss";

import { MyContext } from "../context/Context";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
const List = ({ activeItem, setActiveItem }) => {
  const { entries } = useContext(MyContext);
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const location = useLocation();

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
        {entries.map((ele, i) => {
          return (
            <li
              onClick={() => {
                navigate(`/workouts/details/${ele.id}`);
                setActiveItem(ele);
              }}
              key={i}
              className={activeItem && activeItem.id === ele.id ? `active` : ""}
            >
              {ele.workoutName}
            </li>
          );
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
