import { Close, PlayArrowRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../../../assets/imgs/bg.jpg";
import { ImagesBaseUrl } from "../../../config/apis";
import { MoviesContext } from "../../context/context";
import useMoviesHook from "../../hooks/useMoviesHook";
import useTrailerHook from "../../hooks/useTrailerHook";
import { CardsMap } from "../ListScreen/SearchListScreen";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "md",
  minHeight: "100vh",
  bgcolor: "bg.main",
  borderRadius: { xs: "0", md: "12px" },
  mt: 4,
  // p: 4,
  overflow: "auto",
};
export default function InfoModal() {
  const { InfosMovie, setInfoMovie } = useContext(MoviesContext);
  const { trailer, getTrailer } = useTrailerHook();
  const { filterSimilarMovies, movies, cleanMovies } = useMoviesHook();
  useEffect(() => {
    if (InfosMovie?.id) getTrailer(InfosMovie?.id);
  }, [getTrailer, InfosMovie?.id]);

  useEffect(() => {
    if (InfosMovie?.id) filterSimilarMovies(InfosMovie?.id);
    return () => cleanMovies();
  }, [filterSimilarMovies, InfosMovie?.id]);

  return (
    <Modal
      open={InfosMovie !== null}
      onClose={() => setInfoMovie(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container disableGutters maxWidth="lg" sx={style} id={"infomodal"}>
        <InfoLayer
          trailer={trailer}
          movie={InfosMovie}
          similarMovies={movies}
        />
      </Container>
    </Modal>
  );
}

const InfoLayer = ({ trailer, movie, similarMovies }) => {
  const navigate = useNavigate();
  const { setInfoMovie } = useContext(MoviesContext);

  let location = useLocation();
  const PlayVideo = () => {
    navigate(`${location.pathname}/watch/${movie.id}`);
    setInfoMovie(null);
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
      <Box sx={{ width: "calc(100%)", height: "80vw", position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", top: 0, zIndex: 99, right: 0 }}
          onClick={() => setInfoMovie(null)}
        >
          <Close sx={{ color: "primary.main" }} />
        </IconButton>
        {trailer ? (
          <iframe
            style={{
              pointerEvents: "none",
              position: "relative",
              top: "-25%",
            }}
            title="movieframe"
            frameBorder={0}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailer}?${process.env.REACT_APP_YOUTUBE_CONFIG_VOLUME}${trailer}`}
          ></iframe>
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
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "relative",
              top: "-25%",
            }}
          />
        )}
        <Box
          sx={{
            height: "200px",
            background: "linear-gradient(transparent 0% , #141414 80%)",
            zIndex: 2,
            position: "absolute",
            bottom: "24%",
            width: "100%",
          }}
        />
        <Stack sx={classes.infoStack} spacing={{ xs: 0.5, md: 1, lg: 2 }}>
          <TextInfos movie={movie} />
          <Typography sx={{ ...classes.title, mt: 2, fontSize: "1.2rem" }}>
            Similar Movies:
          </Typography>
          <CardsMap movies={similarMovies} />
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ position: "absolute", top: "30%", left: "5%" }}
        >
          <Stack sx={{ zIndex: 4 }}>
            <Stack direction={"row"} alignItems="center" spacing={0.5}>
              <Typography
                sx={{
                  ...classes.title,
                  textTransform: "capitalize",
                  color: "primary.main",
                  fontSize: "clamp(16px, 4vw, 2rem)",
                  whiteSpace: "nowrap",
                }}
                variant="h1"
              >
                {movie.title}
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
              {movie.media_type === "tv" ? "Series" : "Movie"}
            </Typography>
          </Stack>
          <Button
            color="primary"
            variant="contained"
            sx={classes.button}
            onClick={PlayVideo}
            startIcon={
              <PlayArrowRounded sx={{ width: "2rem", height: "2rem" }} />
            }
          >
            Play
          </Button>
        </Stack>
        <Stack
          sx={{
            display: { xs: "flex", md: "none" },
            px: "5%",
            position: "relative",
            bottom: "10%",
            zIndex: 2,
            top: "-47%",
          }}
          spacing={2}
        >
          <TextInfos movie={movie} />
          <Button
            color="primary"
            variant="contained"
            sx={{ ...classes.button, display: { xs: "flex", sm: "none" } }}
            onClick={PlayVideo}
            startIcon={
              <PlayArrowRounded sx={{ width: "2rem", height: "2rem" }} />
            }
          >
            Play
          </Button>
          <Typography sx={{ ...classes.title, mt: 2, fontSize: "1.2rem" }}>
            Similar Movies:
          </Typography>
          <CardsMap movies={similarMovies} />
        </Stack>
      </Box>
    </Stack>
  );
};

const TextInfos = ({ movie }) => {
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "start", sm: "center" }}
      >
        <Stack direction={"row"} spacing={1} alignItems="center">
          {movie.release_date?.split("-")?.[0] ===
          new Date().getFullYear().toString() ? (
            <Typography
              sx={{
                ...classes.title,
                color: "#46d369",
                fontSize: "clamp(16px, 4vw, 1rem)",
              }}
            >
              NEW
            </Typography>
          ) : null}
          <Typography
            sx={{
              ...classes.title,
              fontSize: "clamp(16px, 4vw, 1rem)",
            }}
            variant="caption"
            component={"span"}
          >
            {movie.release_date?.split("-")?.[0] || "no Date"}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            sx={{
              ...classes.title,
              fontSize: ".7rem",
              fontFamily: "Nlight",
              // color: "secondary.main",
            }}
            variant="caption"
            component={"span"}
          >
            Votes:
          </Typography>
          <Typography
            sx={{
              ...classes.title,
              fontSize: "clamp(16px, 4vw, 1rem)",
              color: "secondary.main",
            }}
            variant="caption"
            component={"span"}
          >
            {movie?.vote_average * 10 || "0"}%
          </Typography>
        </Stack>
      </Stack>
      <Typography sx={classes.desc}>{movie?.overview || ""}</Typography>
    </>
  );
};

const classes = {
  poster: {
    width: "100%",
    objectFit: "cover",
    height: "100%",
    filter: "blur(2px)",
  },
  infoStack: {
    display: { xs: "none", md: "flex" },
    zIndex: 99,
    position: "absolute",
    top: "52%",
    px: "5%",
    width: "-webkit-fill-available",
  },
  title: {
    color: "primary.main",
    fontFamily: "NBOLD",
  },
  desc: {
    color: "primary.main",
    fontFamily: "NLight",
    fontSize: "clamp(16px, 4vw, 1rem)",
  },
  button: {
    alignSelf: "flex-start",
    px: 4,
    zIndex: 4,
    fontFamily: "NBOLD",
    display: { xs: "none", sm: "flex" },
  },
};
