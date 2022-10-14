import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Slider from "../Slider/Slider";

export default function DiscoverContent({ modes }) {
  return (
    <Stack>
      {modes.map((mode, index) => (
        <Stack key={index} spacing={3} mt={3} ml={4}>
          <Typography
            sx={{
              color: "primary.main",
              fontFamily: "NBOLD",
              fontSize: "1.2rem",
              marginLeft: "90px",
            }}
          >
            {mode.label}
          </Typography>
          <Slider mode={mode} />
        </Stack>
      ))}
    </Stack>
  );
}
