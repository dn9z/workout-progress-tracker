import axios from "axios";
import React from "react";

const SureToDelete = ({ setShowModal, selectedTypeId }) => {
  async function deleteType() {
    await axios.delete(`/api/types/delete/${selectedTypeId}`);
  }

  return (
    <div className="message-container">
      <p>Are you sure? This will delete all associated Workouts!</p>
      <button onClick={() => setShowModal(false)}>Cancel</button>
      <button
        onClick={() => {
          deleteType();
          setShowModal(false);
        }}
      >
        Confirm
      </button>
    </div>
  );
};

export default SureToDelete;
