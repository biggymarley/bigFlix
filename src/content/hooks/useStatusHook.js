import { useReducer } from "react";
const defaultStatusData = {
  loading: false,
  snackbar: {
    open: false,
    message: "a message",
    type: "success", // success | error
  },
  confirmationDialog: {
    open: false,
    title: "a title",
    message: "a message",
    field: false, // text field
    callback: () => {},
    type: "positive", // positive | negative
    buttonLabel: "valider",
  },
};

export default function useStatusHook() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "showLoading":
        return { ...state, loading: action.payload };
      case "showSuccess":
        return {
          ...state,
          snackbar: { open: true, type: "success", message: action.payload },
        };
      case "showError":
        return {
          ...state,
          snackbar: { open: true, type: "error", message: action.payload },
        };
      case "hideSnackbar":
        return { ...state, snackbar: { ...state.snackbar, open: false } };
      case "showDialog":
        return {
          ...state,
          confirmationDialog: { ...action.payload, open: true },
        };
      case "closeDialog":
        return {
          ...state,
          confirmationDialog: { ...state.confirmationDialog, open: false },
        };
      default:
        throw new Error();
    }
  };
  const [uiState, dispatch] = useReducer(reducer, defaultStatusData);

  return [uiState, dispatch];
}
