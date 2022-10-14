import { Container, Stack, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { SearchContext } from "../context/context";

export default function Nodatafound() {
  const { query } = useContext(SearchContext);
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Toolbar />
      <Stack spacing={2}>
        <Typography sx={classes.p} variant="caption">
          Your search for "{query}" did not have any matches.
        </Typography>
        <Stack>
          <Typography sx={classes.p} variant="caption">
            Suggestions:
          </Typography>
          <Stack sx={{ marginLeft: 3, mt: 1 }}>
            <Typography sx={classes.p} variant="caption">
              - Try different keywords
            </Typography>
            <Typography sx={classes.p} variant="caption">
              - Looking for a movie or TV show?
            </Typography>
            <Typography sx={classes.p} variant="caption">
              - Try using a movie, TV show title, an actor or director
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

const classes = {
  p: {
    fontFamily: "NRegular",
    color: "primary.main",
  },
};
