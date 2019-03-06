import React, { Component } from "react";
import Frame from "./components/Frame";
import Canvas from "./components/Canvas";
import axios from "axios";
import { GOOGLE_FONTS_KEY } from "./keys/keys";
import "./main.css";
class App extends Component {
  state = {
    loading: false,
    backgroundColor: {
      gradientOne: "#ffffff",
      gradientTwo: "#ffffff",
      mode: {
        name: "Mode One",
        gradiantArgs: [0, 0, 200, 460, 150, 140]
      }
    },
    text: {
      fonts: [],
      fontFamily: "Roboto",
      fontColor: "#000000",
      songTitleVal: "",
      artistVal: "",
      textSaved: false
    }
  };

  // API call to google fonts

  componentDidMount() {
    axios
      .get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_KEY}&sort=popularity`
      )
      .then(res => {
        const popularFonts = res.data.items.filter((item, index) =>
          index < 100 ? item : null
        );
        this.setState({
          ...this.state,
          text: {
            ...this.state.text,
            fonts: popularFonts
          }
        });
      });
  }

  // Background

  onGradientOneChange = value => {
    this.setState({
      ...this.state,
      backgroundColor: {
        ...this.state.backgroundColor,
        gradientOne: value
      }
    });
  };

  onGradientTwoChange = value => {
    this.setState({
      ...this.state,
      backgroundColor: {
        ...this.state.backgroundColor,
        gradientTwo: value
      }
    });
  };

  onBackgroundModeChange = mode => {
    switch (mode) {
      case "Mode One":
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              name: mode,
              gradiantArgs: [0, 0, 200, 460, 150, 140]
            }
          }
        });
        break;
      case "Mode Two":
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              name: mode,
              gradiantArgs: [0, 100, 200, 800, 200, 140]
            }
          }
        });
        break;
      case "Mode Three":
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              name: mode,
              gradiantArgs: [0, 0, 270, 400, 100, 140]
            }
          }
        });
        break;
      case "Mode Four":
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              name: mode,
              gradiantArgs: [0, 0, 100, 400]
            }
          }
        });
        break;
      default:
        return;
    }
  };

  // Text
  onTextValuesChanged = (name, value) => {
    this.setState({
      ...this.state,
      text: {
        ...this.state.text,
        [name]: value
      }
    });
  };

  render() {
    return (
      <Frame
        canvasState={this.state}
        onGradientOneChange={this.onGradientOneChange}
        onGradientTwoChange={this.onGradientTwoChange}
        onBackgroundModeChange={this.onBackgroundModeChange}
        onTextColorChange={this.onTextColorChange}
        onFontChange={this.onFontChange}
        onTextValuesChanged={this.onTextValuesChanged}
      >
        <Canvas canvasState={this.state} />
      </Frame>
    );
  }
}

export default App;
