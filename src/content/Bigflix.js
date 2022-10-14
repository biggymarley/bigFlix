import { ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import {
  MoviesContext,
  SearchContext,
  StatusContext,
} from "../content/context/context";
import { theme } from "../content/styling/theme";
import InfoModal from "./componenets/InfosModal/InfoModal";
import StatusComponent from "./componenets/StatusComponent/StatusComponent";
import useGenresHook from "./hooks/useGenresHook";
import useSearchHook from "./hooks/useSearchHook";
import useStatusHook from "./hooks/useStatusHook";
import MainRouter from "./routes/MainRouter";
function App() {
  const { moviesGenres, seriesGenres } = useGenresHook();
  const [uiState, dispatch] = useStatusHook();
  const { query, HandleSearchChange, clearSearchChange } = useSearchHook();
  const [InfosMovie, setInfoMovie] = useState(null);
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <SearchContext.Provider
          value={{ HandleSearchChange, query, clearSearchChange }}
        >
          <StatusContext.Provider value={{ uiState, dispatch }}>
            <MoviesContext.Provider
              value={{ moviesGenres, seriesGenres, setInfoMovie, InfosMovie }}
            >
              <StatusComponent />
              <InfoModal />
              <MainRouter />
            </MoviesContext.Provider>
          </StatusContext.Provider>
        </SearchContext.Provider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
