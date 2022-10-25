import { axiosMovies } from "../../config/axiosConfig";

export const getTrailerData = async (id, type) => {
  try {
    const movies = await axiosMovies.get(
      type === "tv" ? `/tv/${id}/videos` : `/movie/${id}/videos`
    );
    return movies?.data?.results ?? [];
  } catch (error) {
    console.error(error);
    return null;
  }
};
