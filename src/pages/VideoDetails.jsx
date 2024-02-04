import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import "../components/videoplayer.modul.css";
import { useParams } from "react-router-dom";

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

export default function () {
  const { id } = useParams();
  const videoDetails = videoList.find(
    (video) => parseInt(video.id) === parseInt(id)
  );

  const [newVideoPlayList, setNewVideoPlayList] = useState(videoDetails);

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
    }
  }, [videoDetails, newVideoPlayList]);

  const changeVideo = (video) => {
    setNewVideoPlayList(video);
    if (playerRef.current) {
      playerRef.current.source = {
        type: "video",
        sources: [
          {
            src: video.src,
            type: "video/mp4",
          },
        ],
      };

      // Reload the Plyr player
      playerRef.current.load();
      playerRef.current.play(); // Add this line to play the video
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 my-3">
          <div className="video-player">
            <video ref={playerRef} controls className="plyr">
              <source src={newVideoPlayList?.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {videoDetails == undefined && (
              <h5 className="mt-2">Video not Found</h5>
            )}
            <h5 className="mt-2">{newVideoPlayList?.title}</h5>
            <p className="mt-2 video-details">{newVideoPlayList?.details}</p>
          </div>
        </div>
        <div className="col-md-4 my-3">
          <div className="video-growp sidebar">
            <div className="video-list">
              {videoList.map((video, index) => (
                <div
                  key={index}
                  onClick={() => changeVideo(video)}
                  className={`video-list-item ${
                    video?.id === newVideoPlayList?.id ? "active" : ""
                  }`}
                >
                  <div className="thumbnail-image">
                    <img src={video.thumbnail} alt={video.title} />
                  </div>
                  <div>
                    <p>{video.title}</p>
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
