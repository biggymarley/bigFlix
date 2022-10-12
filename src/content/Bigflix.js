import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MoviesContext } from "../content/context/context";
import useMoviesHook from "../content/hooks/useMoviesHook";
import { theme } from "../content/styling/theme";
import MainRouter from "./routes/MainRouter";
function App() {
  const { movies, fetchMovies, SearchAll } = useMoviesHook();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MoviesContext.Provider value={{ movies, fetchMovies, SearchAll }}>
          <MainRouter />
        </MoviesContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
