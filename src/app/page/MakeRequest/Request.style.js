import styled from "styled-components";
import ImageUpload from "../../component/ImageUpload";

export const Container = styled.div`
  max-width: 600;
  background: #ffefef;
`;
export const Header = styled.p`
  text-align: start;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 900;
  color: #150e60;
`;

export const SubText = styled.p`
  text-align: start;
  margin: 0;
  padding-left: 15px;
  font-size: 14px;
`;

export const Upload = styled(ImageUpload)`
  width: 80%;
  margin-top: 20px;
  height: 300px;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 10px;
`;
