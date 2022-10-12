import { SearchApi } from "../../config/apis";
import { axiosMovies } from "../../config/axiosConfig";

export const multiSearch = async (query, pageNumber) => {
  try {
    const movies = await axiosMovies.get(SearchApi, { params: { query } });
    return movies?.data?.results ?? [];
  } catch (error) {
    console.error(error);
    return null;
  }
};
