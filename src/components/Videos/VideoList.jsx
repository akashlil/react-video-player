import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  useDeleteVideosMutation,
  useUpdateVideosMutation,
} from "../../features/videos/videoApiInj";
import Paginate from "../Paginate/Paginate";
import VideoModal from "./VideoModal";

const VideoList = ({ videos }) => {
  const dispatch = useDispatch();
  const { pagination, paginationList: videoList } = Paginate(videos);

  const [videoData, setVideoData] = useState({
    video_title: "",
    video_url: "",
    video_details: "",
    video_thumbnail: "",
    _id: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => setShowModal(false), []);

  const handleShow = useCallback(
    (id) => {
      const oneVideo = videos.find((video) => video._id === id);
      setVideoData(oneVideo);
      setShowModal(true);
    },
    [videos]
  );

  const [deleteVideos] = useDeleteVideosMutation();
  const [updateVideos] = useUpdateVideosMutation();

  const handleDeleteVideo = useCallback(
    async (id) => {
      try {
        const resp = await deleteVideos(id);
        if (resp?.data?.deletedCount) {
          // Optionally update the video list after deletion
          // dispatch(deleteVideoSuccess(id));
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        // Optionally display an error message to the user
      }
    },
    [deleteVideos]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setVideoData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const resp = await updateVideos(videoData);
        if (resp) {
          setVideoData({
            video_title: "",
            video_url: "",
            video_details: "",
            video_thumbnail: "",
            _id: "",
          });
          handleClose();
        }
      } catch (error) {
        console.error("Error updating video:", error);
        // Optionally display an error message to the user
      }
    },
    [updateVideos, videoData, handleClose]
  );

  return (
    <div className="p-4">
      <h2>Videos List</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {videoList.map((video, index) => (
              <tr key={index}>
                <td>{video.video_title.slice(0, 10)}</td>
                <td>{video.video_url.slice(0, 10)}</td>
                <td>{video.video_details.slice(0, 10)}</td>
                <td className="d-flex">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleShow(video._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDeleteVideo(video._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination}
      <VideoModal
        showModal={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        videoData={videoData}
      />
    </div>
  );
};

export default VideoList;
