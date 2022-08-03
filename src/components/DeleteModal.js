import React from "react";

const DeleteModal = ({ onCancel, onDel }) => {
  return (
    <div className="del-modal">
      <div className="del-container">
        <h3>Delete Comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone
        </p>
        <div className="del-btns">
          <button onClick={onCancel} className="cancel">
            no, cancel
          </button>
          <button onClick={onDel} className="delete">
            yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
