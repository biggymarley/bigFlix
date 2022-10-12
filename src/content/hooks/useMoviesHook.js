import { useCallback, useEffect, useState } from "react";
import { GetMoviesList } from "../apisConnections/getMoviesList";
import { multiSearch } from "../apisConnections/multiSearch";

export default function useMoviesHook() {
  const [movies, setMovies] = useState([]);
  const fetchMovies = useCallback(async (pageNumber) => {
    const fetchedMovies = await GetMoviesList(pageNumber);
    if (fetchedMovies) setMovies([]);
  }, []);

  const SearchAll = useCallback(async (query, pageNumber) => {
    const fetchedMovies = await multiSearch(query, pageNumber);
    if (fetchedMovies) {
      setMovies([...fetchedMovies]);
    }
  }, [setMovies]);

  useEffect(() => {
    fetchMovies("1");
  }, [fetchMovies]);

  return { movies, fetchMovies, SearchAll };
}
