import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import useMoviesHook from "../../hooks/useMoviesHook";

export default function OnPlayerInfo({ setEpSe, isMove }) {
  let { id, ep, se } = useParams();
  let location = useLocation();
  const [hide, sethide] = useState(false);
  const [nextSeason, setnextSeason] = useState(0);
  const navigation = useNavigate();
  const { movieDetailes, GetMovieDetailes, cleanMovieDetails } =
    useMoviesHook();
  useEffect(() => {
    GetMovieDetailes(id, "tv");
    return () => cleanMovieDetails();
  }, [id, cleanMovieDetails, GetMovieDetailes]);

  const HandleNextEpisode = () => {
    let Nep = 1;
    let Nse = se;
    let season = movieDetailes?.seasons?.filter(
      (s) => s.season_number === parseInt(se)
    );
    let newSeason = movieDetailes?.seasons?.filter(
      (s) => s.season_number === parseInt(se) + 1
    );
    if (season[0]?.episode_count - 1 === parseInt(ep) && newSeason.length > 0)
      setnextSeason(1);
    else if (
      season[0]?.episode_count - 2 === parseInt(ep) &&
      newSeason.length <= 0
    )
      setnextSeason(2);
    else if (
      season[0]?.episode_count - 1 === parseInt(ep) &&
      newSeason.length <= 0
    )
      sethide(true);
    else setnextSeason(0);
    if (season.length > 0 && season[0]?.episode_count === parseInt(ep)) {
      if (newSeason.length <= 0) {
        sethide(true);
        return;
      } else sethide(false);
      Nse = parseInt(se) + 1;
      Nep = 1;
    } else Nep = parseInt(ep) + 1;

    let path = generatePath(
      `${location.pathname.slice(
        0,
        location.pathname.lastIndexOf("/")
      )}/:se-:ep`,
      { se: Nse, ep: Nep }
    );
    navigation(path, {
      replace: true,
    });
    setEpSe({ ...{ se: Nse, ep: Nep } });
  };

  return (
    <Box sx={{...classes.root, ...(isMove && {
      opacity: 1, right: "3rem"
    })}}>
      {!hide ? (
        <Button
          sx={classes.button}
          variant="contained"
          color="primary"
          onClick={HandleNextEpisode}
        >
          {nextSeason === 1
            ? "Next Season"
            : nextSeason === 2
            ? "Last Episode"
            : "Next Episode"}
        </Button>
      ) : null}
    </Box>
  );
}

const classes = {
  root: {
    position: "absolute",
    bottom: "3rem",
    right: "-50vw",
    transition: "all .4s ease",
    opacity: 0,
  },
  button: {
    fontFamily: "NBOLD",
  },
};
