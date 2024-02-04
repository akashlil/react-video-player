// VideoPlayer.jsx

import React, { useRef, useEffect, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css"; // Import Plyr styles
const videoList = [
  {
    id: 1,
    title: "Suipoka live show ||pilak mela||band suipoka || somu &",
    src: "https://ak.storerepublic.com/public/video_1.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 2,
    title: "আলাদা আলাদা male version by Anupam Roy. আমি আবার ক্লান্ত",
    src: "https://ak.storerepublic.com/public/video_2.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 3,
    title: "( Lofi Box ) One Hours Bengali Emotional Lofi Remix Song |",
    src: "https://ak.storerepublic.com/public/video_3.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 4,
    title: "Suipoka live show ||pilak mela||band suipoka || somu &",
    src: "https://ak.storerepublic.com/public/video_1.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 5,
    title: "আলাদা আলাদা male version by Anupam Roy. আমি আবার ক্লান্ত",
    src: "https://ak.storerepublic.com/public/video_2.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
  {
    id: 6,
    title: "( Lofi Box ) One Hours Bengali Emotional Lofi Remix Song |",
    src: "https://ak.storerepublic.com/public/video_3.mp4",
    details:
      "7,792,761 views  Premiered on 8 Jun 2023  James Lyrics Song 2023 In this video presenting. James new bangla song 2023. I hope you like the song a lot. So enjoy the song Song : কিসের এত দুঃখ তোমার সারাক্ষণ বসে বসে ভাবছো  |",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XMbR4wA5Os7Yig9OcBDagg5t9ZpZ7_H-XY0Jxr8SBQ&s",
  },
];

const VideoPlayer = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      // Destroy the Plyr player if it exists
      if (player) {
        player.destroy();
      }

      // Create a new Plyr player
      const newPlayer = new Plyr(playerRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "settings",
          "fullscreen",
        ],
        seekTime: 10,
        volume: 1,
        muted: false,
        loop: { active: true },
      });

      // Set the Plyr player instance in the state
      setPlayer(newPlayer);

      // Change video when the component mounts
      changeVideo(currentVideoIndex);
    }
  }, [currentVideoIndex]);

  // Function to change the video source
  const changeVideo = (index) => {
    setCurrentVideoIndex(index);

    if (playerRef.current && videoList[index]) {
      playerRef.current.source = {
        type: "video",
        sources: [
          {
            src: videoList[index].src,
            type: "video/mp4",
          },
        ],
      };

      // Reload the Plyr player
      playerRef.current.load();
    }
  };

  // Function to play the previous video
  const playPrev = () => {
    const prevIndex =
      (currentVideoIndex - 1 + videoList.length) % videoList.length;
    changeVideo(prevIndex);
  };

  // Function to play the next video
  const playNext = () => {
    const nextIndex = (currentVideoIndex + 1) % videoList.length;
    changeVideo(nextIndex);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="video-player">
            <video ref={playerRef} controls className="plyr">
              <source src={videoList[currentVideoIndex].src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="player-controls">
              <button className="btn btn-light" onClick={playPrev}>
                Previous
              </button>
              <button className="btn btn-light" onClick={playNext}>
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="video-list">
            <h2>Video List</h2>
            <ul className="list-group">
              {videoList.map((video, index) => (
                <li
                  key={index}
                  onClick={() => changeVideo(index)}
                  className={`list-group-item ${
                    index === currentVideoIndex ? "active" : ""
                  }`}
                >
                  Video {index + 1}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
