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
import { makeStyles } from "@material-ui/core/styles";

import useSignUpForm from "../hooks/SignUpHooks";
import { signup } from "../hooks/Apihooks";

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

const SignUpForm = ({ history }) => {
  const classes = useStyles();
  const doSignUp = async () => {
    try {
      const userData = await signup(inputs);
      console.log(userData);
      if (userData.token !== undefined) {
        console.log("tokeni löytyy");
        localStorage.setItem("FBIdToken", `Bearer ${userData.token}`);
        history.push("/");
      }
    } catch (e) {
      console.error(e);
      console.log(e.message);
    }
  };

  const { inputs, handlesubmit, handleInputChange } = useSignUpForm(doSignUp);

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <img src={AppIcon} alt="app icon" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
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
          <TextField
            fullWidth
            className={classes.textField}
            onChange={handleInputChange}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            label="Confirm your password"
            value={inputs.confirmPassword}
          />
          <TextField
            fullWidth
            className={classes.textField}
            onChange={handleInputChange}
            id="handle"
            type="text"
            name="handle"
            label=" Your username"
            value={inputs.handle}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Signup
          </Button>
          <br />
          <small>
            Already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};
SignUpForm.propTypes = {
  history: PropTypes.object,
};

export default SignUpForm;
