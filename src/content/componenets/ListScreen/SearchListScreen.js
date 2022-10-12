import { Container, Grid, Toolbar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { MoviesContext } from "../../context/context";
import useMoviesHook from "../../hooks/useMoviesHook";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Card from "./Card";
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
        <Typography>Not found</Typography>
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

const Switcher = ({ type, movie }) => {
  switch (type) {
    case "person":
      return <PersonCard movie={movie} />;
    case "tv":
      return <SeriesCard movie={movie} />;

    default:
      return <MovieCard movie={movie} />;
  }
};
