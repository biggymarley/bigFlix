import { VolumeMuteRounded, VolumeUpRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import YouTube from "react-youtube";

export default function YoutubePlayer({ id, btSize, frameStyle }) {
  const [mute, setMute] = useState(true);
  const ref = useRef();
  const HandleMute = async () => {
    if (ref?.current?.internalPlayer) {
      if (await ref?.current?.internalPlayer.isMuted()) {
        ref?.current?.internalPlayer.unMute();
        setMute(false);
      } else {
        ref?.current?.internalPlayer.mute();
        setMute(true);
      }
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        ...(frameStyle && { ...frameStyle }),
      }}
    >
      <YouTube
        ref={ref}
        videoId={id}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        opts={{
          ...opts,
          playerVars: { ...opts.playerVars, playlist: id },
        }}
      />
      <IconButton
        onClick={HandleMute}
        sx={{
          zIndex: 9998,
          color: "primary.main",
          position: "absolute",
          right: "2rem",
          top: "70%",
          border: "4px solid",
          borderColor: "primary.main",
          opacity: 0.6,
          transition: "all .2s ease",
          ...(btSize !== "large" && {
            borderWidth: 2,
            right: "80%",
            top: "70%",
          }),
          ...(btSize === "medium" && {
            borderWidth: 4,
            right: "2rem",
            top: "60%",
          }),
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        {mute ? (
          <VolumeMuteRounded
            sx={
              btSize === "large" || btSize === "medium"
                ? { width: "2rem", height: "2rem" }
                : { width: "1rem", height: "1rem" }
            }
          />
        ) : (
          <VolumeUpRounded
            sx={
              btSize === "large" || btSize === "medium"
                ? { width: "2rem", height: "2rem" }
                : { width: "1rem", height: "1rem" }
            }
          />
        )}
      </IconButton>
    </Box>
  );
}

const opts = {
  height: "100%",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    playsinline: 1,
    autoplay: 1,
    controls: 0,
    modestbranding: 0,
    rel: 0,
    mute: 1,
    loop: 1,
  },
};
