import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAddVideoMutation } from "../../features/videos/videoApiInj";

export default function AddVideo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [addVideo] = useAddVideoMutation();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await addVideo(data);
      if (response.error) {
        throw new Error(response.error.message);
      }
      alert("Video added successfully!");
      reset();
    } catch (error) {
      alert("Error adding video: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card p-4">
            <div className="d-flex align-items-center mb-4">
              <h2 className="mb-0">Add Video</h2>
              <Link to="/" className="ms-auto">
                Home
              </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="video_title" className="form-label">
                  Video Title
                </label>
                <input
                  type="text"
                  {...register("video_title", {
                    required: "Video title is required",
                  })}
                  className={`form-control ${
                    errors.video_title ? "is-invalid" : ""
                  }`}
                  id="video_title"
                />
                {errors.video_title && (
                  <div className="invalid-feedback">
                    {errors.video_title.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="video_url" className="form-label">
                  Video URL
                </label>
                <input
                  type="text"
                  {...register("video_url", {
                    required: "Video URL is required",
                  })}
                  className={`form-control ${
                    errors.video_url ? "is-invalid" : ""
                  }`}
                  id="video_url"
                />
                {errors.video_url && (
                  <div className="invalid-feedback">
                    {errors.video_url.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="video_thumbnail" className="form-label">
                  Video Thumbnail Image Link
                </label>
                <input
                  type="text"
                  {...register("video_thumbnail")}
                  className="form-control"
                  id="video_thumbnail"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="video_details" className="form-label">
                  Video Details
                </label>
                <input
                  type="text"
                  {...register("video_details")}
                  className="form-control"
                  id="video_details"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
