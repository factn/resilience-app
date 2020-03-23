import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ClosePreviewIcon } from '../../../img/ClosePreview.svg';

function ImagePreview({ file, preview, removeImage }) {
  return (
    <div data-testid="preview" style={thumb}>
      <div style={icon}>
        <ClosePreviewIcon onClick={removeImage} />
      </div>
      <img style={img} src={preview} alt={file.name} />
    </div>
  );
}

const thumb = {
  display: 'inline-flex',
  borderRadius: '1rem',
  border: '.1rem solid #999',
  width: '6rem',
  height: '6rem',
  boxSizing: 'border-box',
  cursor: 'pointer',
  position: 'relative'
};

const img = {
  display: 'block',
  borderRadius: '1rem',
  width: '99.9%',
  height: '99.9%',
  objectFit: 'cover'
};

const icon = {
  position: 'absolute',
  top: '-1.5rem',
  right: '-1.5rem'
};

ImagePreview.propTypes = {
  file: PropTypes.object.isRequired,
  preview: PropTypes.string,
  removeImage: PropTypes.func.isRequired
};

export default ImagePreview;
