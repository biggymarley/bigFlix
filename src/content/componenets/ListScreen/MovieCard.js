import { Info } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/imgs/bg.jpg";
import { ImagesBaseUrl } from "../../../config/apis";
import { MoviesContext } from "../../context/context";
import useTrailerHook from "../../hooks/useTrailerHook";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";

export default function MovieCard({ movie }) {
  const { trailer, getTrailer } = useTrailerHook();
  const [hovred, sethovred] = useState(false);

  useEffect(() => {
    getTrailer(movie.id, "movie");
  }, [getTrailer, movie.id]);

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={3}
      lg={2.4}
      sx={{ display: "flex", cursor: "pointer" }}
      onMouseEnter={() => sethovred(true)}
      onMouseLeave={() => sethovred(false)}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 0,
          transition: "all .5s ease",
          ...(hovred && { transform: "scale(1.08)", zIndex: 99 }),
        }}
      >
        <img
          alt=""
          src={
            movie?.poster_path || movie?.backdrop_path
              ? `${ImagesBaseUrl}${movie?.poster_path || movie?.backdrop_path}`
              : bg
          }
          style={classes.poster}
        />
        <Box
          sx={{
            opacity: 0,
            transition: "all .5s ease",
            ...(hovred && { opacity: 1 }),
          }}
        >
          {hovred ? <InfoLayer trailer={trailer} movie={movie} /> : null}
        </Box>
      </Box>
    </Grid>
  );
}

const InfoLayer = ({ trailer, movie }) => {
  const navigate = useNavigate();
  const { setInfoMovie } = useContext(MoviesContext);
  const PlayVideo = () => {
    navigate(`watch/${movie.id}`);
  };
  return (
    <Stack
      direction="column"
      width={"100%"}
      height="100%"
      sx={{
        position: "absolute",
        top: 0,
        bgcolor: "#141414e0",
        backdropFilter: "blur(2px)",
      }}
    >
      <Box
        sx={{
          width: "calc(100% - 2px)",
          height: "40%",
          position: "absolute",
          top: 0,
          bottom: "40%",
          zIndex: -1,
        }}
      >
        <img
          alt=""
          src={
            movie?.backdrop_path || movie?.poster_path
              ? `${ImagesBaseUrl}${movie?.backdrop_path || movie?.poster_path}`
              : bg
          }
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box sx={{ width: "calc(100%)", height: "40%" }}>
        {trailer ? (
          <YoutubePlayer id={trailer} />
        ) : (
          <img
            alt=""
            src={
              movie?.backdrop_path || movie?.poster_path
                ? `${ImagesBaseUrl}${
                    movie?.backdrop_path || movie?.poster_path
                  }`
                : bg
            }
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </Box>
      <Stack
        height={"50%"}
        sx={classes.infoStack}
        spacing={{ xs: 0.5, md: 1, lg: 2 }}
      >
        <TextInfos movie={movie} />
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent="space-between"
          alignItems={"center"}
          sx={{ flexGrow: 1 }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={classes.button}
            onClick={PlayVideo}
          >
            Play
          </Button>
          <IconButton
            color="primary"
            onClick={() => setInfoMovie({ ...movie })}
          >
            <Info sx={{ fontSize: "2rem", opacity: 0.4 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

const TextInfos = ({ movie }) => {
  return (
    <>
      <Stack>
        <Stack direction={"row"} alignItems="center" spacing={0.5}>
          <Typography sx={classes.title}>
            {movie.original_title || movie.original_name || movie.name}
          </Typography>
          <Typography
            sx={{ ...classes.title, fontSize: "50%", fontFamily: "NRegular" }}
            variant="caption"
            component={"span"}
          >
            ({movie.release_date?.split("-")?.[0] || "no Date"})
          </Typography>
        </Stack>
        <Typography
          sx={{
            ...classes.title,
            textTransform: "capitalize",
            color: "secondary.main",
          }}
          variant="caption"
          component={"span"}
        >
          movie
        </Typography>
      </Stack>
      <Typography sx={classes.desc}>
        {movie?.overview?.slice(0, 60) || ""}...
      </Typography>
    </>
  );
};

const classes = {
  poster: {
    width: "100%",
    objectFit: "cover",
    height: "100%",
  },
  infoStack: {
    // flexGrow:1,
    p: 2,
  },
  title: {
    color: "primary.main",
    fontFamily: "NBOLD",
  },
  desc: {
    color: "primary.main",
    fontFamily: "NLight",
    fontSize: "70%",
  },
  button: {
    px: 4,
    fontFamily: "NBOLD",
  },
};
