import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function Header() {
  return (
    <AppBar position="static" color="default">
      <Toolbar classes={{ root: "toolbar" }}>
        <Typography classes={{ root: "header" }} color="primary">
          muzeGen
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
