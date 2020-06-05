import React, { useState } from "react";
import usePostScreamFrom from "../hooks/PostScreamHooks";
import { postScream } from "../hooks/Apihooks";
//MUI stuff
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

//ICONS
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  plus: {
    color: "white",
  },
  textField: {
    margin: "20px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const PostScream = () => {
  const classes = useStyles();
  let [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const doPost = async () => {
    const token = localStorage.getItem("FBIdToken");
    try {
      await postScream(inputs, token);
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };

  const {
    inputs,
    setInputs,
    handlesubmit,
    handleInputChange,
  } = usePostScreamFrom(doPost);

  return (
    <>
      <>
        <Tooltip title="Post a scream">
          <AddIcon className={classes.plus} onClick={handleClickOpen} />
        </Tooltip>
      </>
      <>
        <Dialog fullWidth open={open} onClose={handleClose} maxWidth="sm">
          <DialogTitle>Post a scream</DialogTitle>
          <form onSubmit={handlesubmit}>
            <div className={classes.textContainer}>
              <TextField
                onChange={handleInputChange}
                rows="3"
                multiline
                className={classes.textField}
                name="body"
                type="text"
                placeholder="Scream at your fellow apes"
              />
              <Button type="submit">post</Button>
            </div>
          </form>
        </Dialog>
      </>
    </>
  );
};

export default PostScream;
