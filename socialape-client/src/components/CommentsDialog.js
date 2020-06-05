/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import jwtDecode from "jwt-decode";

//MUI STUFF
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import ChatIcon from "@material-ui/icons/Chat";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  commentImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
    margin: "1em",
  },
  commentData: {
    marginLeft: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconsConatainer: {
    display: "flex",
    margin: "0.5em",
  },
}));

const CommentsDialog = ({ file }) => {
  const classes = useStyles();

  dayjs.extend(relativeTime);

  let authorized = false;
  let token = localStorage.getItem("FBIdToken");
  if (token != null) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 > Date.now()) {
      authorized = true;
    } else {
      authorized = false;
    }
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.iconsConatainer}>
        <Tooltip title="comments">
          <ChatIcon color="primary" onClick={handleClickOpen} />
        </Tooltip>
        {file.commentCount}
      </div>
      <>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <Grid container spacing={10} className={classes.container}>
            <Grid item sm={5}>
              <img
                alt=" user image "
                className={classes.commentImage}
                src={file.userImage}
              ></img>
            </Grid>
            <Grid item sm={5}>
              <Typography
                variant="h5"
                component={Link}
                to={`/users/${file.userHandle}`}
                color="primary"
              >
                @{file.userHandle}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {dayjs(file.created).format("h:mm a, MMMM DD YYYY")}
              </Typography>
              <Typography variant="body1">{file.body}</Typography>
            </Grid>
          </Grid>
          {authorized ? <CommentForm fileid={file.screamId} /> : null}
          <DialogContent>
            <Comment file={file} />
          </DialogContent>
        </Dialog>
      </>
    </>
  );
};

export default CommentsDialog;
