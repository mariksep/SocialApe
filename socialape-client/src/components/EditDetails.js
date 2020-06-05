import React, { useState, useEffect, useContext } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { MediaContext } from "../contexts/MediaContext";
import { checkToken, updateProfile } from "../hooks/Apihooks";
import useProfileFrom from "../hooks/ProfileHooks";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    margin: "10px, auto 10px auto",
  },
  button: {
    margin: "10px",
  },
}));

const EditDetails = () => {
  const classes = useStyles();
  let [open, setOpen] = useState(false);
  const [user, setUser] = useContext(MediaContext);

  const doEdit = async () => {
    try {
      await updateProfile(inputs, localStorage.getItem("FBIdToken"));
      const userData = checkToken(localStorage.getItem("FBIdToken"));
      await setUser(userData);
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };

  const { handlesubmit, handleInputChange, inputs, setInputs } = useProfileFrom(
    doEdit
  );

  useEffect(() => {
    const checkUser = async () => {
      const userData = await checkToken(localStorage.getItem("FBIdToken"));
      setInputs(userData.userInfo);
    };
    checkUser();
  }, [setInputs, user]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <Tooltip title="Edit profile info">
          <EditIcon color="primary" onClick={handleClickOpen} />
        </Tooltip>
      </>
      <>
        <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
          <DialogTitle>Edit your details</DialogTitle>
          <form noValidate onSubmit={handlesubmit}>
            <div className={classes.textContainer}>
              <TextField
                onChange={handleInputChange}
                className={classes.textField}
                name="bio"
                type="text"
                placeholder="bio"
                value={inputs.bio}
              />
              <TextField
                onChange={handleInputChange}
                type="text"
                name="location"
                placeholder="location"
                className={classes.textField}
                value={inputs.location}
              />

              <TextField
                onChange={handleInputChange}
                type="text"
                name="website"
                placeholder=" Website"
                className={classes.textField}
                value={inputs.website}
              />

              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                save
              </Button>
            </div>
          </form>
        </Dialog>
      </>
    </>
  );
};

EditDetails.propTypes = {};

export default EditDetails;
