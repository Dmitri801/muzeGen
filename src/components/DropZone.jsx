import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ addImageUrl, backgroundImage }) {
  const disabled = backgroundImage && backgroundImage.images.length === 3;
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const binaryStr = fileReader.result;
      addImageUrl(binaryStr, backgroundImage);
    };

    acceptedFiles.forEach(file => fileReader.readAsDataURL(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled
  });

  return (
    <div className="dropZone" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : backgroundImage ? (
        <p>Drag 'n' drop , or click to add your background image</p>
      ) : (
        <p>Drag 'n' drop , or click to add your logo</p>
      )}
      {disabled && backgroundImage && <div className="disabledDropzone">X</div>}
    </div>
  );
}

export default Dropzone;
