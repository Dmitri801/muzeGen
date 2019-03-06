import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Create from "@material-ui/icons/Create";
import TextDialog from "./TextDialog";
import Typography from "@material-ui/core/Typography";

import React, { useState } from "react";

function RightControl({
  text,

  onTextValuesChanged
}) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
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
      <TextDialog
        fonts={text.fonts}
        fontFamilyVal={text.fontFamily}
        fontColor={text.fontColor}
        open={open}
        closeDialog={handleCloseDialog}
        songTitleVal={text.songTitleVal}
        artistVal={text.artistVal}
        onTextValuesChanged={onTextValuesChanged}
      />
    </div>
  );
}

export default RightControl;
