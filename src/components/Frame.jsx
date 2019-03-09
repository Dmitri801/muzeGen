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
        onImgSizeChange={props.onImgSizeChange}
        addImageUrl={props.addImageUrl}
        onEffectChange={props.onEffectChange}
      />
      <RightControl
        text={props.canvasState.text}
        onTextValuesChanged={props.onTextValuesChanged}
        onAddTextBtnClick={props.onAddTextBtnClick}
        handleOpenDialog={props.handleOpenDialog}
        handleCloseDialog={props.handleCloseDialog}
        handle3DCheck={props.handle3DCheck}
        onFontFamilySelectChange={props.onFontFamilySelectChange}
        onResetBtnClick={props.onResetBtnClick}
        triggerCanvasDownload={props.triggerCanvasDownload}
      />
      {props.children}
    </div>
  );
}

export default Frame;
