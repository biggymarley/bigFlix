import {
  ArrowBack,
  Bookmark,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";
import { Container } from "@mui/system";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { StatusContext } from "../../context/context";
import OnPlayerInfo from "./OnPlayerInfo";
export default function VideoPlayer() {
  const [isFull, setisFull] = useState(false);
  const [isMove, setisMove] = useState(false);
  const [epSe, setEpSe] = useState({ ep: 1, se: 1 });
  let { id, ep, se } = useParams();
  const { pathname } = useLocation();
  const { dispatch } = useContext(StatusContext);
  const [cookies, setCookies] = useCookies(["watch-later"]);
  useEffect(() => {
    setEpSe({ ep, se });
  }, [ep, se]);

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
        // setisFull(true);
      });
  };

  function exitHandler() {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setisFull(false);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      goFull();
    }, 200);
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", exitHandler, false);
    document.addEventListener("mozfullscreenchange", exitHandler, false);
    document.addEventListener("MSFullscreenChange", exitHandler, false);
    document.addEventListener("webkitfullscreenchange", exitHandler, false);

    return () => {
      document.removeEventListener("fullscreenchange", exitHandler, false);
      document.removeEventListener("mozfullscreenchange", exitHandler, false);
      document.removeEventListener("MSFullscreenChange", exitHandler, false);
      document.removeEventListener(
        "webkitfullscreenchange",
        exitHandler,
        false
      );
    };
  }, []);

  const myListener = function () {
    setisMove(false);
  };
  const mouseMoveEffect = useCallback((timeout) => {
    clearTimeout(timeout);
    timeout = setTimeout(myListener, 6000);
    setisMove(true);
  }, []);

  useEffect(() => {
    let timeout;
    document.addEventListener("mousemove", () => {
      clearTimeout(timeout);
      timeout = setTimeout(myListener, 6000);
      setisMove(true);
    });
    return () =>
      document.removeEventListener("mousemove", () => {
        clearTimeout(timeout);
        timeout = setTimeout(myListener, 6000);
        setisMove(true);
      });
  }, [mouseMoveEffect]);

  const HandleSave = () => {
    exitFull();
    dispatch({
      type: "showDialog",
      payload: {
        title: "Watch Later ?",
        message: "You can save this Movie to watch it later",
        // field: false, // text field
        callback: () => checkCokkies(),
        type: "positive", // positive | negative
        buttonLabel: "OK",
      },
    });
  };

  const checkCokkies = () => {
    if (cookies["watch-later"]?.filter((c) => c.id === id).length > 0) return;
    else {
      if (ep && se)
        setCookies(
          "watch-later",
          [...(cookies["watch-later"] ?? []), { id, ep, se, type: "serie" }],
          { path: "/" }
        );
      else
        setCookies(
          "watch-later",
          [...(cookies["watch-later"] ?? []), { id, type: "movie" }],
          { path: "/" }
        );
    }
  };

  return (
    <Modal open={true} keepMounted>
      <Container
        ref={ref}
        disableGutters
        maxWidth="xl"
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "black.main",
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bgcolor:"black.main",
            // mixBlendMode: "color",
            width: "100%",
            height: "51px",
            transition: "all .4s ease",
            left: "50%",
            opacity: 1,
            transform: "translate(-50%, 0%)",
            // backdropFilter: "blur(1000px)",
            ...(isMove && { top: "-50vh" }),
          }}
        />
        {ep && se ? (
          <OnPlayerInfo setEpSe={setEpSe} epSe={epSe} isMove={isMove} />
        ) : null}
        <SaveMovie isMove={isMove} HandleSave={HandleSave} />
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
          onClick={() => {
            HandleSave();
            navigate(pathname.slice(0, pathname.lastIndexOf("/watch")));
          }}
        >
          <ArrowBack sx={{ fontSize: "2.5rem", color: "primary.light" }} />
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
            <FullscreenExit
              sx={{ fontSize: "2.5rem", color: "primary.light" }}
            />
          ) : (
            <Fullscreen sx={{ fontSize: "2.5rem", color: "primary.light" }} />
          )}
        </IconButton>
        <iframe
          frameBorder="0"
          allowFullScreen={true}
          id="iframe"
          title="frame"
          style={{
            pointerEvents: "none",
            ...(isMove && { pointerEvents: "all" }),
          }}
          src={
            se && ep
              ? `${process.env.REACT_APP_MOVIES_URL_BASE}${id}/${epSe.se}-${epSe.ep}`
              : `${process.env.REACT_APP_MOVIES_URL_BASE}${id}`
          }
          width="100%"
          height="100%"
        ></iframe>
      </Container>
    </Modal>
  );
}

const SaveMovie = ({ isMove, HandleSave }) => {
  return (
    <IconButton
      onClick={HandleSave}
      sx={{
        position: "absolute",
        zIndex: 1999,
        transition: "all .4s ease",
        opacity: 0,
        top: "-50vh",
        right: 0,
        color: "primary.main",
        ...(isMove && { opacity: 1, top: "3rem" }),
      }}
    >
      <Bookmark sx={{ fontSize: "2.5rem", color: "primary.light" }} />
    </IconButton>
  );
};
