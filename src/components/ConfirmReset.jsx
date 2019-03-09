import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import React from "react";

function ConfirmReset({ open, handleClose, resetCanvas }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to reset your cover?
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button
          onClick={() => {
            resetCanvas();
            handleClose();
          }}
          color="secondary"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmReset;
