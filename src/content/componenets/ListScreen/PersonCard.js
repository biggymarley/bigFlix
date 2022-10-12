import { Info } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from '../../../assets/imgs/bg.jpg';
import { ImagesBaseUrl } from "../../../config/apis";

export default function PersonCard({ movie }) {
  const [hovred, sethovred] = useState(false);

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={3}
      lg={2.4}
      sx={{ display: "flex" }}
      onMouseEnter={() => sethovred(true)}
      onMouseLeave={() => sethovred(false)}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 0,
          transition: "all .5s ease",
          ...(hovred && { transform: "scale(1.08)",   zIndex: 99, }),
        
        }}
      >
        <img
          src={
            movie?.profile_path ? `${ImagesBaseUrl}${movie?.profile_path}` : bg
          }
          style={classes.poster}
        />
        <Box
          sx={{
            opacity: 0,
            transition: "all .5s ease",
            ...(hovred && { opacity: 1 }),
          }}
        >
          {hovred ? <InfoLayer movie={movie} /> : null}
        </Box>
      </Box>
    </Grid>
  );
}

const InfoLayer = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      width={"100%"}
      height="100%"
      sx={{
        position: "absolute",
        top: 0,
        bgcolor: "#141414e0",
        backdropFilter: "blur(2px)",
      }}
    >
      <Box sx={{ width: "calc(100% - 2px)", height: "40%" }}>
        <img
          src={`${ImagesBaseUrl}${movie?.profile_path}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Stack height={"50%"} sx={classes.infoStack} spacing={2}>
        <TextInfos movie={movie} />
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent="flex-end"
          alignItems={"center"}
          sx={{ flexGrow: 1 }}
        >
          <IconButton color="primary">
            <Info sx={{ fontSize: "2rem", opacity: 0.4 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

const TextInfos = ({ movie }) => {
  return (
    <>
      <Stack>
        <Stack direction={"row"} alignItems="center" spacing={2}>
          <Typography sx={classes.title}>
            {movie.original_title || movie.original_name || movie.name}
          </Typography>
        </Stack>
        <Typography
          sx={{
            ...classes.title,
            textTransform: "capitalize",
            color: "secondary.main",
          }}
          variant="caption"
          component={"span"}
        >
          {movie.known_for_department || "Actor"}
        </Typography>
      </Stack>
    </>
  );
};
const classes = {
  poster: {
    width: "100%",
    objectFit: "cover",
    height: "100%",
  },
  infoStack: {
    // flexGrow:1,
    p: 2,
  },
  title: {
    color: "primary.main",
    fontFamily: "NBOLD",
  },
  desc: {
    color: "primary.main",
    fontFamily: "NLight",
    fontSize: "70%",
  },
  button: {
    px: 4,
    fontFamily: "NBOLD",
  },
};
