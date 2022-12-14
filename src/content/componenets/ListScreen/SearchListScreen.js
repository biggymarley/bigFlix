import { Container, Grid, Skeleton, Toolbar } from "@mui/material";
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
    <Container maxWidth="100%">
      <Toolbar />
      {movies.length > 0 ? <CardsMap movies={movies} /> : <Nodatafound />}

      <Routes>
        <Route path="watch/:id/:se-:ep/" element={<VideoPlayer />} />
        <Route path="watch/:id/" element={<VideoPlayer />} />
      </Routes>
    </Container>
  );
}
const SceletonMovies = Array.from(Array(20).keys());

export const CardsMap = ({ movies }) => {
  return (
    <Grid container spacing={1} rowSpacing={4}>
      {movies.length > 0
        ? movies.map((movie, index) => (
            <Switcher
              movie={movie}
              key={index}
              type={
                movie.media_type
                  ? movie.media_type
                  : movie.first_air_date
                  ? "tv"
                  : "movie"
              }
            />
          ))
        : SceletonMovies.map((e, index) => (
            <Grid item xs={12} sm={4} md={3} lg={2.4} key={index}>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"30vw"}
                animation="wave"
              />
            </Grid>
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
