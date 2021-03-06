import React from "react";
import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import { useStyles } from "./styles";
import { rawDateToDateFormat } from "../../utils/utils";

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function Comment({ comment, user, id, date, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.noteContainer}>
      <div className={classes.note}>
        <p className={classes.user}>{user}</p>
        <Paper elevation={3} className={classes.comment}>
          {comment}
        </Paper>
        <p className={classes.date}>{rawDateToDateFormat(date)}</p>
      </div>
      <IconButton onClick={onClick} aria-label="Borrar" size="small">
        <CloseIcon className={classes.delete} />
      </IconButton>
    </div>
  );
}
