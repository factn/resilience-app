import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ClosePreviewIcon } from "../../../img/ClosePreview.svg";
import { thumb, icon, img } from "./ImageUpload.style";

/**
 * Component for displaying image preview
 *
 * @component
 */
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

ImagePreview.propTypes = {
  file: PropTypes.object.isRequired,
  preview: PropTypes.string,
  removeImage: PropTypes.func.isRequired,
};
export default ImagePreview;
