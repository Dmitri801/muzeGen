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
import Unsplash from "unsplash-js";
import { UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY } from "./keys/keys";

const unsplash = new Unsplash({
  applicationId: UNSPLASH_ACCESS_KEY,
  secret: UNSPLASH_SECRET_KEY,
  headers: {
    Authorization: UNSPLASH_ACCESS_KEY
  }
});
class App extends Component {
  state = {
    loading: false,
    loadingCompleted: 0,
    backgroundColor: {
      gradientOne: "#ffffff",
      gradientTwo: "#ffffff",
      gradientThree: "#ffffff",
      mode: {
        name: "Mode One",
        gradiantArgs: [257.0, 200.0, 0.0, 200.0, 200.0, 400.0],
        linearArgs: null,
        sliderValue: null,
        degrees: null
      }
    },
    backgroundImage: {
      imgPath: "",
      mode: {
        name: "none"
      },
      opacity: 1,
      images: [],
      resetting: false
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
        args: {
          width: 300,
          height: 300,
          top: 65,
          left: 75,
          sliderPositionX: 10,
          sliderPositionY: 10,
          positionChange: false
        }
      },
      shadow: {
        name: "default",
        offsetX: 3,
        offsetY: 3,
        shadowColor: "#000000",
        shadowBlur: 10
      },
      unsplash: {
        query: "music",
        results: [],
        selectedImg: null,
        pageNum: 1,
        totalPages: null,
        backgroundMode: false
      }
    },
    reset: false,
    downloadToPng: false
  };

  // API call to google fonts and unsplash - INIT

  componentDidMount() {
    const { query, pageNum } = this.state.image.unsplash;
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
          loadingCompleted: 90
        });
        unsplash.search
          .photos(query, pageNum)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({
              ...this.state,

              loading: false,
              loadingCompleted: 100,
              text: {
                ...this.state.text,
                fonts: popularFonts
              },
              image: {
                ...this.state.image,
                unsplash: {
                  ...this.state.image.unsplash,
                  results: data.results,
                  totalPages: data.total_pages
                }
              }
            });
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

  onGradientThreeChange = value => {
    this.setState({
      ...this.state,
      backgroundColor: {
        ...this.state.backgroundColor,
        gradientThree: value
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
              ...this.state.backgroundColor.mode,
              name: mode,
              gradiantArgs: [257.0, 200.0, 0.0, 200.0, 200.0, 400.0]
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
              ...this.state.backgroundColor.mode,
              name: mode,
              linearArgs: {
                x0: 0,
                y0: 0,
                x1: 450,
                y1: 450
              },
              sliderValue: 0,
              degrees: 45
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
              ...this.state.backgroundColor.mode,
              name: mode,
              gradiantArgs: [257.0, 200.0, 450.0, 200.0, 200.0, 0.0]
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
              ...this.state.backgroundColor.mode,
              name: mode,
              linearArgs: {
                x0: 450,
                y0: 225,
                x1: 0,
                y1: 225
              },

              sliderValue: 3,
              degrees: 180
            }
          }
        });
        break;
      default:
        return;
    }
  };

  setLinearVal = (e, value) => {
    this.setState(
      {
        ...this.state,
        backgroundColor: {
          ...this.state.backgroundColor,
          mode: {
            ...this.state.backgroundColor.mode,
            sliderValue: value
          }
        }
      },
      () => {
        this.rotateGradient(value);
      }
    );
  };

  rotateGradient = sliderValue => {
    switch (sliderValue) {
      case 0:
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              ...this.state.backgroundColor.mode,
              linearArgs: {
                x0: 0,
                y0: 0,
                x1: 450,
                y1: 450
              },
              sliderValue: 0,
              degrees: 45
            }
          }
        });
        break;
      case 1:
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              ...this.state.backgroundColor.mode,
              linearArgs: {
                x0: 225,
                y0: 0,
                x1: 225,
                y1: 450
              },
              sliderValue: 1,
              degrees: 90
            }
          }
        });
        break;
      case 2:
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              ...this.state.backgroundColor.mode,
              linearArgs: {
                x0: 450,
                y0: 0,
                x1: 0,
                y1: 450
              },
              sliderValue: 2,
              degrees: 135
            }
          }
        });
        break;
      case 3:
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              ...this.state.backgroundColor.mode,
              linearArgs: {
                x0: 450,
                y0: 225,
                x1: 0,
                y1: 225
              },
              sliderValue: 3,
              degrees: 180
            }
          }
        });
        break;
      case 4:
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              ...this.state.backgroundColor.mode,
              linearArgs: {
                x0: 450,
                y0: 450,
                x1: 0,
                y1: 0
              },
              sliderValue: 4,
              degrees: 225
            }
          }
        });
        break;
      case 5:
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              ...this.state.backgroundColor.mode,
              linearArgs: {
                x0: 225,
                y0: 450,
                x1: 225,
                y1: 0
              },
              sliderValue: 5,
              degrees: 270
            }
          }
        });
        break;
      case 6:
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              ...this.state.backgroundColor.mode,
              linearArgs: {
                x0: 0,
                y0: 450,
                x1: 450,
                y1: 0
              },
              sliderValue: 6,
              degrees: 315
            }
          }
        });
        break;
      case 7:
        this.setState({
          ...this.state,
          backgroundColor: {
            ...this.state.backgroundColor,
            mode: {
              ...this.state.backgroundColor.mode,
              linearArgs: {
                x0: 0,
                y0: 225,
                x1: 450,
                y1: 225
              },
              sliderValue: 7,
              degrees: 360
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

  onAddedTextSave = (context, canvas, imgContext, imgCanvas) => {
    console.log(imgContext);
    const {
      fontFamily,
      songTitleVal,
      fontColor,
      artistVal,
      threeD
    } = this.state.text;
    const {
      gradientOne,
      gradientTwo,
      mode,
      gradientThree
    } = this.state.backgroundColor;
    const { imgPath, size, effect } = this.state.image;
    const addLink = new Promise((resolve, reject) => {
      const msg = { msg: "Loading" };
      resolve(msg);
    });
    addLink.then(() => {
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        imgContext.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
        imgContext.rect(0, 0, imgCanvas.width, imgCanvas.height);
        context.rect(0, 0, canvas.width, canvas.height);

        if (
          this.state.backgroundColor.mode.name === "Mode Four" ||
          this.state.backgroundColor.mode.name === "Mode Two"
        ) {
          drawLinearBackground(
            context,
            mode,
            mode.gradiantArgs,
            gradientOne,
            gradientTwo,
            gradientThree
          );
          drawImage(imgContext, imgPath, size.args, effect, imgCanvas);
          setTimeout(() => {
            threeD
              ? drawText3D(
                  canvas,
                  context,
                  fontColor,
                  fontFamily,
                  songTitleVal,
                  artistVal
                )
              : drawText(
                  canvas,
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
          drawImage(imgContext, imgPath, size.args, effect, imgCanvas);
          setTimeout(() => {
            threeD
              ? drawText3D(
                  canvas,
                  context,
                  fontColor,
                  fontFamily,
                  songTitleVal,
                  artistVal
                )
              : drawText(
                  canvas,
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
      case "xlarge":
        this.setState({
          ...this.state,
          image: {
            ...this.state.image,
            size: {
              name: value,
              args: {
                height: 400,
                width: 400,
                top: 25,
                left: 25,
                sliderPositionX: 10,
                sliderPositionY: 10
              }
            }
          }
        });
        break;
      case "large":
        this.setState({
          ...this.state,
          image: {
            ...this.state.image,
            size: {
              name: value,
              args: {
                height: 300,
                width: 300,
                top: 65,
                left: 75,
                sliderPositionX: 10,
                sliderPositionY: 10
              }
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
              args: {
                height: 200,
                width: 200,
                top: 110,
                left: 125,
                sliderPositionX: 10,
                sliderPositionY: 10
              }
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
              args: {
                height: 170,
                width: 170,
                top: 130,
                left: 140,
                sliderPositionX: 10,
                sliderPositionY: 10
              }
            }
          }
        });
        break;
      default:
        return;
    }
  };

  imagePositionChange = (e, coordinate, value) => {
    const { sliderPositionX, sliderPositionY } = this.state.image.size.args;
    const { name } = this.state.image.size;

    let leftVal = 10;
    let topVal = 10;

    if (name === "xlarge") {
      leftVal = 15;
      topVal = 15;
    }

    if (coordinate === "x") {
      if (sliderPositionX > value) {
        this.setState(prevState => ({
          ...this.state,
          image: {
            ...this.state.image,
            size: {
              ...this.state.image.size,
              args: {
                ...this.state.image.size.args,
                sliderPositionX: value,
                left: prevState.image.size.args.left - leftVal
              }
            }
          }
        }));
      } else {
        this.setState(prevState => ({
          ...this.state,
          image: {
            ...this.state.image,
            size: {
              ...this.state.image.size,
              args: {
                ...this.state.image.size.args,
                sliderPositionX: value,
                left: prevState.image.size.args.left + leftVal
              }
            }
          }
        }));
      }
    } else if (coordinate === "y") {
      if (sliderPositionY < value) {
        this.setState(prevState => ({
          ...this.state,
          image: {
            ...this.state.image,
            size: {
              ...this.state.image.size,
              args: {
                ...this.state.image.size.args,
                sliderPositionY: value,
                top: prevState.image.size.args.top - topVal
              }
            }
          }
        }));
      } else {
        this.setState(prevState => ({
          ...this.state,
          image: {
            ...this.state.image,
            size: {
              ...this.state.image.size,
              args: {
                ...this.state.image.size.args,
                sliderPositionY: value,
                top: prevState.image.size.args.top + topVal
              }
            }
          }
        }));
      }
    }
  };

  addImageUrl = (imgPath, backgroundBool) => {
    if (!backgroundBool) {
      this.setState(
        {
          ...this.state,
          image: {
            ...this.state.image,
            imgPath: imgPath
          }
        },
        () => {
          const { name } = this.state.image.size;
          this.onImgSizeChange(name);
        }
      );
    } else {
      this.setState(prevState => ({
        ...this.state,
        backgroundImage: {
          ...this.state.backgroundImage,
          mode: {
            name:
              prevState.backgroundImage.mode.name === "none"
                ? "cover"
                : prevState.backgroundImage.mode.name
          },
          imgPath: imgPath
        }
      }));
    }
  };

  onClearLogoBtn = () => {
    this.setState({
      ...this.state,
      image: {
        ...this.state.image,
        imgPath: "",
        size: {
          name: "large",
          args: {
            width: 300,
            height: 300,
            top: 65,
            left: 75,
            sliderPositionX: 10,
            sliderPositionY: 10,
            positionChange: false
          }
        }
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

  // Background Image
  onBackgroundImageSelect = value => {
    this.setState({
      ...this.state,
      backgroundImage: {
        ...this.state.backgroundImage,
        mode: {
          ...this.state.backgroundImage.mode,
          name: value
        }
      }
    });
  };

  setBackgroundImageOpacity = (event, value) => {
    const { images } = this.state.backgroundImage;
    if (images.length >= 1) {
      if (value > 0.75) {
        this.setState({
          ...this.state,
          backgroundImage: {
            ...this.state.backgroundImage,
            opacity: 0.75
          }
        });
      } else {
        this.setState({
          ...this.state,
          backgroundImage: {
            ...this.state.backgroundImage,
            opacity: value
          }
        });
      }
    } else {
      this.setState({
        ...this.state,
        backgroundImage: {
          ...this.state.backgroundImage,
          opacity: value
        }
      });
    }
  };
  addImageBackground = (imgSrc, opacity) => {
    const imgObject = {
      src: imgSrc,
      opacity
    };
    if (opacity === 1) {
      this.setState(
        {
          ...this.state,
          backgroundImage: {
            ...this.state.backgroundImage,
            images: [...this.state.backgroundImage.images, imgObject]
          }
        },
        () => {
          this.setState({
            ...this.state,
            backgroundImage: {
              ...this.state.backgroundImage,
              opacity: 0.75
            }
          });
        }
      );
    } else {
      this.setState({
        ...this.state,
        backgroundImage: {
          ...this.state.backgroundImage,
          images: [...this.state.backgroundImage.images, imgObject]
        }
      });
    }
  };

  onClearImagesBtn = () => {
    this.setState(
      {
        ...this.state,
        backgroundImage: {
          ...this.state.backgroundImage,
          mode: {
            name: "none"
          },
          imgPath: "",
          images: [],

          resetting: true
        }
      },
      () => {
        this.setState({
          ...this.state,
          backgroundImage: {
            ...this.state.backgroundImage,
            resetting: false
          }
        });
      }
    );
  };

  // Unsplash

  setBackgroundModeUnsplash = bool => {
    this.setState({
      ...this.state,
      image: {
        ...this.state.image,
        unsplash: {
          ...this.state.image.unsplash,
          backgroundMode: bool
        }
      }
    });
  };

  selectUnsplashImage = id => {
    this.setState({
      ...this.state,
      image: {
        ...this.state.image,
        unsplash: {
          ...this.state.image.unsplash,
          selectedImg: id
        }
      }
    });
  };

  unsplashQueryChange = (value, loadingMore) => {
    this.setState({
      ...this.state,
      image: {
        ...this.state.image,
        unsplash: {
          ...this.state.image.unsplash,
          query: value
        }
      }
    });
  };

  setUnsplashResults = (results, loadingMore) => {
    if (loadingMore) {
      this.setState(prevState => ({
        ...this.state,
        image: {
          ...this.state.image,
          unsplash: {
            ...this.state.image.unsplash,
            results: [...prevState.image.unsplash.results, ...results]
          }
        }
      }));
    } else {
      this.setState({
        ...this.state,
        image: {
          ...this.state.image,
          unsplash: {
            ...this.state.image.unsplash,
            results: results
          }
        }
      });
    }
  };

  selectUnsplashImage = id => {
    this.setState({
      ...this.state,
      image: {
        ...this.state.image,
        unsplash: {
          ...this.state.image.unsplash,
          selectedImg: id
        }
      }
    });
  };

  addImagePathUnsplash = (url, backgroundBool) => {
    if (backgroundBool) {
      this.setState(prevState => ({
        ...this.state,
        backgroundImage: {
          ...this.state.backgroundImage,
          mode: {
            name:
              prevState.backgroundImage.mode.name === "none"
                ? "cover"
                : prevState.backgroundImage.mode.name
          },
          imgPath: url
        }
      }));
    } else {
      this.setState({
        ...this.state,
        image: {
          ...this.state.image,
          imgPath: url
        }
      });
    }
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
          gradientThree: "#ffffff",
          mode: {
            name: "Mode One",
            gradiantArgs: [257.0, 200.0, 0.0, 200.0, 200.0, 400.0],
            linearArgs: null,
            sliderValue: null,
            degrees: null
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
            args: {
              width: 300,
              height: 300,
              top: 65,
              left: 75,
              sliderPositionX: 10,
              sliderPositionY: 10,
              positionChange: false
            }
          },
          unsplash: {
            ...this.state.image.unsplash,
            selectedImg: null
          },
          effect: "none",
          opacity: null
        },
        backgroundImage: {
          imgPath: "",
          mode: {
            name: "none"
          },
          opacity: 1,
          images: [],
          resetting: true
        },
        reset: true
      },
      () => {
        this.setState({
          ...this.state,
          reset: false,
          backgroundImage: {
            ...this.state.backgroundImage,
            resetting: false
          }
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
    const unsplashResults = this.state.image.unsplash.results;
    const unsplashQuery = this.state.image.unsplash.query;

    return loading ? (
      <LinearProgress variant="determinate" value={loadingCompleted} />
    ) : (
      <Frame
        canvasState={this.state}
        onGradientOneChange={this.onGradientOneChange}
        onGradientTwoChange={this.onGradientTwoChange}
        onGradientThreeChange={this.onGradientThreeChange}
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
        setLinearVal={this.setLinearVal}
        imagePositionChange={this.imagePositionChange}
        unsplashAPI={unsplash}
        unsplashResults={unsplashResults}
        unsplashQuery={unsplashQuery}
        unsplashQueryChange={this.unsplashQueryChange}
        setUnsplashResults={this.setUnsplashResults}
        setUnsplashPage={this.setUnsplashPage}
        selectUnsplashImage={this.selectUnsplashImage}
        addImagePathUnsplash={this.addImagePathUnsplash}
        onBackgroundImageSelect={this.onBackgroundImageSelect}
        setBackgroundImageOpacity={this.setBackgroundImageOpacity}
        setBackgroundModeUnsplash={this.setBackgroundModeUnsplash}
        onClearImagesBtn={this.onClearImagesBtn}
        onClearLogoBtn={this.onClearLogoBtn}
      >
        <Canvas
          canvasState={this.state}
          onAddedTextSave={this.onAddedTextSave}
          addImageBackground={this.addImageBackground}
        />
      </Frame>
    );
  }
}

export default App;
