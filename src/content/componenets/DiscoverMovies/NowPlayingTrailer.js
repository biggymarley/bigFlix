import { Box } from "@mui/system";
import React from "react";
import { ImagesBaseUrl } from "../../../config/apis";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";
export const NowPlayingTrailer = ({ trailer, nowPlayingMovie }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
          bgcolor: "black.main",
        }}
      />
      {trailer ? (
        <Box
          sx={{
            width: "calc(100%)",
            height: "100vh",
          }}
        >
          <YoutubePlayer id={trailer} btSize="large" />
        </Box>
      ) : (
        <Box
          sx={{ width: "calc(100%)", bgcolor: "black.main", height: "80vh" }}
        >
          {nowPlayingMovie?.poster_path || nowPlayingMovie?.backdrop_path ? (
            <img
              alt=""
              src={`${ImagesBaseUrl}${
                nowPlayingMovie?.poster_path || nowPlayingMovie?.backdrop_path
              }`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : null}
        </Box>
      )}
    </>
  );
};
