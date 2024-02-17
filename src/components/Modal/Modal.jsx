import React from "react";

function Modal({ children, handleClose, showModal }) {
  return (
    <>
      {showModal && (
        <div className="modal d-block mt-5" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Form</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>};
    </>
  );
}

export default Modal;
