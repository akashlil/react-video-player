import React from "react";
import "./VideoCard.modul.css";
import { Link } from "react-router-dom";

export default function VideoCard({ props }) {
  return (
    <div className="row">
      {props?.map((video, index) => (
        <div className="col-md-4 col-12 gap-4" key={index}>
          <Link to={`/video/${video?.id}`} className="video-card">
            <div className="video-card-thumbnail-image">
              <img src={video.thumbnail} alt={video.title} />
            </div>
            <div>
              <p className="p-3">{video.title}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
