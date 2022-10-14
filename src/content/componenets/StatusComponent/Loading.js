import { Backdrop, CircularProgress } from "@mui/material";
import Lottie from "lottie-react";
import React, { useEffect, useRef } from "react";
import loadingJson from "../../../assets/animations/bigflix.json";
export default function Loading({ loading }) {
  const ref = useRef();
  useEffect(() => {
    ref.current.setSpeed(4);
    // ref.current.play();
  }, [ref]);
  useEffect(() => {
    if (loading === true) ref.current.play();
    else ref.current.stop();
  }, [ref, loading]);
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#000000",
      }}
      open={loading}
    >
      <Lottie
        animationData={loadingJson}
        loop={false}
        // autoplay={true}
        lottieRef={ref}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
      <CircularProgress
        color="secondary"
        sx={{
          position: "absolute",
          bottom: "20%",
          transform: "translate(-50%, 50%)",
          right: "50%",
        }}
      />
    </Backdrop>
  );
}
