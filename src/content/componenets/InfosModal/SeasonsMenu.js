import { ArrowDropDownRounded } from "@mui/icons-material";
import { Button, Popper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
export const SeaasonsMenu = ({
  movieDetailes,
  setSeasonChoice,
  seasonChoise,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const Choose = (index) => {
    setSeasonChoice(index);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <>
      <Button
        ariaDescribedby={id}
        type="button"
        onClick={handleClick}
        variant="outlined"
        sx={classes.button}
        endIcon={
          <ArrowDropDownRounded
            sx={{
              width: "2em",
              height: "2em",
              transition: "transform .2s ease",
              ...(open && { transform: "rotate(180deg)" }),
            }}
          />
        }
      >
        {movieDetailes.seasons?.filter((s) => s.season_number > 0)?.[
          seasonChoise
        ]?.name ?? ""}
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 9999 }}>
        <Stack
          sx={{ border: 1, px: 0, py: 1, bgcolor: "black.medium" }}
          spacing={0}
        >
          {movieDetailes?.seasons
            ?.filter((s) => s.season_number > 0)
            ?.map((se, index) => (
              <Button
                sx={classes.button}
                key={index}
                onClick={() => Choose(index)}
              >
                {se.name}{" "}
                <Typography component={"span"} sx={classes.episodesCount}>
                  ({se.episode_count} Episodes)
                </Typography>
              </Button>
            ))}
        </Stack>
      </Popper>
    </>
  );
};

const classes = {
  button: {
    borderWidth: "4px !important",
    borderColor: "black.light",
    fontFamily: "NBOLD",
    textTransform: "capitalize",
    fontSize: "1rem",
    px: "1.3rem",
    display: "flex",
    alignItems: "center",
  },
  episodesCount: {
    fontFamily: "NLight",
    marginLeft: 1,
    fontSize: ".8rem",
  },
};
