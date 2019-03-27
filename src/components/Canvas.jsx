import React, { Component } from "react";
import {
  drawRadialBackground,
  drawLinearBackground,
  drawText,
  drawText3D,
  // testerDraw,
  // showGrid,
  drawImage,
  drawBackgroundImg,
  addBackgroundImg,
  saveCanvasAsImage
} from "../utils/canvasHelpers";

// const imgSrc = require("../assets/ditreez.png");

class Canvas extends Component {
  componentDidMount() {
    const {
      gradientOne,
      gradientTwo,
      mode
    } = this.props.canvasState.backgroundColor;
    // const imgSrc = require("../assets/regularshow.png");
    this.ctx = this.canvas.getContext("2d");
    this.imgCtx = this.imgCanvas.getContext("2d");
    this.txtCtx = this.txtCanvas.getContext("2d");

    this.radialGradient = this.ctx.createRadialGradient(...mode.gradiantArgs);

    this.ctx.fillStyle = this.radialGradient;
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.radialGradient.addColorStop(0, gradientOne);
    this.radialGradient.addColorStop(1, gradientTwo);
    this.ctx.fill();

    // showGrid(this.ctx, this.canvas.width, this.canvas.height);
    // testerDraw(this.canvas, this.ctx, this.canvas.width, this.canvas.height);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      gradientOne,
      gradientTwo,
      gradientThree,
      mode
    } = this.props.canvasState.backgroundColor;
    const {
      textSaved,
      songTitleVal,
      threeD,
      fontColor,
      fontFamily,
      artistVal
    } = this.props.canvasState.text;
    const { imgPath, size, effect } = this.props.canvasState.image;
    const { backgroundImage } = this.props.canvasState;
    if (
      prevProps.canvasState.reset !== this.props.canvasState.reset &&
      this.props.canvasState.reset
    ) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.imgCtx.clearRect(0, 0, this.imgCanvas.width, this.imgCanvas.height);
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      this.imgCtx.rect(0, 0, this.imgCanvas.width, this.imgCanvas.height);
      this.txtCtx.clearRect(0, 0, this.txtCanvas.width, this.txtCanvas.height);
    }
    if (
      prevProps.canvasState.downloadToPng !==
        this.props.canvasState.downloadToPng &&
      this.props.canvasState.downloadToPng
    ) {
      drawImage(this.imgCtx, imgPath, size.args, effect, this.imgCanvas);
      threeD
        ? drawText3D(
            this.canvas,
            this.txtCtx,
            fontColor,
            fontFamily,
            songTitleVal,
            artistVal
          )
        : drawText(
            this.canvas,
            this.txtCtx,
            fontColor,
            fontFamily,
            songTitleVal,
            artistVal
          );
      if (mode.name === "Mode One" || mode.name === "Mode Three") {
        saveCanvasAsImage(
          this.canvas,
          this.imgCanvas,
          this.txtCanvas,
          this.txtCtx,
          this.ctx,
          this.imgCtx,
          songTitleVal,
          size.args
        );
        this.drawCanvasRadial();
      } else {
        saveCanvasAsImage(
          this.canvas,
          this.imgCanvas,
          this.txtCanvas,
          this.txtCtx,
          this.ctx,
          this.imgCtx,
          songTitleVal,
          size.args
        );
        this.drawCanvasLinear();
      }
      drawBackgroundImg(
        this.ctx,
        backgroundImage.imgPath,
        this.canvas,
        backgroundImage
      );
      console.log("Saved");
    }
    if (
      prevProps.canvasState.backgroundColor.gradientOne !== gradientOne ||
      prevProps.canvasState.backgroundColor.gradientTwo !== gradientTwo ||
      prevProps.canvasState.backgroundColor.gradientThree !== gradientThree ||
      prevProps.canvasState.backgroundColor.mode.name !== mode.name
    ) {
      if (prevProps.canvasState.backgroundImage.mode.name !== "none") {
        if (mode.name === "Mode Four" || mode.name === "Mode Two") {
          this.drawCanvasLinear();
          drawBackgroundImg(
            this.ctx,
            backgroundImage.imgPath,
            this.canvas,
            backgroundImage
          );
        } else {
          this.drawCanvasRadial();
          drawBackgroundImg(
            this.ctx,
            backgroundImage.imgPath,
            this.canvas,
            backgroundImage
          );
        }
      } else {
        if (mode.name === "Mode Four" || mode.name === "Mode Two") {
          this.drawCanvasLinear();
        } else {
          this.drawCanvasRadial();
        }
      }
    } else if (
      prevProps.canvasState.text.textSaved !== textSaved &&
      textSaved === true
    ) {
      this.props.onAddedTextSave(
        this.txtCtx,
        this.canvas,
        this.imgCtx,
        this.imgCanvas
      );
    } else if (prevProps.canvasState.image.imgPath !== imgPath) {
      this.imgCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.imgCtx.rect(0, 0, this.canvas.width, this.canvas.height);
      drawImage(this.imgCtx, imgPath, size.args, effect, this.imgCanvas);
    } else if (prevProps.canvasState.image.size.name !== size.name) {
      drawImage(this.imgCtx, imgPath, size.args, effect, this.imgCanvas);

      // } else if (prevProps.canvasState.image.effect !== effect) {
      //   if (mode.name === "Mode Four" || mode.name === "Mode Two") {
      //     this.drawCanvasLinear();
      //   } else {
      //     this.drawCanvasRadial();
      //   }
    } else if (
      prevProps.canvasState.backgroundColor.mode.sliderValue !==
      mode.sliderValue
    ) {
      if (prevProps.canvasState.backgroundImage.mode.name !== "none") {
        setTimeout(() => {
          this.drawCanvasLinear();
          drawBackgroundImg(
            this.ctx,
            backgroundImage.imgPath,
            this.canvas,
            backgroundImage
          );
        }, 20);
      } else {
        setTimeout(() => {
          this.drawCanvasLinear();
        }, 20);
      }
    } else if (
      prevProps.canvasState.backgroundImage.imgPath !==
        backgroundImage.imgPath &&
      backgroundImage.images.length <= 2 &&
      !backgroundImage.resetting
    ) {
      addBackgroundImg(
        backgroundImage.imgPath,
        backgroundImage.opacity,
        this.props.addImageBackground
      );
    } else if (
      prevProps.canvasState.backgroundImage.images.length !==
      backgroundImage.images.length
    ) {
      if (mode.name === "Mode Four" || mode.name === "Mode Two") {
        this.drawCanvasLinear();
        drawBackgroundImg(
          this.ctx,
          backgroundImage.imgPath,
          this.canvas,
          backgroundImage
        );
      } else {
        this.drawCanvasRadial();
        drawBackgroundImg(
          this.ctx,
          backgroundImage.imgPath,
          this.canvas,
          backgroundImage
        );
      }
    } else if (
      prevProps.canvasState.backgroundImage.mode.name !==
      backgroundImage.mode.name
    ) {
      if (backgroundImage.mode.name === "none") {
        if (mode.name === "Mode Four" || mode.name === "Mode Two") {
          this.drawCanvasLinear();
        } else {
          this.drawCanvasRadial();
        }
      } else {
        if (mode.name === "Mode Four" || mode.name === "Mode Two") {
          this.drawCanvasLinear();
          drawBackgroundImg(
            this.ctx,
            backgroundImage.imgPath,
            this.canvas,
            backgroundImage
          );
        } else {
          this.drawCanvasRadial();
          drawBackgroundImg(
            this.ctx,
            backgroundImage.imgPath,
            this.canvas,
            backgroundImage
          );
        }
      }
    }
  }

  drawCanvasLinear = () => {
    const {
      gradientOne,
      gradientTwo,
      gradientThree,
      mode
    } = this.props.canvasState.backgroundColor;

    const linearArgsArr = [];
    for (let key in mode.linearArgs) {
      linearArgsArr.push(mode.linearArgs[key]);
    }
    drawLinearBackground(
      this.ctx,
      mode,
      linearArgsArr,
      gradientOne,
      gradientTwo,
      gradientThree
    );
  };

  drawCanvasRadial = () => {
    const {
      gradientOne,
      gradientTwo,
      mode
    } = this.props.canvasState.backgroundColor;

    drawRadialBackground(this.ctx, mode.gradiantArgs, gradientOne, gradientTwo);
  };

  drawCanvasBackgroundImg = backgroundImage => {
    addBackgroundImg(
      backgroundImage.imgPath,
      backgroundImage.opacity,
      this.props.addImageBackground
    );

    drawBackgroundImg(
      this.ctx,
      backgroundImage.imgPath,
      this.canvas,
      backgroundImage
    );
  };

  render() {
    const { width, height, top, left } = this.props.canvasState.image.size.args;
    return (
      <main className="main">
        <div className="canvasContainer">
          <canvas
            height={450}
            width={450}
            ref={ref => (this.canvas = ref)}
            id="canvas"
          >
            YOUR BROWSER DOESN'T SUPPORT THIS FEATURE :(
          </canvas>
          <canvas
            style={{
              top: `${top}px`,
              left: `${left}px`
            }}
            height={height}
            width={width}
            id="imgCanvas"
            ref={ref => (this.imgCanvas = ref)}
          >
            YOUR BROWSER DOESN'T SUPPORT THIS FEATURE :(
          </canvas>
          <canvas
            height={450}
            width={450}
            id="txtCanvas"
            ref={ref => (this.txtCanvas = ref)}
          >
            YOUR BROWSER DOESN'T SUPPORT THIS FEATURE :(
          </canvas>
        </div>
      </main>
    );
  }
}

export default Canvas;
