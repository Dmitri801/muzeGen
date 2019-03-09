import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import InsertPhoto from "@material-ui/icons/AddPhotoAlternate";
import ColorLens from "@material-ui/icons/ColorLens";
import Dropzone from "./DropZone";

function LeftControl({
  canvasState,
  onGradientOneChange,
  onGradientTwoChange,
  onBackgroundModeChange,
  onImgSizeChange,
  addImageUrl,
  onEffectChange
}) {
  return (
    <div className="left_control">
      <ExpansionPanel classes={{ root: "expansionContainer" }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography classes={{ root: "controlContainer" }} variant="h6">
            BACKGROUND <ColorLens classes={{ root: "brushSVG" }} />
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
      <ExpansionPanel classes={{ root: "expansionContainer" }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography classes={{ root: "controlContainer" }} variant="h6">
            LOGO <InsertPhoto classes={{ root: "brushSVG" }} />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: "backgroundContainer" }}>
          <Typography variant="h6" align="center">
            Size
          </Typography>
          <div className="sizeRadioContainer">
            <div className="radio">
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "#999"
                }}
              >
                Large
              </span>
              <Radio
                color="primary"
                value="large"
                checked={canvasState.image.size.name === "large"}
                onChange={e => onImgSizeChange(e.target.value)}
              />
            </div>
            <div className="radio">
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "#999"
                }}
              >
                Medium
              </span>
              <Radio
                color="primary"
                value="medium"
                checked={canvasState.image.size.name === "medium"}
                onChange={e => onImgSizeChange(e.target.value)}
              />
            </div>
            <div className="radio">
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "#999"
                }}
              >
                Small
              </span>
              <Radio
                color="primary"
                value="small"
                checked={canvasState.image.size.name === "small"}
                onChange={e => onImgSizeChange(e.target.value)}
              />
            </div>
          </div>
          <Typography variant="h6" align="center">
            Effect
          </Typography>
          <FormControl style={{ marginBottom: "10px" }}>
            <Select
              value={canvasState.image.effect}
              onChange={e => onEffectChange(e.target.value)}
              name="effect"
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="neon">Neon</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
              <MenuItem value="sinCity">Sin City</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" align="center">
            Upload
          </Typography>
          <Dropzone
            imgArgs={canvasState.image.size.args}
            addImageUrl={addImageUrl}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default LeftControl;
