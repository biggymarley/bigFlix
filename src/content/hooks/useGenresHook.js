import { useCallback, useEffect, useState } from "react";
import { getMoviesGenres } from "../apisConnections/getMoviesGenres";
import { getSeriesGenres } from "../apisConnections/getSeriesGenres";

export default function useGenresHook() {
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);

  const fetchMoviesGenres = useCallback(async () => {
    const fetchedGenres = await getMoviesGenres();
    if (fetchedGenres?.genres) setMoviesGenres([...fetchedGenres.genres]);
  }, []);

  const fetchSeriesGenres = useCallback(async () => {
    const fetchedGenres = await getSeriesGenres();
    if (fetchedGenres?.genres) setSeriesGenres([...fetchedGenres.genres]);
  }, []);

  useEffect(() => {
    fetchMoviesGenres();
    fetchSeriesGenres();
  }, [fetchSeriesGenres, fetchMoviesGenres]);

  return { moviesGenres, seriesGenres };
}
