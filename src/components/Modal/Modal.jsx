import React from "react";
import "./Modal.scss";
const Modal = ({ component, setShowAddModal }) => {
  return (
    <div
      className="modal-bg"
      onClick={(e) => {
        setShowAddModal(false);
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {component}
      </div>
    </div>
  );
};

export default Modal;
