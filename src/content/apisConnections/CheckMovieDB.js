import axios from "axios";

export const CheckMovieDB = async (id, type) => {
  try {
    if (type === "movie") {
      const res = await axios.get(
        `${process.env.REACT_APP_MOVIES_URL_BASE}${id}`
      );
      return res;
    } else {
      const res = await axios.options(
        `${process.env.REACT_APP_MOVIES_URL_BASE}${id}/1-1`
      );
      return res;
    }
  } catch (error) {
    return null;
  }
};
