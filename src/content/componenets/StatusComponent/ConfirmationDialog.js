import { useTheme } from "@emotion/react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Button, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
export const ConfirmationDialog = (props) => {
  const theme = useTheme();
  const [text, setText] = useState(null);
  const canSubmit = useMemo(() => {
    return !props.payload.field?.required || text?.length > 0;
  }, [text, props.payload.field]);

  const color =
    props.payload.type === "negative"
      ? theme.palette.error.main
      : theme.palette.primary.main;

  useEffect(() => {
    setText(null);
  }, [props.open]);

  const handleSubmit = () => {
    const enteredText = text;
    props.handleClose();
    props.payload.callback(enteredText);
  };
  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" sx={{ paddingTop: 0 }}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={classes.title}>{props.payload.title}</Typography>
          </Box>
          <Box sx={{ ...classes.validbox, backgroundColor: color }}>
            {props.payload.icon ??
              (props.payload.type === "negative" ? (
                <HighlightOffRoundedIcon
                  style={{ fontSize: "2rem", color: "white" }}
                />
              ) : (
                <CheckCircleOutlineRoundedIcon
                  style={{ fontSize: "2rem", color: "white" }}
                />
              ))}
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography sx={classes.body}>{props.payload.message}</Typography>
        </DialogContentText>
        {!!props.payload.field && (
          <TextField
            multiline
            autoFocus
            margin="dense"
            id="text"
            label={props.payload.field.label}
            value={text}
            onChange={(e) => setText(e.target.value)}
            error={!canSubmit}
            fullWidth
            variant="standard"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Box
          sx={{ display: "flex", alignContent: "flex-end" }}
          marginLeft={0}
          padding={1}
        >
          <Button
            variant="contained"
            style={{
              height: "48px",
              width: "130px",
              borderRadius: "4px",
              backgroundColor: "#F1F3F8",
              color: "#9EA4B3",
              marginRight: "12px",
            }}
            onClick={() => props.handleClose()}
            fullWidth
          >
            Annuler
          </Button>
          <Button
            autoFocus
            fullWidth
            disabled={!canSubmit}
            variant="contained"
            color={props.payload.type === "negative" ? "error" : "primary"}
            style={{ height: " 48px", width: "150px" }}
            onClick={handleSubmit}
          >
            {props.payload.buttonLabel ?? "Valider"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

const classes = {
  title: {
    color: "secondary.main",
    fontFamily: "NBOLD",
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "0",
    lineHeight: "24px",
    textAlign: "left",
    alignItems: "center",
  },
  validbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "61px",
    width: "49.91px",
    borderRadius: "0 0 4px 4px",
  },
  body: {
    color: "secondary.light",
    fontFamily: "NRegular",
    fontSize: "16px",
    letterSpacing: "0",
    lineHeight: "19px",
    textAlign: "left",
  },
};
