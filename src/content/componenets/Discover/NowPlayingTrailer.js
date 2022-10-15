import { Box } from "@mui/system";
import React from "react";
import bg from "../../../assets/imgs/bg.jpg";
import { ImagesBaseUrl } from "../../../config/apis";
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
        <Box sx={{ width: "calc(100%)", height: "100%" }}>
          <iframe
            style={{ pointerEvents: "none" }}
            title="nowPlaying"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.youtube.com/embed/${trailer}?${process.env.REACT_APP_YOUTUBE_CONFIG}${trailer}`}
          ></iframe>
        </Box>
      ) : (
         
          <Box sx={{ width: "calc(100% - 2px)", bgcolor: "black.main", height: "80vh",  }}>
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
