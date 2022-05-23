import { useState, useEffect } from "react";
import Modal from "../../components/utils/Modal/Modal";
import AddTypeForm from "../../components/EntryForms/AddTypeForm";
import SureToDelete from "../../components/messages/SureToDelete";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import "./Profile.scss";
import EditTypeForm from "../../components/EntryForms/EditTypeForm";

const Profile = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);

  // const [typeInput, setTypeInput] = useState("");
  const [myTypes, setMyTypes] = useState([]);
  const [selectedType, setSelectedType] = useState({});

  async function getListOfTypes() {
    const res = await axios.get("/api/types/getall");
    setMyTypes(res.data.types);
    setSelectedType(res.data.types[0]);
  }

  useEffect(() => {
    getListOfTypes();
  }, []);


  useEffect(() => {
    async function updateUI() {
      const res = await axios.get("/api/types/getall");
      setMyTypes(res.data.types);
    }
    updateUI();
  }, [showAddModal, showEditNameModal, showDeleteModal]);


  async function handleSaveOrder() {
    await axios.post(`/api/types/updateall`, { newList: myTypes });
  }

  return (
    <div className="profile-container">
      <div className="profile-type-buttons">
        <button
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          New
        </button>
        <button onClick={handleSaveOrder}>Save Order</button>
        <button onClick={() => setShowEditNameModal(true)}>Edit Name</button>
        <button
          onClick={() => {
            setShowDeleteModal(true);
            // deleteType()
          }}
        >
          Delete
        </button>
      </div>
      <ReactSortable
        className="dnd-list"
        chosenClass="dnd-item-drag"
        list={myTypes}
        setList={setMyTypes}
      >
        {myTypes &&
          myTypes.map((ele, i) => {
            return (
              <div
                onClick={() => {
                  setSelectedType(ele);
                }}
                className={
                  selectedType && selectedType._id === ele._id ? `drag-item-active` : "drag-item"
                }
                key={i}
              >
                <span>{ele.name}</span>
                <div className="type-span">
                  <span>Type: </span>
                  <span>{ele.category[0].toUpperCase() + ele.category.slice(1)}</span>
                </div>
              </div>
            );
          })}
      </ReactSortable>
      {showAddModal && (
        <Modal
          component={<AddTypeForm setShowModal={setShowAddModal} />}
          setShowModal={setShowAddModal}
        />
      )}
      {showEditNameModal && (
        <Modal
          component={<EditTypeForm selectedTypeId={selectedType._id} setShowModal={setShowEditNameModal} />}
          setShowModal={setShowEditNameModal}
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
