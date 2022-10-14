import React, { useContext } from "react";
import { StatusContext } from "../../context/context";
import Alerts from "./Alerts";
import { ConfirmationDialog } from "./ConfirmationDialog";
import Loading from "./Loading";

export default function StatusComponent() {
  const { uiState, dispatch } = useContext(StatusContext);
  const handleCloseAlert = (event) => {
    dispatch({ type: "hideSnackbar" });
  };
  const handleCloseDialog = (event) => {
    dispatch({ type: "closeDialog" });
  };
  return (
    <>
      <Alerts payload={uiState.snackbar} handleClose={handleCloseAlert} />
      <Loading loading={uiState.loading} />
      <ConfirmationDialog
        open={uiState.confirmationDialog.open}
        handleClose={handleCloseDialog}
        payload={uiState.confirmationDialog}
      />
    </>
  );
}
