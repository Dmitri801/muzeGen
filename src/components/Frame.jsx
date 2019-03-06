import React from "react";
import Header from "./Header";
import LeftControl from "./LeftControl";
import RightControl from "./RightControl";
function Frame(props) {
  return (
    <div className="frame">
      <Header />
      <LeftControl
        canvasState={props.canvasState}
        onGradientOneChange={props.onGradientOneChange}
        onGradientTwoChange={props.onGradientTwoChange}
        onBackgroundModeChange={props.onBackgroundModeChange}
      />
      <RightControl
        text={props.canvasState.text}
        onTextValuesChanged={props.onTextValuesChanged}
      />
      {props.children}
    </div>
  );
}

export default Frame;
