import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Star from "@material-ui/icons/Star";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarRatingComponent from "react-star-rating-component";
import TextField from "@material-ui/core/TextField";
function Feedback() {
  return (
    <Dialog
      open={true}
      TransitionComponent={Slide}
      keepMounted
      onClose={() => console.log("Close")}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {"Thanks! Your download will start shortly..."}
      </DialogTitle>
      <Typography variant="h4" align="center">
        What did you think?
      </Typography>
      <DialogContent classes={{ root: "starContainer" }}>
        <StarRatingComponent
          name="feedbackRating"
          renderStarIcon={() => <Star classes={{ root: "starIcon" }} />}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Leave A Comment"
          multiline
          rowsMax="4"
          //   value={this.state.multiline}
          onChange={() => console.log("Changed")}
          fullWidth
          margin="normal"
        />
      </DialogContent>

      <div className="feedbackSubmitContainer">
        <Button
          variant="contained"
          onClick={() => console.log("Submit")}
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </div>
    </Dialog>
  );
}

export default Feedback;
