import React, { useState } from "react";
import { deleteScream } from "../hooks/Apihooks";

import Tooltip from "@material-ui/core/Tooltip";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

import DeleteOutline from "@material-ui/icons/DeleteOutline";

const DeleteScream = ({ screamId }) => {
  let [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    const token = localStorage.getItem("FBIdToken");
    await deleteScream(screamId, token);
    window.location.reload();
  };
  return (
    <>
      <div>
        <Button>
          <DeleteOutline color="primary" onClick={handleClickOpen} />
        </Button>
      </div>
      <Dialog open={open}>
        <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteScream;
