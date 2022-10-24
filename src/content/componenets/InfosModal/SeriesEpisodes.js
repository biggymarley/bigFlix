import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import useMoviesHook from "../../hooks/useMoviesHook";
import EpisodesMap from "./EpisodesMap";
import { SeaasonsMenu } from "./SeasonsMenu";

export default function SeriesEpisodes({ serie }) {
  const { movieDetailes, GetMovieDetailes } = useMoviesHook();
  const [seasonChoise, setSeasonChoice] = useState(0);
  useEffect(() => {
    GetMovieDetailes(serie.id, "tv");
  }, [GetMovieDetailes, serie]);

  return (
    <Stack pt={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Typography
          sx={{ fontFamily: "NBOLD", color: "primary.main", fontSize: "2rem" }}
        >
          Episodes
        </Typography>
        <SeaasonsMenu
          movieDetailes={movieDetailes}
          seasonChoise={seasonChoise}
          setSeasonChoice={setSeasonChoice}
        />
      </Stack>
      <EpisodesMap movieDetailes={movieDetailes} seasonChoise={seasonChoise} />
    </Stack>
  );
}
