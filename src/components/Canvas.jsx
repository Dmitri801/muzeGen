import React, { Component } from "react";
import {
  drawRadialBackground,
  drawLinearBackground,
  drawText,
  drawText3D,
  // testerDraw,
  // showGrid,
  drawImage,
  saveCanvasAsImage
} from "../utils/canvasHelpers";

class Canvas extends Component {
  componentDidMount() {
    const {
      gradientOne,
      gradientTwo,
      mode
    } = this.props.canvasState.backgroundColor;
    // const imgSrc = require("../assets/regularshow.png");
    this.ctx = this.canvas.getContext("2d");
    // const boundings = this.canvas.getBoundingClientRect();

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
      mode
    } = this.props.canvasState.backgroundColor;
    const { textSaved, songTitleVal } = this.props.canvasState.text;
    const { imgPath, size, effect } = this.props.canvasState.image;
    if (
      prevProps.canvasState.reset !== this.props.canvasState.reset &&
      this.props.canvasState.reset
    ) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    }
    if (
      prevProps.canvasState.downloadToPng !==
        this.props.canvasState.downloadToPng &&
      this.props.canvasState.downloadToPng
    ) {
      saveCanvasAsImage(this.canvas, songTitleVal);
      console.log("Saved");
    }
    if (
      prevProps.canvasState.backgroundColor.gradientOne !== gradientOne ||
      prevProps.canvasState.backgroundColor.gradientTwo !== gradientTwo ||
      prevProps.canvasState.backgroundColor.mode.name !== mode.name
    ) {
      if (mode.name === "Mode Four" || mode.name === "Mode Two") {
        this.drawCanvasLinear();
      } else {
        this.drawCanvasRadial();
      }
    } else if (
      prevProps.canvasState.text.textSaved !== textSaved &&
      textSaved === true
    ) {
      this.props.onAddedTextSave(this.ctx, this.canvas);
    } else if (prevProps.canvasState.image.imgPath !== imgPath) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      if (mode.name === "Mode Four" || mode.name === "Mode Two") {
        this.drawCanvasLinear();
      } else {
        this.drawCanvasRadial();
      }
    } else if (prevProps.canvasState.image.size.name !== size.name) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      if (mode.name === "Mode Four" || mode.name === "Mode Two") {
        this.drawCanvasLinear();
      } else {
        this.drawCanvasRadial();
      }
    } else if (prevProps.canvasState.image.effect !== effect) {
      if (mode.name === "Mode Four" || mode.name === "Mode Two") {
        this.drawCanvasLinear();
      } else {
        this.drawCanvasRadial();
      }
    }
  }

  drawCanvasLinear = () => {
    const {
      gradientOne,
      gradientTwo,
      mode
    } = this.props.canvasState.backgroundColor;
    const {
      fontFamily,
      fontColor,
      songTitleVal,
      artistVal,
      threeD
    } = this.props.canvasState.text;
    const { imgPath, size, effect } = this.props.canvasState.image;
    drawLinearBackground(this.ctx, mode.gradiantArgs, gradientOne, gradientTwo);
    drawImage(this.ctx, imgPath, size.args, effect);
    setTimeout(() => {
      threeD
        ? drawText3D(this.ctx, fontColor, fontFamily, songTitleVal, artistVal)
        : drawText(this.ctx, fontColor, fontFamily, songTitleVal, artistVal);
    }, 50);
  };

  drawCanvasRadial = () => {
    const {
      gradientOne,
      gradientTwo,
      mode
    } = this.props.canvasState.backgroundColor;
    const {
      fontFamily,
      fontColor,
      songTitleVal,
      artistVal,
      threeD
    } = this.props.canvasState.text;
    const { imgPath, size, effect } = this.props.canvasState.image;

    drawRadialBackground(this.ctx, mode.gradiantArgs, gradientOne, gradientTwo);
    drawImage(this.ctx, imgPath, size.args, effect);
    setTimeout(() => {
      threeD
        ? drawText3D(this.ctx, fontColor, fontFamily, songTitleVal, artistVal)
        : drawText(this.ctx, fontColor, fontFamily, songTitleVal, artistVal);
    }, 50);
  };

  render() {
    return (
      <main className="canvasContainer">
        <canvas
          height={350}
          width={500}
          ref={ref => (this.canvas = ref)}
          id="canvas"
        >
          YOUR BROWSER DOESN'T SUPPORT THIS FEATURE :(
        </canvas>
      </main>
    );
  }
}

export default Canvas;
