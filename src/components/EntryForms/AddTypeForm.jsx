import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddTypeForm = ({setShowModal}) => {
  // const [isError, setIsError] = useState(false)
  // const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit the form");
    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"), //get the data from the input with name name
      category: formData.get("category"),
    };

    try {
      const response = await axios.post("/api/types/create", data);

      if (response.status === 200) {
        //everything went well!
        console.log("type was created");
        //  navigate("/login");
        setShowModal(false)
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
        <h3>Add Workout-Type</h3>
        <div>
          <label>Name:</label>
          <input type="text" name="name" placeholder="Name" />
        </div>

        <div>
          <label>Category</label>
          <select name="category">
            <option value="weights">Weights</option>
            <option value="bodyweight">Bodyweight</option>
            <option value="distance">Distance</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddTypeForm;
