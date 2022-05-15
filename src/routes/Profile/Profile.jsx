import { useState, useEffect } from "react";
import Modal from "../../components/utils/Modal/Modal";
import AddTypeForm from "../../components/EntryForms/AddTypeForm";
import axios from "axios";

const Profile = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const [typeInput, setTypeInput] = useState("");
  const [myTypes, setMyTypes] = useState([]);

  const getListOfTypes = async () => {
    const res = await axios.get("/api/types/getall");
    setMyTypes(res.data.types);
  };

  useEffect(() => {
    getListOfTypes();
  }, []);

  // useEffect(() => {
  //   getListOfusers();
  // }, []);

  const deleteType = async () => {
    await axios.delete(`/api/types/delete/${typeInput}`)
  };

  return (
    <div className="profile-container">
      <button
        onClick={() => {
          setShowAddModal(true);
        }}
      >
        New
      </button>
      <div>
        <label>My Workout Types</label>
        <select
          value={typeInput}
          onChange={(e) => setTypeInput(e.target.value)}
          name="my-workout-types"
        >
          {myTypes &&
            myTypes.map((ele, i) => {
              return (
                <option value={ele.name} key={i}>
                  {ele.name}
                </option>
              );
            })}
        </select>
      </div>
      <button onClick={deleteType}>Delete</button>
      {showAddModal && (
        <Modal
          component={<AddTypeForm setShowAddModal={setShowAddModal} />}
          setShowModal={setShowAddModal}
        />
      )}
    </div>
  );
};

export default Profile;
