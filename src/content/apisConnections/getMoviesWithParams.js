import { axiosMovies } from "../../config/axiosConfig";

export const getMoviesWithParams = async (pageNumber, api, params) => {
  try {
    const movies = await axiosMovies.get(api, { params:params });
    return movies?.data ?? [];
  } catch (error) {
    console.error(error);
    return null;
  }
};
