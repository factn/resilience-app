import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as CameraIcon } from '../../../img/camera.svg';
import ImagePreview from './ImagePreview';
import Button from '../Button/Button';

export function ImageUpload({ styles, getFile = () => null }) {
  const fileUpload = useRef();
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState(null);

  function handleFileChange({ target }) {
    setFile(target.files[0]);
    getFile(target.files[0]);
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
          <ImagePreview removeImage={removeImage} preview={preview} file={file} />
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

const Container = styled.div`
  text-align: center;
  height: 200px;
  border: 1px solid #6abffc;
  width: 300px;
  background: #fff;
`;

const StyledIcon = styled.div`
  padding-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Actions = styled.div`
  padding-top: 10%;
  display: flex;
  justify-content: space-around;
`;

ImageUpload.propTypes = {
  styles: PropTypes.object,
  getFile: PropTypes.func
};

export default ImageUpload;
