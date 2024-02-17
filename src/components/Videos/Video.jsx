import React from "react";
import { useGetVideoListQuery } from "../../features/videos/videoApiInj";
import VideoTable from "./VideoTable";

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
  if (isSuccess)
    return (
      <div className="px-5">
        <VideoTable data={videosList} />
      </div>
    );
};

export default Video;
