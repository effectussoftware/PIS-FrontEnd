import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  content: {
    margin: 0,
    padding: theme.spacing(2),
  },
  actions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    bottom: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  jC_sb: {
    justifyContent: "space-between",
  },
  working_hours_type_width: {
    with: theme.spacing(1),
  },
  textClass: {
    wordWrap: "break-word",
  },
}));
