import { Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/imgs/bg.jpg";
import Logo from "../../../assets/imgs/logo";
import { StyledTextField } from "../../styledComponents/StyledTextField";
import { theme } from "../../styling/theme";

export default function Home() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const HandleChange = (event) => {
    setQuery(event.target.value);
  };

  const SearchQuery = () => {
    if (query === "") setError("Please enter movies, tv shows or people");
    else {
      navigate(`/browse/${query}`);
      setError("");
    }
  };
  return (
    <Container maxWidth={"xl"} sx={classes.root}>
      <Toolbar>
        <Stack direction={"row"} py={4} px={2}>
          <Logo color={theme.palette.secondary.main} width={160}  />
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
        >
          <StyledTextField
            label="Search"
            variant="standard"
            onChange={HandleChange}
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

        <Button
          color="secondary"
          variant="outlined"
          sx={{ ...classes.button, mt: 5 }}
        >
          Discover
        </Button>
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
