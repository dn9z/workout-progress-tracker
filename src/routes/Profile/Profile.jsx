import { useState, useEffect } from "react";
import Modal from "../../components/utils/Modal/Modal";
import AddTypeForm from "../../components/EntryForms/AddTypeForm";
import SureToDelete from "../../components/messages/SureToDelete";
import axios from "axios";

const Profile = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [typeInput, setTypeInput] = useState("");
  const [myTypes, setMyTypes] = useState([]);
  const [selectedType, setSelectedType] = useState({});

  const [showEditFields, setShowEditFields] = useState(false);
  const [editNameInput, setEditNameInput] = useState("");

  async function getListOfTypes() {
    const res = await axios.get("/api/types/getall");
    setMyTypes(res.data.types);
    setSelectedType(res.data.types[0]);
  }

  useEffect(() => {
    getListOfTypes();
  }, []);

  // useEffect(() => {
  //   getListOfTypes();
  // }, [showEditFields,showAddModal,showDeleteModal]);

  useEffect(() => {
    async function getTypeObj() {
      const res = await axios.get(`api/types/getonebyname?name=${typeInput}`);
      setSelectedType(res.data.type);
    }
    getTypeObj();
  }, [typeInput]);

  useEffect(() => {
    async function updateUI() {
      const res = await axios.get(`api/types/getonebyname?name=${typeInput}`);
      setSelectedType(res.data.type);
      const res2 = await axios.get("/api/types/getall");
      setMyTypes(res2.data.types);
    }
    updateUI();
  }, [showEditFields, showAddModal, showDeleteModal]);

  async function handleSave() {
    await axios.post(`/api/types/updatename/${selectedType._id}`, { newName: editNameInput });
  }

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
      {!showEditFields ? (
        <>
          <button onClick={() => setShowEditFields(true)}>Edit</button>
          <button
            onClick={() => {
              setShowDeleteModal(true);
              // deleteType()
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <>
          <label>Edit Name:</label>
          <input
            value={editNameInput}
            onChange={(e) => setEditNameInput(e.target.value)}
            type="text"
          />
          <button onClick={() => setShowEditFields(false)}>Cancel</button>
          <button
            onClick={() => {
              handleSave();
              setShowEditFields(false);
            }}
          >
            Save
          </button>
        </>
      )}
      {showAddModal && (
        <Modal
          component={<AddTypeForm setShowAddModal={setShowAddModal} />}
          setShowModal={setShowAddModal}
        />
      )}
      {showDeleteModal && (
        <Modal
          component={
            <SureToDelete selectedTypeId={selectedType._id} setShowModal={setShowDeleteModal} />
          }
          setShowModal={setShowDeleteModal}
        />
      )}
    </div>
  );
};

export default Profile;
