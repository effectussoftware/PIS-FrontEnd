import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

Login.propTypes = {
  onSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
};

export default function Login({
  onSubmit,
  onInputChange,
  email,
  password,
  error,
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper} data-testid="login">
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
        <Button
          role="submit"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign in
        </Button>

        <Typography className={classes.errorMsg} component="h2">
          {error}
        </Typography>

        <Box mt={5}></Box>
      </form>
    </div>
  );
}
