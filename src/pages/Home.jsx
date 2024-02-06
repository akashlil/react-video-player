import React, { useState } from "react";
import ReactPlayer from "react-player";
import "../components/home.modul.css";

const videoList = [
  {
    id: 1,
    title: "Suipoka live show ||pilak mela||band suipoka || somu &",
    url: "https://ak.storerepublic.com/public/video_1.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 2,
    title: "আলাদা আলাদা male version by Anupam Roy. আমি আবার ক্লান্ত",
    url: "https://ak.storerepublic.com/public/video_2.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 3,
    title: "( Lofi Box ) One Hours Bengali Emotional Lofi Remix Song |",
    url: "https://ak.storerepublic.com/public/video_3.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 4,
    title: "Suipoka live show ||pilak mela||band suipoka || somu &",
    url: "https://ak.storerepublic.com/public/video_1.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 5,
    title: "আলাদা আলাদা male version by Anupam Roy. আমি আবার ক্লান্ত",
    url: "https://ak.storerepublic.com/public/video_2.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 6,
    title: "Youbtube|",
    url: "https://www.youtube.com/watch?v=oUFJJNQGwhk",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
];

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const currentVideo = videoList[currentVideoIndex];

  const handlePrevious = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videoList.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoList.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-8">
          <ReactPlayer
            url={currentVideo.url}
            controls
            width="90%"
            height="450px"
            style={{
              borderRadius: "10px",
              backgroundColor: "#000",
              padding: "15px",
            }}
            className="react-player"
          />
          <h2 className="video-title">{currentVideo.title.slice(0, 45)}...</h2>
          <div className="controls">
            <button className="prev-video" onClick={handlePrevious}>
              Previous
            </button>
            <button className="next-video" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <h2 className="video-title">Video List</h2>
          <div className="video-list">
            {videoList.map((video, index) => (
              <p
                key={video.id}
                onClick={() => setCurrentVideoIndex(index)}
                className={`list-title ${
                  index === currentVideoIndex ? "active" : ""
                }`}
              >
                {video.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
