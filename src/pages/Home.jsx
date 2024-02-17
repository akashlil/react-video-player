import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useGetVideoListQuery } from "../features/videos/videoApiInj";
import "../components/home.css";

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { data: videoList, isLoading, isError } = useGetVideoListQuery();

  if (isLoading) {
    return "Loading videos";
  }
  if (!isLoading && isError && videoList.length < 0) {
    return "Error loading videos";
  }

  if (!isLoading && !isError && videoList.length > 0) {
    const currentVideo = videoList[currentVideoIndex];
    const handlePrevious = () => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === 0 ? videoList?.length - 1 : prevIndex - 1
      );
    };

    const handleNext = () => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === videoList?.length - 1 ? 0 : prevIndex + 1
      );
    };
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8">
            <ReactPlayer
              url={currentVideo?.video_url}
              controls
              width="100%"
              height="420px"
              style={{
                borderRadius: "10px",
                backgroundColor: "#000",
                padding: "15px",
              }}
              className="react-player"
            />
            <h2 className="video-heading">
              {currentVideo?.video_title.slice(0, 70)}...
            </h2>
            <div className="btn-controls">
              <button className="prev-video" onClick={handlePrevious}>
                Previous
              </button>
              <button className="next-video" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <h2 className="video-top-title">Video List</h2>
            <div className="video-list-content">
              <div className="video-list">
                {videoList?.map((video, index) => (
                  <div
                    key={video?._id}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`list-title ${
                      index === currentVideoIndex ? "active" : ""
                    }`}
                  >
                    <div className="video-list-item">
                      <img
                        src={video?.video_thumbnail}
                        className="img"
                        alt="..."
                      />
                      <p className="video-list-item-title">
                        {video?.video_title?.slice(0, 75)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
