import { Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Slider from "../Slider/Slider";

export default function DiscoverContent({ modes , type}) {
  return (
    <Stack>
      <Toolbar/>
      {modes.map((mode, index) => (
        <Stack key={index} spacing={2} mt={3} ml={4}>
          <Typography
            sx={{
              color: "primary.main",
              fontFamily: "NBOLD",
              fontSize: "1.2rem",
            }}
          >
            {mode.label}
          </Typography>
          <Slider mode={mode} type={type} />
        </Stack>
      ))}
    </Stack>
  );
}
