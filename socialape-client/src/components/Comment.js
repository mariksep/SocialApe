import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getComments } from "../hooks/Apihooks";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const useStyles = makeStyles((theme) => ({
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
    margin: "0.5em",
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
}));

const Comment = ({ file }) => {
  dayjs.extend(relativeTime);
  const classes = useStyles();

  const [comment, setComments] = useState();
  let data;

  useEffect(() => {
    async function fetchData() {
      if (file !== null) {
        data = await getComments(file.screamId);
        setComments(data);
      }
    }
    fetchData();
  }, [comment]);

  return (
    <>
      {comment !== undefined && file !== null && (
        <>
          {comment.comments.map((comment, index) => (
            <Grid className={classes.container} key={comment.created}>
              <Grid item sm={2}>
                <img
                  className={classes.commentImage}
                  src={comment.userImage}
                  alt="comment"
                ></img>
              </Grid>
              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${comment.userHandle}`}
                    color="primary"
                  >
                    {comment.userHandle}
                  </Typography>
                  <Typography variant="body1" key={index}>
                    {comment.body}
                  </Typography>
                  <Typography varaiant="body2" color="textSecondary">
                    {dayjs(comment.created).format("h:mm a, MMMM DD YYYY")}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </>
  );
};

export default Comment;
