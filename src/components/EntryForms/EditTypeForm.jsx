import axios from "axios";
import React from "react";

const EditTypeForm = ({ setShowModal, selectedTypeId }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"), //get the data from the input with name name
    };

    try {
      const res = await axios.post(`/api/types/updatename/${selectedTypeId}`, { newName: data.name });

      if (res.status === 200) {
        console.log("type was created");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      // setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Edit Name</h3>
        <div>
          <label>New Name:</label>
          <input type="text" name="name" />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default EditTypeForm;
