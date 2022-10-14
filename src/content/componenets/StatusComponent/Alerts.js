import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function Alerts(props) {
  return (
    <>
      <Snackbar
        open={props.payload.open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionDown}
        onClose={props.handleClose}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.payload.type}
          sx={{ width: "100%" }}
        >
          {props.payload.message ?? "Alert Message"}
        </Alert>
      </Snackbar>
    </>
  );
}
