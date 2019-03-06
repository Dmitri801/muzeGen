import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";

function TextDialog({
  open,
  closeDialog,
  fonts,
  fontFamilyVal,
  fontColor,
  songTitleVal,
  artistVal,
  onTextValuesChanged
}) {
  return (
    <Dialog
      PaperProps={{ classes: { root: "textDialog" } }}
      fullWidth
      onClose={closeDialog}
      open={open}
    >
      <DialogTitle classes={{ root: "dialogTitle" }}>Add/Edit Text</DialogTitle>
      <div className="font-color_controls">
        <div className="color">
          <h3>Color</h3>
          <input
            name="fontColor"
            type="color"
            value={fontColor}
            onChange={e => onTextValuesChanged(e.target.name, e.target.value)}
          />
        </div>
        <FormControl classes={{ root: "fontFamily-select" }}>
          <InputLabel htmlFor="fontFamily">Font Family</InputLabel>
          <Select
            name="fontFamily"
            value={fontFamilyVal}
            onChange={e => onTextValuesChanged(e.target.name, e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {fonts.length > 0 &&
              fonts.map(font => {
                return (
                  <MenuItem key={font.family} value={font.family}>
                    {font.family}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>

      <TextField
        name="songTitleVal"
        label="Song Title"
        placeholder="Song Title"
        margin="normal"
        classes={{ root: "textInput" }}
        value={songTitleVal}
        variant="outlined"
        onChange={e => onTextValuesChanged(e.target.name, e.target.value)}
      />
      <TextField
        name="artistVal"
        label="Artist"
        placeholder="Artist"
        margin="normal"
        classes={{ root: "textInput" }}
        variant="outlined"
        value={artistVal}
        onChange={e => onTextValuesChanged(e.target.name, e.target.value)}
      />

      <Button
        variant="raised"
        color="primary"
        size="large"
        classes={{ root: "saveBtn" }}
      >
        <SaveIcon />
        Save
      </Button>
    </Dialog>
  );
}

export default TextDialog;
