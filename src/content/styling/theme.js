import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      contrastText: "#000000",
    },
    secondary: {
      main: "#e50914",
      contrastText: "#FFFFFF",
    },
    black: {
      main: "#000000",
      light:'#666666',
      medium:"#333333",
      contrastText: "#FFFFFF",
    },
    bg: {
      main: "#141414",
    },
  },
});
