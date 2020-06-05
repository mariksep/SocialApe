import React from "react";

import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
}));

const StaticProfile = ({ user }) => {
  const classes = useStyles();

  console.log(user);
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div>
          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt="profile"
              className={classes.profileImage}
            />
          )}
        </div>
        <div className={classes.details}>
          <MuiLink
            component={Link}
            to={`/users/${user.handle}`}
            color="primary"
            variant="h5"
          >
            @{user.handle}
          </MuiLink>
          <hr />
          {user.bio && (
            <>
              <Typography variant="body2">{user.bio}</Typography>
              <hr />
            </>
          )}
          {user.location && (
            <>
              <LocationOn color="primary" />
              <span>{user.location}</span>
              <hr />
            </>
          )}
          {user.website && (
            <>
              <LinkIcon color="primary" />
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(user.createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
};

export default StaticProfile;
