import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "100%",
    height: "32vh",
  },
  image: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    borderRadius: theme.spacing(0.2),
  },
}));

/**
 * Component to select an image and show a preview
 *
 * @component
 */
const MissionDeliveredImagePicker = ({ defaultImage, setCurrentImage }) => {
  const allowedFileTypes = ["image/png", "image/x-png", "image/jpeg", "image/jpg"];
  const classes = useStyles();
  const fileUpload = useRef();
  const [imagePreview, setImagePreview] = useState(defaultImage);

  function imageChanged(image) {
    if (allowedFileTypes.includes(image.type)) {
      //check if selected file is an image
      setCurrentImage(image);
      setImagePreview(URL.createObjectURL(image));
    }
  }

  return (
    <>
      <Box align="center" className={classes.imageContainer}>
        <img
          src={imagePreview}
          alt={imagePreview.name}
          className={classes.image}
          onClick={() => fileUpload.current.click()}
        />
        <input
          onChange={({ target }) => target.files.length && imageChanged(target.files[0])}
          data-testid="uploadField"
          ref={fileUpload}
          type="file"
          accept={allowedFileTypes}
          hidden
        />
      </Box>
    </>
  );
};

MissionDeliveredImagePicker.propTypes = {
  /**
   * Default image for the preview
   */
  defaultImage: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.string.isRequired]),
  /**
   * Handler function for a new image
   */
  setCurrentImage: PropTypes.func.isRequired,
};

export default MissionDeliveredImagePicker;
