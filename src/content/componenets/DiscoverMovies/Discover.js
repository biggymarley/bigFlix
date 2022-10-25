import { Container, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  DiscoverGenresApi,
  NowPlayingMoviesApi,
  PopularMoviesApi,
  TopRatedApi,
} from "../../../config/apis";
import { MoviesContext } from "../../context/context";
import useMoviesHook from "../../hooks/useMoviesHook";
import useTrailerHook from "../../hooks/useTrailerHook";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { ControlButtons } from "./ControlButtons";
import DiscoverContent from "./DiscoverContent";
import { NowPlayingTrailer } from "./NowPlayingTrailer";
export default function Discover() {
  const { nowPlayingMovie, fetchNowPlayingMovie } = useMoviesHook();
  const { trailer, getTrailer } = useTrailerHook();
  const { moviesGenres } = useContext(MoviesContext);
  const [modes, setModes] = useState(arrayMode);

  useEffect(() => {
    if (nowPlayingMovie?.id) getTrailer(nowPlayingMovie.id, "movie");
  }, [nowPlayingMovie, getTrailer]);

  useEffect(() => {
    fetchNowPlayingMovie();
  }, [fetchNowPlayingMovie]);

  useEffect(() => {
    let modesarray = arrayMode;
    moviesGenres.map((genre) => {
      modesarray = [
        ...modesarray,
        {
          id: `discover${genre.name}`,
          params: { with_genres: `${genre.id}` },
          label: `${genre.name}`,
          api: DiscoverGenresApi,
        },
      ];
      return null;
    });
    setModes([...modesarray]);
  }, [moviesGenres]);
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ height: "100vh", position: "relative" }}
    >
      <NowPlayingTrailer trailer={trailer} nowPlayingMovie={nowPlayingMovie} />
      <ControlButtons nowPlayingMovie={nowPlayingMovie} />
      <DiscoverContent modes={modes} />
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
    id: "Cinema",
    label: "Playing Now on Cinemas",
    api: NowPlayingMoviesApi,
  },
  {
    id: "TopRated",
    label: "Top Rated Movies",
    api: TopRatedApi,
  },
  {
    id: "Popular",
    label: "Popular Movies",
    api: PopularMoviesApi,
  },
];
