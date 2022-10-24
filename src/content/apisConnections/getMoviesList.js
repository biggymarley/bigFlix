import { axiosMovies } from "../../config/axiosConfig";

export const GetMoviesList = async (pageNumber, api) => {
  try {
    const movies = await axiosMovies.get(api);
    return movies?.data ?? [];
  } catch (error) {
    // console.error(error);
    return null;
  }
};
