import "react-image-crop/dist/ReactCrop.css";

import React from "react";
import ReactCrop from "react-image-crop";

class PhotoSelection extends React.Component {
  static defaultProps = {
    backgroundColor: "grey",
    mimeTypes: "image/jpeg,image/png",
    onCropComplete: () => {},
    getCroppedImage: () => {},
    onFileLoad: () => {},
    onImageLoad: () => {},
    onBeforeFileLoad: () => {},
    label: "Choose a file",
    labelStyle: {
      fontSize: "1.25em",
      fontWeight: "700",
      color: "black",
      display: "inline-block",
      fontFamily: "sans-serif",
      cursor: "pointer",
    },
    borderStyle: {
      border: "2px solid #979797",
      borderStyle: "dashed",
      borderRadius: "8px",
      textAlign: "center",
    },
  };

  constructor(props) {
    super(props);
    const loaderId = this.generateHash("avatar_loader");
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      scale: 1,
      loaderId,
      lastMouseY: 0,
      crop: {
        unit: "%",
        width: 30,
        aspect: 1 / 1,
      },
      showLoader: !(this.props.src || this.props.img),
    };
  }

  get loaderId() {
    return this.state.loaderId;
  }

  generateHash(prefix) {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return prefix + "-" + s4() + "-" + s4() + "-" + s4();
  }

  onFileLoadCallback(file) {
    this.props.onFileLoad(file);
  }

  onBeforeFileLoadCallback(elem) {
    this.props.onBeforeFileLoad(elem);
  }

  componentDidMount() {
    if (this.state.showLoader) return;

    const image = this.props.img || new Image();
    if (!this.props.img && this.props.src) image.src = this.props.src;
    this.setState({ image });
  }

  onFileLoad(e) {
    e.preventDefault();

    this.onBeforeFileLoadCallback(e);
    if (!e.target.value) return;

    let reader = new FileReader();
    let file = e.target.files[0];

    this.onFileLoadCallback(file);

    const image = new Image();
    const ref = this;
    reader.onloadend = () => {
      image.src = reader.result;

      ref.setState({ image, file, showLoader: false });
    };
    reader.readAsDataURL(file);
  }

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop: percentCrop });
  };

  onCropComplete = (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImg = this.getCroppedImg(this.imageRef, crop);
      this.props.selectAction(croppedImg);
    }
  };

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    const mimeType = "mimeType" in image ? image.mimeType : "image/jpeg";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    return canvas.toDataURL(mimeType);
  }

  render() {
    const { height, width } = this.props;

    const style = {
      display: "flex",
      justifyContent: "center",
      backgroundColor: this.state.backgroundColor,
      width: width || this.state.imgWidth,
      position: "relative",
    };

    const inputStyle = {
      width: 0.1,
      height: 0.1,
      opacity: 0,
      overflow: "hidden",
      position: "absolute",
      zIndex: -1,
    };

    const label = this.props.label;

    const labelStyle = { ...this.props.labelStyle, ...{ lineHeight: (height || 200) + "px" } };

    const borderStyle = {
      ...this.props.borderStyle,
      ...{
        width: width || 200,
        height: height || 200,
      },
    };

    return (
      <div>
        {this.state.showLoader ? (
          <div style={borderStyle}>
            <input
              onChange={(e) => this.onFileLoad(e)}
              name={this.loaderId}
              type="file"
              id={this.loaderId}
              style={inputStyle}
              accept={this.props.mimeTypes}
            />
            <label htmlFor={this.loaderId} style={labelStyle}>
              {label}
            </label>
          </div>
        ) : (
          <ReactCrop
            style={style}
            src={this.state.image.src}
            crop={this.state.crop}
            onChange={this.onCropChange}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            circularCrop="true"
          />
        )}
      </div>
    );
  }
}

export default PhotoSelection;
