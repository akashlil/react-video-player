import React from "react";

const VideoModal = ({
  showModal,
  handleClose,
  handleSubmit,
  handleChange,
  videoData,
}) => {
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
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
                    <label htmlFor="videoTitle">Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="videoTitle"
                      name="video_title"
                      value={videoData.video_title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="videoURL">URL:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="videoURL"
                      name="video_url"
                      value={videoData.video_url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="videoDetails">Details:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="videoDetails"
                      name="video_details"
                      value={videoData.video_details}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm mt-3">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default VideoModal;
