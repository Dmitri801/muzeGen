import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Brush from "@material-ui/icons/Brush";
function LeftControl({
  canvasState,
  onGradientOneChange,
  onGradientTwoChange,
  onBackgroundModeChange
}) {
  return (
    <div className="left_control">
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography classes={{ root: "controlContainer" }} variant="h6">
            BACKGROUND <Brush classes={{ root: "brushSVG" }} />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: "backgroundContainer" }}>
          <Typography variant="h6" align="center">
            Gradients
          </Typography>
          <div className="colorPicker">
            <input
              type="color"
              id="colorSelectorOne"
              value={canvasState.backgroundColor.gradientOne}
              onChange={e => onGradientOneChange(e.target.value)}
            />
            <input
              type="color"
              id="colorSelectorTwo"
              value={canvasState.backgroundColor.gradientTwo}
              onChange={e => onGradientTwoChange(e.target.value)}
            />
          </div>
          <Typography variant="h6" align="center">
            Mode
          </Typography>
          <FormControl>
            <Select
              value={canvasState.backgroundColor.mode.name}
              onChange={e => onBackgroundModeChange(e.target.value)}
              name="mode"
            >
              <MenuItem value="Mode One">Mode One</MenuItem>
              <MenuItem value="Mode Two">Mode Two</MenuItem>
              <MenuItem value="Mode Three">Mode Three</MenuItem>
              <MenuItem value="Mode Four">Mode Four</MenuItem>
            </Select>
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default LeftControl;
