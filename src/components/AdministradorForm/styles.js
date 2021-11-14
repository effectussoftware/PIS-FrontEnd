import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    color: "#ffffff",
    background: "#1c1c1c",
    margin: theme.spacing(3, 0, 2),
    '&:hover': {
      backgroundColor: '#404040',
      color: '#fff',
    }
  },
  errorMsg: { color: "red" },
}));
