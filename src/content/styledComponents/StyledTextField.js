import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "clamp(200px, 60vw,600px)",
  backgroundColor: "#fff",
  // padding: "4px",
  transition: "all .2s ease",
  "& label": {
    fontFamily: "NRegular",
    left: 8,
    transition: "all .2s ease",
  },
  "& label.Mui-focused ": {
    fontFamily: "NBOLD",
    color: "rgba(0,0,0,.7)",
    top: 8,
  },
  "& label.MuiInputLabel-animated ": {
    top: 8,
  },
  "& .MuiInput-underline:after": {
    border: "none",
  },
  "& .MuiInput-underline:before": {
    border: "none !important",
  },
  "& .MuiInputBase-root": {
    border: "none",
    padding: "8px",
    "& fieldset": {
      border: "none",
    },
  },
}));
