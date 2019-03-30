import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Create from "@material-ui/icons/Create";
import TextDialog from "./TextDialog";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Cloud from "@material-ui/icons/Cloud";
import ConfirmReset from "./ConfirmReset";


const RightControl = React.memo(
  ({
    text,
    onAddTextBtnClick,
    onTextValuesChanged,
    handleOpenDialog,
    handleCloseDialog,
    handle3DCheck,
    onFontFamilySelectChange,
    onResetBtnClick,
    triggerCanvasDownload
  }) => {
    const [resetOpen, setResetOpen] = useState(false);

    const handleResetClose = () => {
      setResetOpen(false);
    };

    const handleOpenReset = () => {
      setResetOpen(true);
    };
    return (
      <div className="right_control">
        <List classes={{ root: "addTextBtn_container" }}>
          <ListItem
            onClick={handleOpenDialog}
            classes={{ root: "addTextBtn" }}
            button
          >
            <Typography align="center" variant="h6">
              TEXT <Create />
            </Typography>
          </ListItem>
        </List>
        <List classes={{ root: "resetBtn_container" }}>
          <ListItem
            onClick={handleOpenReset}
            classes={{ root: "resetBtn" }}
            button
          >
            <Typography align="center" variant="h6">
              RESET
            </Typography>
          </ListItem>
        </List>

        <div className="download-container">
          <Fab
            onClick={triggerCanvasDownload}
            classes={{ root: "downloadBtn" }}
            color="primary"
          >
            <Cloud />
          </Fab>
        </div>
        <TextDialog
          fonts={text.fonts}
          fontFamilyVal={text.fontFamily}
          fontColor={text.fontColor}
          loading={text.loading}
          closeDialog={handleCloseDialog}
          songTitleVal={text.songTitleVal}
          artistVal={text.artistVal}
          onTextValuesChanged={onTextValuesChanged}
          onAddTextBtnClick={onAddTextBtnClick}
          modalOpen={text.modalOpen}
          threeDChecked={text.threeD}
          handle3DCheck={handle3DCheck}
          onFontFamilySelectChange={onFontFamilySelectChange}
        />
        <ConfirmReset
          open={resetOpen}
          handleClose={handleResetClose}
          resetCanvas={onResetBtnClick}
        />
        <Feedback />
      </div>
    );
  }
);

export default RightControl;
