import { Skeleton } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect } from "react";
import useMoviesHook from "../../hooks/useMoviesHook";
import MovieCard from "../ListScreen/MovieCard";

export default function Slider({ mode }) {
  const { fetchMoviesByGenre, fetchMoviesByApi, movies } = useMoviesHook();

  useEffect(() => {
    if (mode.params) fetchMoviesByGenre(mode.api, "1", mode.params);
    else fetchMoviesByApi(mode.api, "1");
  }, [mode, fetchMoviesByApi, fetchMoviesByGenre]);

  return (
    <Splide
      options={{
        type: "slide",
        padding: { left: "5vw", right: "5vw" },
        trimSpace: true,
        perPage: 5,
        focus: 0,
        arrows: true,
        pagination: false,
        gap: 16,
        drag: false,
        rewind: false,
        lazyLoad: true,
        omitEnd: false,
        breakpoints: {
          1336: {
            perPage: 4,
          },
          1200: {
            perPage: 3,
          },
          900: {
            perPage: 2,
          },
          650: {
            perPage: 1,
          },
        },
      }}
    >
      {movies.length > 0
        ? movies.map((movie, index) => (
            <SplideSlide key={index}>
              <MovieCard movie={movie} />
            </SplideSlide>
          ))
        : SceletonMovies.map((e, index) => (
            <SplideSlide key={index}>
              <Skeleton variant="rectangular" width={"100%"} height={"25vw"} />
            </SplideSlide>
          ))}
      {}
    </Splide>
  );
}

const SceletonMovies = Array.from(Array(20).keys());
