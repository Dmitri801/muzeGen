import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ addImageUrl }) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const binaryStr = fileReader.result;
      addImageUrl(binaryStr);
    };

    acceptedFiles.forEach(file => fileReader.readAsDataURL(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="dropZone" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop , or click to add your logo</p>
      )}
    </div>
  );
}

export default Dropzone;
