import { Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { ImagesBaseUrl } from "../../../config/apis";
import useMoviesHook from "../../hooks/useMoviesHook";
import bg from "../../../assets/imgs/bg.jpg";
export default function EpisodesMap({ movieDetailes, seasonChoise }) {
  const { episodes, fetchEpisodes } = useMoviesHook();
  useEffect(() => {
    if (movieDetailes.id) fetchEpisodes(movieDetailes.id, seasonChoise);
  }, [movieDetailes, seasonChoise, fetchEpisodes]);

  return (
    <Stack spacing={4} sx={{ mt: 4,mb: 4 }}>
      <EpisodeInfo episodes={episodes} movieDetailes={movieDetailes} />
      <Divider sx={{ bgcolor: "black.light" }} />
    </Stack>
  );
}

const EpisodeInfo = ({ episodes, movieDetailes }) => {
  return episodes?.map((episode, index) => (
    <>
      <Divider sx={{ bgcolor: "black.light" }} />
      <Stack key={index} direction={{xs:"column", md:"row"}} spacing={2} alignItems="center">
        <Typography sx={classes.number}>
          {index + 1 < 10 ? (
            <Typography
              component={"span"}
              sx={{ ...classes.number, opacity: 0 }}
            >
              0
            </Typography>
          ) : null}
          {index + 1}
        </Typography>
        <Box sx={{ height: "7rem", display: "flex" }}>
          <img
            style={{ height: "100%", objectFit: "cover", borderRadius: "6px" }}
            src={
              episode?.still_path || movieDetailes.backdrop_path
                ? `${ImagesBaseUrl}${
                    episode?.still_path || movieDetailes.backdrop_path
                  }`
                : bg
            }
            alt="still"
          />
        </Box>
        <Stack spacing={2} sx={{flexGrow:1}}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="space-between"
          >
            <Typography sx={classes.title}> {episode.name}</Typography>
            {episode.runtime ? (
              <Typography sx={classes.title}> {episode.runtime}m</Typography>
            ) : null}
          </Stack>
          {episode.overview ? (
            <Typography sx={classes.desc}>{episode.overview}</Typography>
          ) : (
            <Typography sx={classes.desc}>
              Will be Relased on : {episode.air_date}
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  ));
};

const classes = {
  number: {
    fontFamily: "NMedium",
    color: "primary.main",
    fontSize: "2rem",
  },
  title: {
    fontFamily: "NBOLD",
    color: "primary.main",
    // fontSize: "2rem",
  },
  desc: {
    fontFamily: "NLight",
    color: "primary.main",
    opacity: 0.8,
    // fontSize: "2rem",
  },
};
