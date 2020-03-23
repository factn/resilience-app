import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  height: 200px;
  border: 1px solid #6abffc;
  width: 300px;
  background: #fff;
`;

export const StyledIcon = styled.div`
  padding-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const Actions = styled.div`
  padding-top: 10%;
  display: flex;
  justify-content: space-around;
`;

// ImagePreview Styles
export const thumb = {
  display: "inline-flex",
  borderRadius: "1rem",
  border: ".1rem solid #999",
  width: "6rem",
  height: "6rem",
  boxSizing: "border-box",
  cursor: "pointer",
  position: "relative",
};

export const img = {
  display: "block",
  borderRadius: "1rem",
  width: "99.9%",
  height: "99.9%",
  objectFit: "cover",
};

export const icon = {
  position: "absolute",
  top: "-1.5rem",
  right: "-1.5rem",
};
