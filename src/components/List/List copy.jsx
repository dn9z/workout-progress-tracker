import { useContext, useState, useEffect } from "react";
import "./List.scss";
import axios from "axios";
import { MyContext } from "../context/Context";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import Form from "../AddEntryForm/AddEntryForm";
const List = ({ activeItem, setActiveItem }) => {
  // const { entries } = useContext(MyContext);
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:9001/api/workouts/list")
      .then((res) => {
        if (res) {
          const sorted = res.data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
          setWorkouts(sorted);
        }
      })
      .catch((error) => {
        console.warn("There was an error", error);
      });
  }, []);

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
        {workouts.map((ele, i) => {
          return (
            <li
              onClick={() => {
                navigate(`/workouts/details/${ele._id}`);
                setActiveItem(ele);
              }}
              key={i}
              className={activeItem && activeItem._id === ele._id ? `active` : ""}
            >
              {ele.type.name}
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
