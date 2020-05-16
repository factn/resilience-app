import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

import { ReactComponent as CameraIcon } from "../../../img/camera.svg";
import Button from "../Button";
import ImagePreview from "./ImagePreview";
import { Actions, Container, StyledIcon } from "./ImageUpload.style";

/**
 * Component for uploading images
 *
 * @component
 */
export function ImageUpload({ styles, getFile = () => null, ...props }) {
  const fileUpload = useRef();
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(props.confirmationImage);

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
    <Container {...props}>
      <StyledIcon>
        {file ? (
          <ImagePreview removeImage={removeImage} preview={preview} file={file} />
        ) : (
          <CameraIcon data-testid="cameraIcon" />
        )}
      </StyledIcon>
      <Actions>
        <Button onClick={onTakeImage} text="Take Photo" />
        <Button onClick={onTakeImage} text="Upload Photo" color="secondary" />
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
