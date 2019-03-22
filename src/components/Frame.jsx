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
        onGradientThreeChange={props.onGradientThreeChange}
        onBackgroundModeChange={props.onBackgroundModeChange}
        onImgSizeChange={props.onImgSizeChange}
        addImageUrl={props.addImageUrl}
        onEffectChange={props.onEffectChange}
        setLinearVal={props.setLinearVal}
        imagePositionChange={props.imagePositionChange}
        unsplashAPI={props.unsplashAPI}
        unsplashResults={props.unsplashResults}
        unsplashQuery={props.unsplashQuery}
        unsplashQueryChange={props.unsplashQueryChange}
        setUnsplashResults={props.setUnsplashResults}
        setUnsplashPage={props.setUnsplashPage}
        selectUnsplashImage={props.selectUnsplashImage}
        addImagePathUnsplash={props.addImagePathUnsplash}
        onBackgroundImageSelect={props.onBackgroundImageSelect}
        setBackgroundImageOpacity={props.setBackgroundImageOpacity}
        setBackgroundModeUnsplash={props.setBackgroundModeUnsplash}
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
