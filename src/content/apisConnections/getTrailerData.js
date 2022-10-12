import { axiosMovies } from "../../config/axiosConfig";

export const getTrailerData = async (id) => {
  try {
    const movies = await axiosMovies.get(`/movie/${id}/videos`);
    return movies?.data?.results ?? [];
  } catch (error) {
    console.error(error);
    return null;
  }
};
