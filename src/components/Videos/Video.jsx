import React from "react";
import { useGetVideoListQuery } from "../../features/videos/videoApiInj";
import VideoList from "./videoList";

const Video = () => {
  const {
    data: videosList,
    isLoading,
    isError,
    isSuccess,
  } = useGetVideoListQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data.</div>;
  if (!videosList || !videosList.length) return <div>No videos available.</div>;
  if (isSuccess) return <VideoList videos={videosList} />;
};

export default Video;
