import { useCallback, useContext, useState } from "react";
import { NowPlayingMoviesApi, PopularMoviesApi } from "../../config/apis";
import { CheckMovieDB } from "../apisConnections/CheckMovieDB";
import { GetMoviesList } from "../apisConnections/getMoviesList";
import { getMoviesWithParams } from "../apisConnections/getMoviesWithParams";
import { multiSearch } from "../apisConnections/multiSearch";
import { StatusContext } from "../context/context";

const filterBadData = async (array, type) => {
  // try {
  //   let filtred = [];
  //   for (let ar in array) {
  //     const res = await CheckMovieDB(
  //       array[ar].id,
  //       type ?? array[ar].media_type
  //     );
  //     if (res !== null || array[ar].media_type === "person")
  //       filtred = [...filtred, array[ar]];
  //   }
  //   return filtred;
  // } catch (error) {
  //   return [];
  // }
  return array
};

export default function useMoviesHook() {
  const [movies, setMovies] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [nowPlayingMovie, setNowPlayingMovie] = useState({});
  const [movieDetailes, setMovieDetailes] = useState({});
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const { dispatch } = useContext(StatusContext);

  const cleanMovies = useCallback(() => {
    setMovies([]);
  }, []);

  const cleanMovieDetails = useCallback(() => {
    setMovieDetailes({});
  }, []);

  const fetchEpisodes = useCallback(async (serieId, season) => {
    const fetchedMovies = await GetMoviesList(
      "1",
      `tv/${serieId}/season/${season + 1}`
    );
    if (fetchedMovies) {
      setEpisodes([...fetchedMovies.episodes]);
    }
  }, []);

  const fetchPopularMovies = useCallback(
    async (pageNumber) => {
      dispatch({ type: "showLoading", payload: true });
      const fetchedMovies = await GetMoviesList(pageNumber, PopularMoviesApi);
      dispatch({ type: "showLoading", payload: false });
      if (fetchedMovies) setMovies([]);
    },
    [dispatch]
  );

  const fetchMoviesByApi = useCallback(
    async (api, pageNumber, type) => {
      const fetchedMovies = await GetMoviesList(pageNumber, api);
      if (fetchedMovies?.results) {
        dispatch({ type: "showLoading", payload: true });
        const fitred = await filterBadData(
          fetchedMovies?.results,
          type ?? "movie"
        );
        setMovies([...fitred]);
        dispatch({ type: "showLoading", payload: false });
      }
    },
    [dispatch]
  );

  const GetMovieDetailes = useCallback(
    async (id, media_type) => {
      dispatch({ type: "showLoading", payload: true });
      const fetchedMovies = await GetMoviesList(
        "1",
        media_type === "movie" ? `movie/${id}` : `tv/${id}`
      );
      dispatch({ type: "showLoading", payload: false });
      if (fetchedMovies) {
        setMovieDetailes({ ...fetchedMovies });
        return(fetchedMovies)
      }
    },
    [dispatch]
  );

  const fetchMoviesByGenre = useCallback(
    async (api, pageNumber, params, type) => {
      const fetchedMovies = await getMoviesWithParams(pageNumber, api, params);
      if (fetchedMovies?.results) {
        dispatch({ type: "showLoading", payload: true });
        const fitred = await filterBadData(
          fetchedMovies?.results,
          type ?? "movie"
        );
        setMovies([...fitred]);
        dispatch({ type: "showLoading", payload: false });
      }
    },
    [dispatch]
  );

  const fetchLatestMovie = useCallback(async (pageNumber) => {
    // dispatch({ type: "showLoading", payload: true });
    // const fetchedMovies = await GetMoviesList(pageNumber, LatestMoviesApi);
    // dispatch({ type: "showLoading", payload: false });
    // if (fetchedMovies) setLatestMovie([]);
  }, []);

  const filterSimilarMovies = useCallback(async (id, type) => {
    const fetchedMovies = await GetMoviesList("1", `${type}/${id}/similar`);
    if (fetchedMovies?.results) {
      const fitred = await filterBadData(fetchedMovies?.results, type);
      setMovies([...fitred]);
    }
  }, []);

  const fetchNowPlayingMovie = useCallback(
    async (pageNumber) => {
      const fetchedMovies = await GetMoviesList(
        pageNumber,
        NowPlayingMoviesApi
      );
      if (
        fetchedMovies &&
        fetchedMovies?.results &&
        fetchedMovies?.results?.length > 0
      ) {
        dispatch({ type: "showLoading", payload: true });
        const fitred = await filterBadData(fetchedMovies?.results, "movie");
        setNowPlayingMovie({ ...fitred[0] });
        dispatch({ type: "showLoading", payload: false });
      }
    },
    [dispatch]
  );

  const fetchNowPlayingMovies = useCallback(
    async (pageNumber) => {
      const fetchedMovies = await GetMoviesList(
        pageNumber,
        NowPlayingMoviesApi
      );
      dispatch({ type: "showLoading", payload: false });
      if (fetchedMovies?.results) {
        dispatch({ type: "showLoading", payload: true });
        const fitred = await filterBadData(fetchedMovies?.results, "movie");
        setNowPlayingMovies([...fitred]);
        dispatch({ type: "showLoading", payload: false });
      }
    },
    [dispatch]
  );

  const SearchAll = useCallback(
    async (query, pageNumber) => {
      const fetchedMovies = await multiSearch(query, pageNumber);
      if (fetchedMovies) {
        dispatch({ type: "showLoading", payload: true });
        const fitred = await filterBadData(fetchedMovies);
        setMovies([...fitred]);
        dispatch({ type: "showLoading", payload: false });
      }
    },
    [dispatch]
  );

  return {
    movies,
    nowPlayingMovie,
    nowPlayingMovies,
    movieDetailes,
    episodes,
    fetchPopularMovies,
    fetchLatestMovie,
    fetchNowPlayingMovie,
    fetchNowPlayingMovies,
    SearchAll,
    fetchMoviesByApi,
    fetchMoviesByGenre,
    filterSimilarMovies,
    cleanMovies,
    GetMovieDetailes,
    fetchEpisodes,
    cleanMovieDetails
  };
}
