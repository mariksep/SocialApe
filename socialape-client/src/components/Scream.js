import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteScream from "./DeleteScream";
import CommentsDialog from "./CommentsDialog";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

//ICONS
import LikeButton from "./LikeButton";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    OObjectFit: "cover",
  },
}));

const Scream = ({ file, user }) => {
  dayjs.extend(relativeTime);
  const classes = useStyles();

  let authorized = false;
  let token = localStorage.getItem("FBIdToken");
  if (token != null) {
    authorized = true;
  }

  let deleteButton = null;
  if (
    user !== null &&
    user.userInfo !== undefined &&
    file !== null &&
    file !== undefined
  ) {
    if (authorized && file.userHandle === user.userInfo.handle) {
      deleteButton = <DeleteScream screamId={file.screamId} />;
    }
  }
  return (
    <Card className={classes.card}>
      <CardMedia
        title="Profile image"
        image={file.userImage}
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${file.userHandle}`}
          color="primary"
        >
          {file.userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(file.created).fromNow()}
        </Typography>
        <Typography variant="body1">{file.body}</Typography>
        <Grid container>
          <LikeButton file={file} />
          <CommentsDialog file={file} />
          {deleteButton}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Scream;
