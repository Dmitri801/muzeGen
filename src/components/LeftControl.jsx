import React, { useState } from "react";
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
import Slider from "@material-ui/lab/Slider";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import { useSpring, animated } from "react-spring";
import Dropzone from "./DropZone";
import Unsplash from "./Unsplash";
function LeftControl({
  canvasState,
  onGradientOneChange,
  onGradientTwoChange,
  onGradientThreeChange,
  onBackgroundModeChange,
  onImgSizeChange,
  addImageUrl,
  imagePositionChange,
  setLinearVal,
  unsplashAPI,
  unsplashQuery,
  unsplashResults,
  unsplashQueryChange,
  setUnsplashResults,
  setUnsplashPage,
  selectUnsplashImage,
  addImagePathUnsplash,
  onBackgroundImageSelect,
  setBackgroundImageOpacity,
  setBackgroundModeUnsplash,
  onClearImagesBtn
}) {
  const { mode } = canvasState.backgroundColor;
  const { size, imgPath } = canvasState.image;
  const { backgroundImage } = canvasState;

  const [expanded, setExpanded] = useState(null);
  const [unsplashOpen, setUnsplashOpen] = useState(false);

  const handleUnsplashClose = () => {
    setUnsplashOpen(false);
  };

  const handleExpansionChange = panel => {
    if (expanded !== panel) {
      setExpanded(panel);
    } else {
      setExpanded(null);
    }
  };
  let linear = false;
  let thirdColor = false;
  let positionDisabled = true;
  if (mode.name === "Mode Two") {
    linear = true;
  } else if (mode.name === "Mode Four") {
    linear = true;
    thirdColor = true;
  }

  if (imgPath !== "") {
    positionDisabled = false;
  }

  const positionSpringProps = useSpring({
    opacity: positionDisabled ? 0 : 1,
    position: positionDisabled ? `absolute` : `static`,
    transform: positionDisabled ? `translateX(-500px)` : `translateX(0)`
  });
  return (
    <div className="left_control">
      <ExpansionPanel
        expanded={expanded === "background"}
        onChange={() => handleExpansionChange("background")}
        classes={{ root: "expansionContainer" }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography classes={{ root: "controlContainer" }} variant="h6">
            BACKGROUND <ColorLens classes={{ root: "brushSVG" }} />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: "backgroundContainer" }}>
          <Typography variant="h5" align="center">
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
            {thirdColor && (
              <input
                type="color"
                id="colorSelectorTwo"
                value={canvasState.backgroundColor.gradientThree}
                onChange={e => onGradientThreeChange(e.target.value)}
              />
            )}
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
              <MenuItem value="Mode One">Radial One</MenuItem>
              <MenuItem value="Mode Two">Linear One</MenuItem>
              <MenuItem value="Mode Three">Radial Two</MenuItem>
              <MenuItem value="Mode Four">Linear Two</MenuItem>
            </Select>
          </FormControl>
          {linear && (
            <div className="sliderContainer">
              <h4>Rotate:</h4>
              <div className="slider-div">
                <Slider
                  classes={{ root: "slider" }}
                  min={0}
                  max={7}
                  step={1}
                  value={mode.sliderValue}
                  onChange={(e, value) => {
                    setLinearVal(e, value);
                  }}
                />
                <span>{mode.degrees} &#176;</span>
              </div>
            </div>
          )}
          <Typography style={{ marginTop: "35px" }} variant="h5" align="center">
            Layer Images
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
                None
              </span>
              <Radio
                color="primary"
                value="none"
                checked={backgroundImage.mode.name === "none"}
                onChange={e => onBackgroundImageSelect(e.target.value)}
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
                Cover
              </span>
              <Radio
                color="primary"
                value="cover"
                checked={backgroundImage.mode.name === "cover"}
                onChange={e => onBackgroundImageSelect(e.target.value)}
              />
            </div>
            {/* <div className="radio">
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "#999"
                }}
              >
                Pattern
              </span>
              <Radio
                color="primary"
                value="pattern"
                checked={backgroundImage.mode.name === "pattern"}
                onChange={e => onBackgroundImageSelect(e.target.value)}
              />
            </div> */}
          </div>

          <div className="opacitySlider">
            <h4>Opacity:</h4>
            <div className="slider-div">
              <Slider
                classes={{ root: "slider" }}
                min={0.25}
                max={backgroundImage.images.length < 1 ? 1 : 0.75}
                step={0.25}
                value={backgroundImage.opacity}
                onChange={(e, value) => {
                  setBackgroundImageOpacity(e, value);
                }}
              />
              <span>{backgroundImage.opacity}</span>
            </div>
          </div>

          <Button
            style={{ marginTop: "10px" }}
            onClick={() => {
              setBackgroundModeUnsplash(true);
              setUnsplashOpen(true);
            }}
            color="primary"
            variant="contained"
            disabled={backgroundImage.images.length === 3}
          >
            Search
          </Button>

          <div className="bgImageUpload">
            <Dropzone
              backgroundImage={backgroundImage}
              imgArgs={canvasState.image.size.args}
              addImageUrl={addImageUrl}
            />
          </div>
          {backgroundImage.images.length > 0 && (
            <React.Fragment>
              <div className="clearImagesCont">
                <Button
                  classes={{ root: "clearImgsBtn" }}
                  style={{ marginTop: "20px" }}
                  onClick={() => {
                    onClearImagesBtn();
                  }}
                  color="secondary"
                  variant="contained"
                >
                  Clear Images
                </Button>
                <span className="imgsNum">{backgroundImage.images.length}</span>
              </div>
              <span
                style={{ color: "#fff", marginTop: "5px", fontSize: "14px" }}
              >
                * Limit 3
              </span>
            </React.Fragment>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "logo"}
        onChange={() => handleExpansionChange("logo")}
        classes={{ root: "expansionContainer" }}
      >
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
                X-Large
              </span>
              <Radio
                color="primary"
                value="xlarge"
                checked={canvasState.image.size.name === "xlarge"}
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
          <animated.div style={positionSpringProps}>
            <Typography variant="h6" align="center">
              Position
            </Typography>
            <div className="positionContainer">
              <div className="position">
                <div className="label">
                  <span>Left</span>
                  <span>Right</span>
                </div>
                <Slider
                  classes={{ root: "xpositionSlider" }}
                  min={0}
                  max={20}
                  step={1}
                  value={size.args.sliderPositionX}
                  onChange={(e, value) => {
                    console.log(value);
                    imagePositionChange(e, "x", value);
                  }}
                  disabled={positionDisabled}
                />
              </div>
              <div className="position">
                <div className="label">
                  <span>Bottom</span>
                  <span>Top</span>
                </div>

                <Slider
                  classes={{ root: "ypositionSlider" }}
                  min={0}
                  max={20}
                  step={1}
                  value={size.args.sliderPositionY}
                  onChange={(e, value) => {
                    imagePositionChange(e, "y", value);
                  }}
                  disabled={positionDisabled}
                />
              </div>
            </div>
          </animated.div>

          <Typography variant="h6" align="center">
            Browse
          </Typography>
          <ButtonBase
            onClick={e => {
              setBackgroundModeUnsplash(false);
              setUnsplashOpen(true);
            }}
            classes={{ root: "browseBtn" }}
          >
            <div className="imgContainer">
              <div className="bgImage" />
              <span>1000's of Images</span>
            </div>
          </ButtonBase>
          <Typography variant="h6" align="center">
            Upload
          </Typography>
          <Dropzone
            imgArgs={canvasState.image.size.args}
            addImageUrl={addImageUrl}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <Unsplash
        open={unsplashOpen}
        handleClose={handleUnsplashClose}
        query={unsplashQuery}
        images={unsplashResults}
        api={unsplashAPI}
        queryChange={unsplashQueryChange}
        setUnsplashResults={setUnsplashResults}
        canvasState={canvasState}
        setUnsplashPage={setUnsplashPage}
        selectUnsplashImage={selectUnsplashImage}
        addImagePathUnsplash={addImagePathUnsplash}
      />
    </div>
  );
}

export default LeftControl;
