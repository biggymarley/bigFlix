import { ArrowBack, Fullscreen, FullscreenExit } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function VideoPlayer() {
  const [isFull, setisFull] = useState(false);
  const [isMove, setisMove] = useState(false);
  let { id, ep, se } = useParams();
  const navigate = useNavigate();
  const ref = useRef({ current: null });

  const goFull = () => {
    ref.current
      .requestFullscreen()
      .then(function () {
        setisFull(true);
      })
      .catch(function (error) {
        setisFull(false);
        console.log(error.message);
      });
  };

  const exitFull = () => {
    document
      .exitFullscreen()
      .then(function () {
        setisFull(false);
      })
      .catch(function (error) {
        setisFull(true);
        console.log(error.message);
      });
  };

  const myListener = function () {
    setisMove(false);
  };
  const mouseMoveEffect = useCallback((timeout) => {
    clearTimeout(timeout);
    timeout = setTimeout(myListener, 4000);
    setisMove(true);
  }, []);

  useEffect(() => {
    let timeout;
    document.addEventListener("mousemove", () => {
      mouseMoveEffect(timeout);
    });
    return () =>
      document.removeEventListener("mousemove", () => {
        mouseMoveEffect(timeout);
      });
  }, [mouseMoveEffect]);

  return (
    <Modal open={true} keepMounted>
      <Container
        ref={ref}
        disableGutters
        maxWidth="xl"
        sx={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            mixBlendMode: "color",
            width: "100%",
            height: "51px",
            backgroundSize: "contain",
            transition: "all .4s ease",
            backgroundPosition: "center",
            left: "50%",
            opacity: 1,
            transform: "translate(-50%, 0%)",
            backdropFilter: "blur(1000px)",
            ...(isMove && { top: "-50vh" }),
          }}
        />
        <IconButton
          color="primary"
          sx={{
            position: "absolute",
            zIndex: 1999,
            transition: "all .4s ease",
            opacity: 0,
            top: "-50vh",
            ...(isMove && { opacity: 1, top: 0 }),
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBack sx={{ fontSize: "4rem", color: "primary.light" }} />
        </IconButton>
        <IconButton
          color="primary"
          sx={{
            position: "absolute",
            zIndex: 2999,
            right: 0,
            transition: "all .4s ease",
            opacity: 0,
            top: "-50vh",
            ...(isMove && { opacity: 1, top: 0 }),
          }}
          onClick={isFull ? exitFull : goFull}
        >
          {isFull ? (
            <FullscreenExit sx={{ fontSize: "4rem", color: "primary.light" }} />
          ) : (
            <Fullscreen sx={{ fontSize: "4rem", color: "primary.light" }} />
          )}
        </IconButton>
        <iframe
          frameBorder="0"
          id="iframe"
          title="frame"
          style={{
            pointerEvents: "none",
            ...(isMove && { pointerEvents: "all" }),
          }}
          src={
            se && ep
              ? `https://vidsrc.me/embed/${id}/${se}-${ep}`
              : `https://vidsrc.me/embed/${id}`
          }
          width="100%"
          height="100%"
        ></iframe>
      </Container>
    </Modal>
  );
}
