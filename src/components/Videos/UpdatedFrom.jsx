import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingalVideoQuery,
  useUpdateVideosMutation,
} from "../../features/videos/videoApiInj";
import { useForm } from "react-hook-form";

function UpdatedFrom() {
  const [isLoadingUpdate, setIsLoading] = useState(false);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    data: video,
    isLoading,
    isError,
    isSuccess,
  } = useGetSingalVideoQuery(id);

  const [updateVideos] = useUpdateVideosMutation();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await updateVideos(data);
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data.</div>;
  if (!video) return <div>No videos available.</div>;

  if (isSuccess && video) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="p-5">
        <div className="mb-3">
          <input
            type="text"
            {...register("_id")}
            defaultValue={video._id}
            className={`form-control d-none hidden`}
            id="_id"
          />
          <label htmlFor="video_title" className="form-label">
            Video Title
          </label>

          <input
            type="text"
            {...register("video_title", {
              required: "Video title is required",
            })}
            defaultValue={video.video_title}
            className={`form-control ${errors.video_title ? "is-invalid" : ""}`}
            id="video_title"
          />
          {errors.video_title && (
            <div className="invalid-feedback">{errors.video_title.message}</div>
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
            defaultValue={video.video_url}
            className={`form-control ${errors.video_url ? "is-invalid" : ""}`}
            id="video_url"
          />
          {errors.video_url && (
            <div className="invalid-feedback">{errors.video_url.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="video_thumbnail" className="form-label">
            Video Thumbnail Image
          </label>
          <input
            type="text"
            defaultValue={video.video_thumbnail}
            {...register("video_thumbnail")}
            className="form-control"
            id="video_thumbnail"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="video_details" className="form-label">
            Video Details
          </label>
          <textarea
            type="text"
            defaultValue={video.video_details}
            {...register("video_details")}
            className="form-control"
            id="video_details"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoadingUpdate}
        >
          {isLoadingUpdate ? "Adding..." : "Submit"}
        </button>
      </form>
    );
  }
}

export default UpdatedFrom;
