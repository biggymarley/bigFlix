import { PopularMoviesApi } from "../../config/apis";
import { axiosMovies } from "../../config/axiosConfig";

export const GetMoviesList = async (pageNumber) => {
  try {
    const movies = await axiosMovies.get(PopularMoviesApi);
    return movies?.result ?? [];
  } catch (error) {
    console.error(error);
    return null;
  }
};
