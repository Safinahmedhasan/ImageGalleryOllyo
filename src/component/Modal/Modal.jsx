import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the selected files?</p>
        <button onClick={onConfirm}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
