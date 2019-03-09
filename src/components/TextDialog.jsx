import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import React from "react";

function TextDialog({
  modalOpen,
  closeDialog,
  fonts,
  fontFamilyVal,
  fontColor,
  songTitleVal,
  artistVal,
  onTextValuesChanged,
  onAddTextBtnClick,
  loading,
  threeDChecked,
  handle3DCheck,
  onFontFamilySelectChange
}) {
  return (
    <Dialog
      PaperProps={{ classes: { root: "textDialog" } }}
      fullWidth
      onClose={closeDialog}
      open={modalOpen}
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
            onChange={e =>
              onFontFamilySelectChange(e.target.name, e.target.value)
            }
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
        onKeyPress={e => (e.key === "Enter" ? onAddTextBtnClick() : null)}
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
        onKeyPress={e => (e.key === "Enter" ? onAddTextBtnClick() : null)}
      />
      <div className="saveBtnContainer">
        <span className="switchContainer">
          <span>3D</span>
          <Switch
            value="3D"
            color="primary"
            checked={threeDChecked}
            onChange={handle3DCheck}
          />
        </span>
        <Button
          variant="contained"
          color="primary"
          size="large"
          classes={{ root: "saveBtn" }}
          onClick={() => onAddTextBtnClick()}
          disabled={loading}
        >
          <SaveIcon />
          Save
        </Button>
        {loading && (
          <CircularProgress size={50} classes={{ root: "saveBtnLoader" }} />
        )}
      </div>
      <Paper classes={{ root: "fontSampler" }} elevation={0}>
        <Typography
          style={{ fontFamily: fontFamilyVal }}
          align="center"
          id="fontFamSample"
          variant="h6"
        >
          {fontFamilyVal}
        </Typography>
      </Paper>
    </Dialog>
  );
}

export default TextDialog;
