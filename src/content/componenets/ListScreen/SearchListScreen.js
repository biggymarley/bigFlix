import { Container, Grid, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import useMoviesHook from "../../hooks/useMoviesHook";
import Nodatafound from "../../styledComponents/Nodatafound";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import SeriesCard from "./SeriesCard";

export default function SearchListScreen() {
  const { movies, SearchAll } = useMoviesHook();

  let { query } = useParams();

  useEffect(() => {
    if (query && query !== "") {
      SearchAll(query, "1");
      localStorage.setItem("query", query);
    }
  }, [query, SearchAll]);

  return (
    <Container maxWidth="xl">
      <Toolbar />
      {movies.length > 0 ? (
        <CardsMap movies={movies} />
      ) : (
        <Nodatafound/>
      )}

      <Routes>
        <Route path="watch/:id/:se-:ep/" element={<VideoPlayer />} />
        <Route path="watch/:id/" element={<VideoPlayer />} />
      </Routes>
    </Container>
  );
}

const CardsMap = ({ movies }) => {
  return (
    <Grid container spacing={1} rowSpacing={4}>
      {movies.map((movie, index) => (
        <Switcher movie={movie} key={index} type={movie.media_type} />
      ))}
    </Grid>
  );
};

export const Switcher = ({ type, movie }) => {
  switch (type) {
    case "person":
      return <PersonCard movie={movie} />;
    case "tv":
      return <SeriesCard movie={movie} />;

    default:
      return <MovieCard movie={movie} />;
  }
};
