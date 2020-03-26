import styled from "styled-components";
import ImageUpload from "../../component/ImageUpload";

export const Container = styled.div`
  background: #ffefef;
`;
export const Header = styled.div`
  text-align: start;
  padding-left: 25px;
  padding-top: 28px;
  font-size: 16px;
  font-weight: 900;
  color: #150e60;
`;

export const SubText = styled.p`
  color: #150e60;
  font-family: Open-Sans;
  font-size: 18px;
  text-align: start;
  margin: 0;
  padding-left: 25px;
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
