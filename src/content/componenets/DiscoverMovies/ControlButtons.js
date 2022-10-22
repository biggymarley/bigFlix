import { InfoOutlined, PlayArrowRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../../context/context";
export const ControlButtons = ({ nowPlayingMovie }) => {
  const navigate = useNavigate();
  const { setInfoMovie } = useContext(MoviesContext);

  const PlayVideo = () => {
    if (nowPlayingMovie?.media_type === "tv")
      navigate(`watch/${nowPlayingMovie.id}/1-1`);
    else navigate(`watch/${nowPlayingMovie.id}`);
  };
  return (
    <Stack
      sx={{
        position: "absolute",
        top: { xs: "50%", md: "70%" },
        left: { xs: "50%", md: "5%" },
        transform: { xs: "translate(-50%, 0)", md: "translate(0, 0)" },
      }}
      spacing={2}
    >
      <Stack>
        <Typography
          sx={{
            ...classes.title,
            textTransform: "capitalize",
            color: "primary.main",
            fontSize: "2rem",
          }}
          variant="h1"
        >
          {nowPlayingMovie.title}
        </Typography>
        <Typography
          sx={{
            ...classes.title,
            textTransform: "capitalize",
            color: "secondary.main",
          }}
          variant="caption"
          component={"span"}
        >
          {nowPlayingMovie.media_type === "tv" ? "Series" : "Movie"}
        </Typography>
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Button
          onClick={PlayVideo}
          variant="contained"
          startIcon={
            <PlayArrowRounded sx={{ width: "2.5rem", height: "2.5rem" }} />
          }
          sx={{
            px: 4,
            fontFamily: "NMedium",
            textTransform: "capitalize",
            fontSize: "1.2rem",
          }}
        >
          Play
        </Button>
        <Button
          onClick={() => setInfoMovie(nowPlayingMovie)}
          startIcon={<InfoOutlined sx={{ width: "2rem", height: "2rem" }} />}
          sx={{
            px: 4,
            fontFamily: "NMedium",
            textTransform: "capitalize",
            fontSize: "1.2rem",
            bgcolor: "rgba(109, 109, 110, 0.7)",
          }}
        >
          More Info
        </Button>
      </Stack>
    </Stack>
  );
};

const classes = {
  title: {
    color: "primary.main",
    fontFamily: "NBOLD",
    fontSize: "1rem",
  },
};
