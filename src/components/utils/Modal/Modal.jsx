import React from "react";
import "./Modal.scss";
const Modal = ({ component, setShowModal }) => {
  return (
    <div
      className="modal-bg"
      onClick={(e) => {
        setShowModal(false);
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
