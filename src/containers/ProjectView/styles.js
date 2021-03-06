import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    border: "2px solid #000",
    boxShadow: 24,
    outline: "none",
    maxHeight: "85vh",
    overflow: "auto",
    p: 4,
  },
  datePrimaryHeader: {
    fontSize: "16px !important",
    fontWeight: 700,
  },
  modalInfo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    maxWidth: "830px",
    background: "white",
    boxShadow: 24,
    borderRadius: "16px !important",
    overflowX: "hidden",
    outline: "0px !important",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  box: {
    display: "flex",
    padding: 8,
  },
}));
