import { Container, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import useMoviesHook from "../../hooks/useMoviesHook";
import Nodatafound from "../../styledComponents/Nodatafound";
import { CardsMap } from "../ListScreen/SearchListScreen";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
export default function WatchLater() {
  const [watchLaterMovies, setWatchLaterMovies] = useState([])
  const [cookies] = useCookies(["watch-later"]);
  console.log(cookies);
  const { GetMovieDetailes } =
    useMoviesHook();



  useEffect(() => {
    const GetMoviesDetails = async (moviesArray) => {
      let array = []
      for(let key in moviesArray){
        let res = await GetMovieDetailes(moviesArray[key].id, moviesArray[key].type)
        array = [...array, res]
      } 
      setWatchLaterMovies([...array])
    };
    if (cookies && cookies["watch-later"]?.length > 0) {
      GetMoviesDetails(cookies["watch-later"]);
    }
  }, [cookies,GetMovieDetailes]);

  return (
    <Container maxWidth="100%">
      <Toolbar />
      {watchLaterMovies.length > 0 ? <CardsMap movies={watchLaterMovies} /> : <Nodatafound />}

      <Routes>
        <Route path="watch/:id/:se-:ep/" element={<VideoPlayer />} />
        <Route path="watch/:id/" element={<VideoPlayer />} />
      </Routes>
    </Container>
  );
}
