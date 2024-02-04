import React from "react";
import VideoCard from "../components/VideoCard";

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
export default function Home() {
  return (
    <div className="container py-5">
      <VideoCard props={videoList} />

      <nav aria-label="Page navigation example mt-5">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
