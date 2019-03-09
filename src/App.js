import React, { Component } from "react";
import Frame from "./components/Frame";
import Canvas from "./components/Canvas";
import axios from "axios";
import WebFont from "webfontloader";
import {
  drawRadialBackground,
  drawLinearBackground,
  drawText,
  drawText3D,
  drawImage
} from "./utils/canvasHelpers";
import LinearProgress from "@material-ui/core/LinearProgress";
import { GOOGLE_FONTS_KEY } from "./keys/keys";
import "./main.css";
class App extends Component {
  state = {
    loading: false,
    loadingCompleted: 100,
    backgroundColor: {
      gradientOne: "#ffffff",
      gradientTwo: "#ffffff",
      mode: {
        name: "Mode One",
        gradiantArgs: [250, 195, 200, 960, 120, 140]
      }
    },
    text: {
      fonts: [],
      fontFamily: "Roboto",
      fontColor: "#000000",
      songTitleVal: "",
      artistVal: "",
      modalOpen: false,
      textSaved: false,
      loading: false,
      threeD: false
    },
    image: {
      imgPath: "",
      size: {
        name: "large",
        args: [100, 20, 300, 300]
      },
      effect: "none"
    },
    reset: false,
    downloadToPng: false
  };

  // API call to google fonts

  componentDidMount() {
    this.setState({
      ...this.state,
      loading: true
    });
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

          loading: false,
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
              gradiantArgs: [250, 195, 200, 960, 120, 140]
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
              gradiantArgs: [200, 100, 300, 400]
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
              gradiantArgs: [0, 0, 400, 960, 20, 440]
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

  onFontFamilySelectChange = (name, value) => {
    WebFont.load({
      google: {
        families: [value]
      },
      loading: () => {
        this.setState({
          ...this.state,
          text: {
            ...this.state.text,
            loading: true
          }
        });
      },
      fontactive: () => {
        this.setState({
          ...this.state,
          text: {
            ...this.state.text,
            [name]: value,
            loading: false
          }
        });
        document.getElementById("fontFamSample").style.fontFamily = value;
      },
      fontinactive: () => {
        console.log("Error Occured!");
        this.setState({
          ...this.state,
          text: {
            ...this.state.text,
            [name]: value,
            loading: false
          }
        });
      }
    });
  };

  onAddedTextSave = (context, canvas) => {
    const {
      fontFamily,
      songTitleVal,
      fontColor,
      artistVal,
      threeD
    } = this.state.text;
    const { gradientOne, gradientTwo, mode } = this.state.backgroundColor;
    const { imgPath, size, effect } = this.state.image;
    const addLink = new Promise((resolve, reject) => {
      const msg = { msg: "Loading" };
      resolve(msg);
    });
    addLink.then(() => {
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.rect(0, 0, canvas.width, canvas.height);

        if (
          this.state.backgroundColor.mode.name === "Mode Four" ||
          this.state.backgroundColor.mode.name === "Mode Two"
        ) {
          drawLinearBackground(
            context,
            mode.gradiantArgs,
            gradientOne,
            gradientTwo
          );
          drawImage(context, imgPath, size.args, effect);
          setTimeout(() => {
            threeD
              ? drawText3D(
                  context,
                  fontColor,
                  fontFamily,
                  songTitleVal,
                  artistVal
                )
              : drawText(
                  context,
                  fontColor,
                  fontFamily,
                  songTitleVal,
                  artistVal
                );

            this.setState({
              ...this.state,
              text: {
                ...this.state.text,
                modalOpen: false,
                textSaved: false,
                loading: false
              }
            });
          }, 350);
        } else {
          drawRadialBackground(
            context,
            mode.gradiantArgs,
            gradientOne,
            gradientTwo
          );
          drawImage(context, imgPath, size.args, effect);
          setTimeout(() => {
            threeD
              ? drawText3D(
                  context,
                  fontColor,
                  fontFamily,
                  songTitleVal,
                  artistVal
                )
              : drawText(
                  context,
                  fontColor,
                  fontFamily,
                  songTitleVal,
                  artistVal
                );

            this.setState({
              ...this.state,
              text: {
                ...this.state.text,
                modalOpen: false,
                textSaved: false,
                loading: false
              }
            });
          }, 350);
        }
      }
    });
  };

  drawTextOnTop = () => {};

  onAddTextBtnClick = () => {
    this.setState({
      ...this.state,
      text: {
        ...this.state.text,
        textSaved: true,
        loading: true
      }
    });
  };

  handleOpenDialog = () => {
    this.setState({
      ...this.state,
      text: {
        ...this.state.text,
        modalOpen: true
      }
    });
  };

  handleCloseDialog = () => {
    this.setState({
      ...this.state,
      text: {
        ...this.state.text,
        modalOpen: false
      }
    });
  };

  handle3DCheck = () => {
    this.setState(prevState => ({
      ...this.state,
      text: {
        ...this.state.text,
        threeD: !prevState.text.threeD
      }
    }));
  };

  // Image

  onImgSizeChange = value => {
    switch (value) {
      case "large":
        this.setState({
          ...this.state,
          image: {
            ...this.state.image,
            size: {
              name: value,
              args: [100, 20, 300, 300]
            }
          }
        });
        break;
      case "medium":
        this.setState({
          ...this.state,
          image: {
            ...this.state.image,
            size: {
              name: value,
              args: [150, 70, 200, 200]
            }
          }
        });
        break;
      case "small":
        this.setState({
          ...this.state,
          image: {
            ...this.state.image,
            size: {
              name: value,
              args: [200, 120, 100, 100]
            }
          }
        });
        break;
      default:
        return;
    }
  };

  addImageUrl = imgPath => {
    this.setState({
      ...this.state,
      image: {
        ...this.state.image,
        imgPath: imgPath
      }
    });
  };

  onEffectChange = value => {
    this.setState({
      ...this.state,
      image: {
        ...this.state.image,
        effect: value
      }
    });
  };

  // Reset

  onResetBtnClick = () => {
    this.setState(
      {
        loading: false,
        loadingCompleted: 100,
        backgroundColor: {
          gradientOne: "#ffffff",
          gradientTwo: "#ffffff",
          mode: {
            name: "Mode One",
            gradiantArgs: [250, 195, 200, 960, 120, 140]
          }
        },
        text: {
          ...this.state.text,
          fontFamily: "Roboto",
          fontColor: "#000000",
          songTitleVal: "",
          artistVal: "",
          modalOpen: false,
          textSaved: false,
          loading: false,
          threeD: false
        },
        image: {
          imgPath: "",
          size: {
            name: "large",
            args: [100, 20, 300, 300]
          },
          effect: "none"
        },
        reset: true
      },
      () => {
        this.setState({
          ...this.state,
          reset: false
        });
      }
    );
  };

  // Trigger download

  triggerCanvasDownload = () => {
    console.log("Triggered");
    this.setState(
      {
        ...this.state,
        downloadToPng: true
      },
      () => {
        this.setState({
          ...this.state,
          downloadToPng: false
        });
      }
    );
  };

  render() {
    const { loading, loadingCompleted } = this.state;

    return loading ? (
      <LinearProgress variant="determinate" value={loadingCompleted} />
    ) : (
      <Frame
        canvasState={this.state}
        onGradientOneChange={this.onGradientOneChange}
        onGradientTwoChange={this.onGradientTwoChange}
        onBackgroundModeChange={this.onBackgroundModeChange}
        onTextColorChange={this.onTextColorChange}
        onFontChange={this.onFontChange}
        onTextValuesChanged={this.onTextValuesChanged}
        onAddTextBtnClick={this.onAddTextBtnClick}
        handleOpenDialog={this.handleOpenDialog}
        handleCloseDialog={this.handleCloseDialog}
        handle3DCheck={this.handle3DCheck}
        onFontFamilySelectChange={this.onFontFamilySelectChange}
        onImgSizeChange={this.onImgSizeChange}
        addImageUrl={this.addImageUrl}
        onEffectChange={this.onEffectChange}
        onResetBtnClick={this.onResetBtnClick}
        triggerCanvasDownload={this.triggerCanvasDownload}
      >
        <Canvas
          canvasState={this.state}
          onAddedTextSave={this.onAddedTextSave}
        />
      </Frame>
    );
  }
}

export default App;
