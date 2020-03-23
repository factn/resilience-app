import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as CameraIcon } from "../../../img/camera.svg";
import ImagePreview from "./ImagePreview";
import Button from "../Button/Button";
import { Container, StyledIcon, Actions } from "./ImageUpload.style";

export function ImageUpload({ styles, getFile = () => null }) {
  const fileUpload = useRef();
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null);

  function handleFileChange({ target }) {
    target.files.length && setFile(target.files[0]);
    target.files.length && getFile(target.files[0]);
    target.files.length && setPreview(URL.createObjectURL(target.files[0])); // Sanity check to only call createObjectURL when there is file
  }

  function removeImage() {
    setFile(null);
    getFile(null);
    setPreview(null);
  }

  function onTakeImage() {
    fileUpload.current.click();
  }

  return (
    <Container style={styles}>
      <StyledIcon>
        {file ? (
          <ImagePreview
            removeImage={removeImage}
            preview={preview}
            file={file}
          />
        ) : (
          <CameraIcon data-testid="cameraIcon" />
        )}
      </StyledIcon>
      <Actions>
        <Button onClick={onTakeImage} text="Take Photo" />
        <Button tertiary onClick={onTakeImage} text="Upload Photo" />
      </Actions>
      <input
        onChange={handleFileChange}
        onClick={onTakeImage}
        data-testid="uploadField"
        ref={fileUpload}
        type="file"
        accept="image/x-png,image/gif,image/jpeg capture=camera"
        hidden
      />
    </Container>
  );
}

ImageUpload.propTypes = {
  styles: PropTypes.object,
  getFile: PropTypes.func,
};

export default ImageUpload;
