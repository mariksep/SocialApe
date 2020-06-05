/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { MediaContext } from "../contexts/MediaContext";
import Profile from "../components/Profile";
import { useAllScreams, checkToken } from "../hooks/Apihooks";
import Scream from "../components/Scream";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import ScreamSkeleton from "../components/Skeletons/ScreamSkeleton";
import ProfileSkeleton from "../components/Skeletons/ProfileSkeleton";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "none",
  },
  buttonGroup: {
    width: "100%",
    padding: "2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const Home = () => {
  const classes = useStyles();

  const [user, setUser] = useContext(MediaContext);
  useEffect(() => {
    const checkUser = async () => {
      const userData = await checkToken(localStorage.getItem("FBIdToken"));
      setUser(userData);
    };
    checkUser();
  }, [setUser]);

  let picArray = useAllScreams();
  let authorized = false;
  let token = localStorage.getItem("FBIdToken");
  if (token != null && user !== null) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 > Date.now()) {
      authorized = true;
    } else {
      authorized = false;
    }
  }

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {picArray.length > 0 ? (
          picArray.map((file) => (
            <Scream key={file.screamId} file={file} user={user} />
          ))
        ) : (
          <ScreamSkeleton></ScreamSkeleton>
        )}
      </Grid>

      <Grid item sm={4} xs={12}>
        {authorized === true ? (
          <>
            {user !== null ? <Profile /> : <ProfileSkeleton></ProfileSkeleton>}
          </>
        ) : (
          <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
              No profile found, please login again
            </Typography>
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
