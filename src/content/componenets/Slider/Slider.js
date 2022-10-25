import { Skeleton } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect } from "react";
import useMoviesHook from "../../hooks/useMoviesHook";
import MovieCard from "../ListScreen/MovieCard";
import SeriesCard from "../ListScreen/SeriesCard";

export default function Slider({ mode, type }) {
  const { fetchMoviesByGenre, fetchMoviesByApi, movies } = useMoviesHook();

  useEffect(() => {
    if (mode.params) fetchMoviesByGenre(mode.api, "1", mode.params, type);
    else fetchMoviesByApi(mode.api, "1", type);
  }, [mode, fetchMoviesByApi, fetchMoviesByGenre, type]);

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
            drag: true,
            perPage: 2,
          },
          650: {
            drag: true,

            perPage: 1,
          },
        },
      }}
    >
      {movies.length > 0
        ? movies.map((movie, index) => (
            <SplideSlide key={index}>
              {type === "tv" ? (
                <SeriesCard movie={movie} />
              ) : (
                <MovieCard movie={movie} />
              )}
            </SplideSlide>
          ))
        : SceletonMovies.map((e, index) => (
            <SplideSlide key={index}>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"25vw"}
                animation="wave"
              />
            </SplideSlide>
          ))}
      {}
    </Splide>
  );
}

const SceletonMovies = Array.from(Array(20).keys());
