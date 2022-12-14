import { Movie, TvRounded } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/imgs/bg.jpg";
import Logo from "../../../assets/imgs/bigflix.png";
import { SearchContext, StatusContext } from "../../context/context";
import { StyledTextField } from "../../styledComponents/StyledTextField";

 const Img = styled('img')({});

export default function Home() {
  const { dispatch } = useContext(StatusContext);
  const { query, HandleSearchChange } = useContext(SearchContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const EnterListner = (event) => {
    if (event.key === "Enter") SearchQuery();
  };

  const SearchQuery = () => {
    if (query === "") setError("Please enter movies, tv shows or people");
    else {
      navigate(`/browse/${query}`);
      setError("");
    }
  };

  const discover = () => {
    dispatch({ type: "showLoading", payload: true });
    setTimeout(() => {
      navigate("/discover/movies");
    }, 1000);
  };

  const discoverSeries = () => {
    dispatch({ type: "showLoading", payload: true });
    setTimeout(() => {
      navigate("/discover/series");
    }, 1000);
  };

  return (
    <Container maxWidth={"100%"} sx={classes.root}>
      <Toolbar disableGutters>
        <Stack
          direction={"row"}
          py={4}
          px={2}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Img src={Logo} alt="" sx={{ objectFit: "contain", width: { xs: 80, sm: 120 } }} />
          <Stack direction={"row"} spacing={{xs:.5, sm: 2}}>
            <IconButton color="secondary" onClick={discover}>
              <Movie
                sx={{
                  width: { xs: "1.5rem", sm: "2rem" },
                  height: { xs: "1.5rem", sm: "2rem" },
                }}
              />
            </IconButton>
            <IconButton color="secondary" onClick={discoverSeries}>
              <TvRounded
                sx={{
                  width: { xs: "1.5rem", sm: "2rem" },
                  height: { xs: "1.5rem", sm: "2rem" },
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
      <Stack
        direction={"column"}
        width={"100%"}
        sx={{ flexGrow: 1 }}
        justifyContent="center"
        alignItems={"center"}
      >
        <Typography component={"h1"} variant="h1" sx={classes.h1}>
          Unlimited movies, TV
        </Typography>
        <Typography component={"h1"} variant="h1" sx={classes.h1}>
          shows, and more.
        </Typography>
        <Typography variant="caption" sx={classes.caption}>
          Watch anywhere. Cancel anytime.
        </Typography>
        <Typography
          variant="caption"
          sx={{ ...classes.caption, fontSize: "1.1rem" }}
        >
          Ready to watch? Enter your Movie or TV Serie.
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          mt="16px"
          spacing={{ xs: 2, md: 0 }}
          sx={{ width: "100%" }}
          justifyContent="center"
          alignItems={{ xs: "center", md: "normal" }}
        >
          <StyledTextField
            placeholder="Search"
            variant="standard"
            onChange={HandleSearchChange}
            onKeyDown={EnterListner}
            value={query}
          />
          <Button
            color="secondary"
            variant="contained"
            sx={classes.button}
            onClick={SearchQuery}
          >
            Search
          </Button>
        </Stack>
        {error === "" ? null : (
          <Typography variant="caption" sx={{ color: "warning.light", mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* <Button
          color="secondary"
          variant="outlined"
          onClick={discover}
          sx={{ ...classes.button, mt: 5 }}
        >
          Discover Movies
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={discoverSeries}
          sx={{ ...classes.button, mt: 5 }}
        >
          Discover Series
        </Button> */}
      </Stack>
    </Container>
  );
}

const classes = {
  logo: {},
  root: {
    minHeight: "100vh",
    background: `linear-gradient(rgba(0, 0, 0, .8),rgba(0, 0, 0, .4),  rgba(0, 0, 0, .8)), url(${bg})`,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
  },
  h1: {
    textAlign: "center",
    fontFamily: "NMedium",
    color: "primary.main",
    fontSize: "clamp(2rem, 5vw, 4rem)",
  },
  caption: {
    textAlign: "center",
    marginTop: "12px",
    fontFamily: "NRegular",
    color: "primary.main",
    fontSize: "clamp(1rem, 3vw, 1.6rem)",
  },
  button: {
    borderRadius: "0px",
    boxShadow: 0,
    fontFamily: "NMedium",
    px: 8,
  },
};
