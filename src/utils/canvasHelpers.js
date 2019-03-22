import Pica from "pica";
const pica = Pica();

// export const testerDraw = (canvas, ctx, imgCtx, width, height, imgSrc) => {
//   const img = new Image();
//   img.src = imgSrc;

//   img.onload = function() {
//     pica
//       .resize(img, canvas, {
//         unsharpAmount: 80,
//         alpha: true
//       })
//       .then(result => {
//         console.log(result);
//       })
//       .then(() => {
//         console.log("ay");
//       });
//   };
//   console.log("Tester");
// }; 

export const addBackgroundImg = (imgSrc, opacity, addImage) => {
  addImage(imgSrc, opacity);
};

export const drawBackgroundImg = (ctx, imgSrc, canvas, backgroundState) => {
  const { opacity, mode, images } = backgroundState;
  if (imgSrc !== "") {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgSrc;

    if (opacity < 1) {

      const sortedImgs = images.sort((a,b) => b.opacity-a.opacity);
      console.log(sortedImgs)
      sortedImgs.forEach(loadedImg => {
        const newLoadedImg = new Image();
        newLoadedImg.crossOrigin = "Anonymous";
        newLoadedImg.src = loadedImg.src;
        
        newLoadedImg.onload = function() {
        if(loadedImg.opacity === 1) {
          let drawX = canvas.width / 2 - newLoadedImg.width / 2;
          let drawY = canvas.height / 2 - newLoadedImg.height / 2;
            ctx.save();
            ctx.globalAlpha = loadedImg.opacity;
            ctx.drawImage(newLoadedImg, drawX, drawY);
            ctx.restore();
        } else {
          let drawX = canvas.width / 2 - newLoadedImg.width / 2;
          let drawY = canvas.height / 2 - newLoadedImg.height / 2;
            ctx.save();
            ctx.globalAlpha = loadedImg.opacity;
            ctx.drawImage(newLoadedImg, drawX, drawY);
            ctx.restore();
        }
       
        };
      });
    } else {
      img.onload = function() {
        pica
          .resize(img, canvas, {
            alpha: true
          })
          .then(result => console.log(result));
      };
    }

    img.onerror = function() {
      console.log("Background Image had an error loading");
    };

    console.log(opacity, mode.name, images);
  }
};

export const drawImage = (ctx, imgSrc, args, effect, canvas) => {
  if (imgSrc !== "") {
    console.log(imgSrc);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgSrc;
    img.onload = function() {
      if (img.naturalWidth > img.naturalHeight + 200) {
        if (args.width > 399) {
          canvas.width = args.width + 150;
        } else {
          canvas.width = args.width + 100;
        }

        pica
          .resize(img, canvas, {
            alpha: true
          })
          .then(result => {
            console.log(result);
          })
          .then(() => {
            console.log("ay");
          });
      } else {
        canvas.width = args.width;

        pica
          .resize(img, canvas, {
            alpha: true
          })
          .then(result => {
            console.log(result);
          })
          .then(() => {
            console.log("ay");
          });
      }
    };

    img.onerror = function() {
      console.log("Error loading logo image");
    };
  }
};

export const showGrid = (ctx, width, height) => {
  // Vertical referance line
  ctx.strokeStyle = "red";
  ctx.moveTo(width / 2, 20);
  ctx.lineTo(width / 2, height - 20);
  ctx.stroke();

  // Horizontal referance line
  ctx.strokeStyle = "red";
  ctx.moveTo(20, height / 2);
  ctx.lineTo(width - 20, height / 2);
  ctx.stroke();
};

export const drawRadialBackground = (
  ctx,
  gradiantArgs,
  gradientOne,
  gradientTwo
) => {
  const radialGradient = ctx.createRadialGradient(...gradiantArgs);
  ctx.fillStyle = radialGradient;

  radialGradient.addColorStop(0, gradientOne);
  radialGradient.addColorStop(1, gradientTwo);
  ctx.fill();
};

export const drawLinearBackground = (
  ctx,
  mode,
  gradiantArgs,
  gradientOne,
  gradientTwo,
  gradientThree
) => {
  if (mode.name === "Mode Four") {
    const linearGradient = ctx.createLinearGradient(...gradiantArgs);
    ctx.fillStyle = linearGradient;
    linearGradient.addColorStop(0, gradientOne);
    linearGradient.addColorStop(0.5, gradientTwo);
    linearGradient.addColorStop(1, gradientThree);
    ctx.fill();
  } else {
    const linearGradient = ctx.createLinearGradient(...gradiantArgs);
    ctx.fillStyle = linearGradient;
    linearGradient.addColorStop(0, gradientOne);
    linearGradient.addColorStop(1, gradientTwo);
    ctx.fill();
  }
};

export const drawText = (
  canvas,
  ctx,
  fontColor,
  fontFamily,
  songTitleVal,
  artistVal
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = fontColor;
  ctx.textAlign = "center";
  ctx.font = `normal bolder 58px ${fontFamily}`;
  ctx.fillText(songTitleVal, canvas.width / 2, 420, 300);
  ctx.font = `normal 42px ${fontFamily}`;
  ctx.fillText(artistVal, canvas.width / 2, 40, 140);
};

export const drawText3D = (
  canvas,
  ctx,
  fontColor,
  fontFamily,
  songTitleVal,
  artistVal
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let threeDColor = "rgba(0, 0, 0, 1)";
  ctx.textAlign = "center";
  ctx.font = `normal bolder 58px ${fontFamily}`;
  // Layer 1
  ctx.fillStyle = threeDColor;
  ctx.fillText(songTitleVal, canvas.width / 2 - 1, 419, 300);
  // Layer 2
  ctx.fillText(songTitleVal, canvas.width / 2 - 2, 418, 300);
  // Layer 3
  ctx.fillText(songTitleVal, canvas.width / 2 - 3, 417, 300);
  // Layer 4
  ctx.fillText(songTitleVal, canvas.width / 2 - 4, 416, 300);

  ctx.fillStyle = fontColor;
  ctx.fillText(songTitleVal, canvas.width / 2, 420, 300);

  ctx.font = `normal bolder 38px ${fontFamily}`;
  ctx.fillStyle = threeDColor;
  ctx.fillText(artistVal, canvas.width / 2 - 1, 39, 140);
  ctx.fillText(artistVal, canvas.width / 2 - 2, 38, 140);

  ctx.fillStyle = fontColor;
  ctx.fillText(artistVal, canvas.width / 2, 40, 140);
};

export const saveCanvasAsImage = (
  canvas,
  imgCanvas,
  txtCanvas,
  txtCtx,
  ctx,
  imgCtx,
  songTitle,
  sizeArgs
) => {
  console.log(sizeArgs);
  ctx.drawImage(imgCanvas, sizeArgs.left, sizeArgs.top);

  ctx.drawImage(txtCanvas, 0, 0);

  let e;

  const link = document.createElement("a");

  const dataURL = canvas.toDataURL("image/png");
  link.download = `${songTitle}-chosenmasters`;

  link.href = dataURL;

  e = new MouseEvent("click");

  link.dispatchEvent(e);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  imgCtx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
};
