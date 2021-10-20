import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 800,
    background: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  modalInfo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 1000,
    // maxHeight: 600,
    height: "65%",
    width: "30%",
    background: "white",
    border: "2px solid #000",
    boxShadow: 24,
    // p: 4,
    overflow: "scroll",
    overflowX: "hidden",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
