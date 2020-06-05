import React, { PropTypes } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { postComment } from "../hooks/Apihooks";
import usePostCommentFrom from "../hooks/PostCommentHooks";

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
    margin: "1em",
  },
}));

const CommentForm = ({ fileid }) => {
  const classes = useStyles();

  const doPost = async () => {
    const token = localStorage.getItem("FBIdToken");
    try {
      await postComment(fileid, token, inputs);
    } catch (e) {
      console.log(e.message);
    }
  };
  const reset = () => {
    const input = document.getElementById("comment");
    input.value = "";
  };
  const {
    inputs,
    setInputs,
    handlesubmit,
    handleInputChange,
  } = usePostCommentFrom(doPost);

  return (
    <Grid item sm={12} className={classes.form}>
      <form onSubmit={handlesubmit}>
        <TextField
          id="comment"
          name="body"
          type="text"
          value={inputs.body}
          label="Comment on scream"
          onChange={handleInputChange}
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={reset}
        >
          Send
        </Button>
      </form>
    </Grid>
  );
};

CommentForm.propTypes = {};

export default CommentForm;
