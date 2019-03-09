export const testerDraw = (canvas, ctx, width, height) => {
  console.log("Tester");
};

export const drawImage = (ctx, imgSrc, args, effect) => {
  if (imgSrc !== "") {
    const img = new Image();
    img.src = imgSrc;
    switch (effect) {
      case "none":
        img.onload = function() {
          ctx.drawImage(img, ...args);
        };
        break;
      case "neon":
        img.onload = function() {
          ctx.drawImage(img, ...args);
          const imageData = ctx.getImageData(...args);
          for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 0; // Red
          }
          const filterArgs = [args[0], args[1]];

          ctx.putImageData(imageData, ...filterArgs);
        };
        break;
      case "negative":
        img.onload = function() {
          ctx.drawImage(img, ...args);
          const imageData = ctx.getImageData(...args);
          for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 255 - imageData.data[i]; // Red
            imageData.data[i + 1] = 255 - imageData.data[i + 1]; // Green
            imageData.data[i + 2] = 255 - imageData.data[i + 2]; // Blue
          }
          const filterArgs = [args[0], args[1]];

          ctx.putImageData(imageData, ...filterArgs);
        };
        break;
      case "sinCity":
        img.onload = function() {
          ctx.drawImage(img, ...args);
          const imageData = ctx.getImageData(...args);
          for (let i = 0; i < imageData.data.length; i += 4) {
            const average =
              imageData.data[i] +
              imageData.data[i + 1] +
              imageData.data[i + 2] / 3;
            imageData.data[i] = average; // Red
            imageData.data[i + 1] = average; // Green
            imageData.data[i + 2] = average; // Blue
          }
          const filterArgs = [args[0], args[1]];

          ctx.putImageData(imageData, ...filterArgs);
        };
        break;
      default:
        img.onload = function() {
          ctx.drawImage(img, ...args);
        };
    }
    img.onerror = function() {
      console.log("Error loading image");
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
  gradiantArgs,
  gradientOne,
  gradientTwo
) => {
  const linearGradient = ctx.createLinearGradient(...gradiantArgs);
  ctx.fillStyle = linearGradient;
  linearGradient.addColorStop(0, gradientOne);
  linearGradient.addColorStop(1, gradientTwo);
  ctx.fill();
};

export const drawText = (
  ctx,
  fontColor,
  fontFamily,
  songTitleVal,
  artistVal
) => {
  ctx.fillStyle = fontColor;
  ctx.strokeStyle = fontColor;

  ctx.font = `normal bolder 54px ${fontFamily}`;
  ctx.fillText(songTitleVal, 20, 50, 300);
  ctx.font = `normal bolder 38px ${fontFamily}`;
  ctx.strokeText(artistVal, 180, 320, 140);
};

export const drawText3D = (
  ctx,
  fontColor,
  fontFamily,
  songTitleVal,
  artistVal
) => {
  let threeDColor = "rgba(0, 0, 0, 1)";

  ctx.font = `normal bolder 54px ${fontFamily}`;
  // Layer 1
  ctx.fillStyle = threeDColor;
  ctx.fillText(songTitleVal, 19, 49, 300);
  // Layer 2
  ctx.fillText(songTitleVal, 18, 48, 300);
  // Layer 3
  ctx.fillText(songTitleVal, 17, 47, 300);
  // Layer 4
  ctx.fillText(songTitleVal, 16, 46, 300);

  ctx.fillStyle = fontColor;
  ctx.fillText(songTitleVal, 20, 50, 300);

  ctx.font = `normal bolder 38px ${fontFamily}`;
  ctx.strokeStyle = threeDColor;
  ctx.strokeText(artistVal, 179, 319, 140);
  ctx.strokeText(artistVal, 178, 318, 140);

  ctx.strokeStyle = fontColor;
  ctx.strokeText(artistVal, 180, 320, 140);
};

export const saveCanvasAsImage = (canvas, songTitle) => {
  let e;

  const link = document.createElement("a");

  const dataURL = canvas.toDataURL("image/png");
  link.download = `${songTitle}-chosenmasters`;

  link.href = dataURL;

  e = new MouseEvent("click");

  link.dispatchEvent(e);

  // window.location.href = dataURL;
};
