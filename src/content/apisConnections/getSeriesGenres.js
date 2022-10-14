import { SeriesGenresApi } from "../../config/apis";
import { axiosMovies } from "../../config/axiosConfig";

export const getSeriesGenres = async () => {
  try {
    const movies = await axiosMovies.get(SeriesGenresApi);
    return movies?.data ?? [];
  } catch (error) {
    console.error(error);
    return null;
  }
};
