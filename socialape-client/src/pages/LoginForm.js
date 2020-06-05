/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import useLoginForm from "../hooks/LoginHooks";
import { login } from "../hooks/Apihooks";

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px, auto 20px auto",
  },
  pageTitle: {
    margin: "10px, auto 10px auto",
  },
  textField: {
    margin: "10px, auto 10px auto",
  },
  button: {
    marginTop: 20,
  },
}));

const LoginForm = ({ history }) => {
  const classes = useStyles();
  const doLogin = async () => {
    try {
      const userData = await login(inputs);

      if (userData.token !== undefined) {
        localStorage.setItem("FBIdToken", `Bearer ${userData.token}`);
        history.push("/");
      }
    } catch (e) {
      console.error(e);
      console.log(e.message);
    }
  };

  const { inputs, handlesubmit, handleInputChange } = useLoginForm(doLogin);

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <img src={AppIcon} alt="app icon" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handlesubmit}>
          <TextField
            fullWidth
            onChange={handleInputChange}
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={inputs.email}
          />
          <TextField
            fullWidth
            className={classes.textField}
            onChange={handleInputChange}
            id="password"
            type="password"
            name="password"
            label="Password"
            value={inputs.password}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
          <br />
          <small>
            dont have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};
LoginForm.propTypes = {
  history: PropTypes.object,
};

export default LoginForm;
