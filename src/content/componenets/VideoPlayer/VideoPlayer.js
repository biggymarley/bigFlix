import { ArrowBack, Fullscreen, FullscreenExit } from "@mui/icons-material";
import { Backdrop, Box, IconButton, Modal } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VideoPlayer() {
  const [isFull, setisFull] = useState(false);
  const [isMove, setisMove] = useState(false);
  let { id, ep, se } = useParams();
  const navigate = useNavigate();
  const ref = useRef({ current: null });
  const mouseCheck = useRef();

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
    setisMove(true);
  };

  useEffect(() => {
    let timeout;
    if (mouseCheck.current)
      mouseCheck.current.onmousemove = function () {
        clearTimeout(timeout);
        timeout = setTimeout(myListener, 2000);
        setisMove(false);
      };
  }, [mouseCheck.current]);

  return (
    <Box ref={ref}>
      <Modal open={true} keepMounted>
        <Container
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
            ref={mouseCheck}
            sx={{
              position: "absolute",
              top: "0",
              bottom: "70%",
              left: 0,
              right: 0,
              zIndex: 1999,
              bgcolor: "transparent",
            }}
          />
          <IconButton
            color="primary"
            sx={{
              position: "absolute",
              zIndex: 1999,
              transition: "all .4s ease",
              opacity: 1,
              ...(isMove && { opacity: 0 }),
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
              opacity: 1,
              ...(isMove && { opacity: 0 }),
            }}
            onClick={isFull ? exitFull : goFull}
          >
            {isFull ? (
              <FullscreenExit
                sx={{ fontSize: "4rem", color: "primary.light" }}
              />
            ) : (
              <Fullscreen sx={{ fontSize: "4rem", color: "primary.light" }} />
            )}
          </IconButton>
          <iframe
            frameborder="0"
            id="iframe"
            //   allowfullscreen="true"
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
    </Box>
  );
}
