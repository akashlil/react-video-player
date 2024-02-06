import React, { useState } from "react";
import ReactPlayer from "react-player";

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
    title: "( Lofi Box ) One Hours Bengali Emotional Lofi Remix Song |",
    url: "https://ak.storerepublic.com/public/video_3.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
];

function App() {
  const [currentVideo, setCurrentVideo] = useState(videoList[0]);

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Video List</h2>
        <ul>
          {videoList.map((video) => (
            <li key={video.id} onClick={() => handleVideoClick(video)}>
              {video.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="video-player">
        <h2>{currentVideo.title}</h2>
        <ReactPlayer url={currentVideo.url} controls />
      </div>
    </div>
  );
}

export default App;
