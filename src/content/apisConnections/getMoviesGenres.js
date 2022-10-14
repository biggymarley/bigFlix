import { MoviesGenresApi } from "../../config/apis";
import { axiosMovies } from "../../config/axiosConfig";

export const getMoviesGenres = async () => {
  try {
    const movies = await axiosMovies.get(MoviesGenresApi);
    return movies?.data ?? [];
  } catch (error) {
    console.error(error);
    return null;
  }
};
