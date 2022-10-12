import axios from "axios";
export const axiosMovies = axios.create({
  baseURL: process.env.REACT_APP_MOVIES_TMDB,
  params: { api_key: process.env.REACT_APP_KEY },
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

// export const axiosSeries = axios.create({
//   baseURL: process.env.REACT_APP_SERIES_JSON_BASE,
//   headers: {
//     Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
//     "Content-Type": "application/json;charset=utf-8",
//   },
// });
