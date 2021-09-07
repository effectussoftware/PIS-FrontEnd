import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

Login.propTypes = {
  onSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
};

export default function Login({ onSubmit, onInputChange, email, password }) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Iniciar sesión
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          type="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => onInputChange(e)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => onInputChange(e)}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>

        <Box mt={5}></Box>
      </form>
    </div>
  );
}