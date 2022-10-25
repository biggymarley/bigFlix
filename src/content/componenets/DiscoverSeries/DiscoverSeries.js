import { Container, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  DiscoverSeriesGenresApi,
  OnTheAirApi,
  PopularSeriesApi,
  TopRatedTvApi,
} from "../../../config/apis";
import { MoviesContext } from "../../context/context";
import useMoviesHook from "../../hooks/useMoviesHook";
import useTrailerHook from "../../hooks/useTrailerHook";
import DiscoverContent from "../DiscoverMovies/DiscoverContent";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
export default function DiscoverSeries() {
  const { nowPlayingMovie, fetchNowPlayingMovie } = useMoviesHook();
  const { trailer, getTrailer } = useTrailerHook();
  const { seriesGenres } = useContext(MoviesContext);
  const [modes, setModes] = useState(arrayMode);

  useEffect(() => {
    if (nowPlayingMovie?.id) getTrailer(nowPlayingMovie.id, "tv");
  }, [nowPlayingMovie, getTrailer]);

  useEffect(() => {
    fetchNowPlayingMovie();
  }, [fetchNowPlayingMovie]);

  useEffect(() => {
    let modesarray = arrayMode;
    seriesGenres.map((genre) => {
      modesarray = [
        ...modesarray,
        {
          id: `discover${genre.name}`,
          params: { with_genres: `${genre.id}` },
          label: `${genre.name}`,
          api: DiscoverSeriesGenresApi,
        },
      ];
      return null;
    });
    setModes([...modesarray]);
  }, [seriesGenres]);
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ height: "100vh", position: "relative" }}
    >
      {/* <NowPlayingTrailer trailer={trailer} nowPlayingMovie={nowPlayingMovie} />
      <ControlButtons nowPlayingMovie={nowPlayingMovie} /> */}
      <DiscoverContent modes={modes} type="tv" />
      <Routes>
        <Route path="watch/:id/:se-:ep/" element={<VideoPlayer />} />
        <Route path="watch/:id/" element={<VideoPlayer />} />
      </Routes>
      <Toolbar />
    </Container>
  );
}

let arrayMode = [
  {
    id: "air",
    label: "On The Air Today",
    api: OnTheAirApi,
  },
  {
    id: "TopRated",
    label: "Top Rated Series",
    api: TopRatedTvApi,
  },
  {
    id: "Popular",
    label: "Popular Series",
    api: PopularSeriesApi,
  },
];
