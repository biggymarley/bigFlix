import { ChevronRightRounded, TurnRightRounded } from "@mui/icons-material";
import { Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import Slider from "../Slider/Slider";

export default function DiscoverContent({ modes, type }) {
  return (
    <Stack>
      <Toolbar />
      {modes.map((mode, index) => (
        <Stack key={index} spacing={2} mt={3} ml={4}>
          <GereTitle mode={mode}/>
          <Slider mode={mode} type={type} />
        </Stack>
      ))}
    </Stack>
  );
}
const GereTitle = ({mode}) => {
  const [hover, setHover] = useState(false);

  return (
    <Stack direction={"row"} spacing={1} alignItems="center">
      <Typography
        component={"span"}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          alignSelf: "baseline",
          color: "primary.main",
          fontFamily: "NBOLD",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        {mode.label}
      </Typography>
      <Typography
        sx={{
          color: "secondary.main",
          fontFamily: "NLight",
          fontSize: ".8rem",
          transition: "all .2s linear",
          position: "relative",
          opacity: 0,
          right: "20px",
          ...(hover && { opacity: 1, right: "0" }),
        }}
      >
        Explore All
      </Typography>
      <ChevronRightRounded
        sx={{
          height: "1.5rem",
          color: "secondary.main",
          transition: "all .2s linear",
          position: "relative",
          opacity: 0,
          right: "100px",
          ...(hover && { opacity: 1, right: "8px" }),
        }}
      />
    </Stack>
  );
};
