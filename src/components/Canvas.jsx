import React, { Component } from "react";

class Canvas extends Component {
  componentDidMount() {
    const {
      gradientOne,
      gradientTwo,
      mode
    } = this.props.canvasState.backgroundColor;
    this.ctx = this.canvas.getContext("2d");

    this.radialGradient = this.ctx.createRadialGradient(...mode.gradiantArgs);

    this.ctx.fillStyle = this.radialGradient;
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.radialGradient.addColorStop(0, gradientOne);
    this.radialGradient.addColorStop(1, gradientTwo);
    this.ctx.fill();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      gradientOne,
      gradientTwo,
      mode
    } = this.props.canvasState.backgroundColor;
    if (
      prevProps.canvasState.backgroundColor.gradientOne !== gradientOne ||
      prevProps.canvasState.backgroundColor.gradientTwo !== gradientTwo ||
      prevProps.canvasState.backgroundColor.mode.name !== mode.name
    ) {
      if (mode.name === "Mode Four") {
        this.linearGradient = this.ctx.createLinearGradient(
          ...mode.gradiantArgs
        );
        this.ctx.fillStyle = this.linearGradient;

        this.linearGradient.addColorStop(0, gradientOne);
        this.linearGradient.addColorStop(1, gradientTwo);
        this.ctx.fill();
      } else {
        this.createRadialGradient();
      }
    }
  }

  createRadialGradient = () => {
    const {
      gradientOne,
      gradientTwo,
      mode
    } = this.props.canvasState.backgroundColor;
    this.radialGradient = this.ctx.createRadialGradient(...mode.gradiantArgs);
    this.ctx.fillStyle = this.radialGradient;

    this.radialGradient.addColorStop(0, gradientOne);
    this.radialGradient.addColorStop(1, gradientTwo);
    this.ctx.fill();
  };

  render() {
    return (
      <main className="canvasContainer">
        <canvas ref={ref => (this.canvas = ref)} id="canvas">
          YOUR BROWSER DOESN'T SUPPORT THIS FEATURE :(
        </canvas>
      </main>
    );
  }
}

export default Canvas;
