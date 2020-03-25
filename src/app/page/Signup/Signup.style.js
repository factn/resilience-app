import styled from "styled-components";

export const PaddedDiv = styled.div`
  padding: 16px 0;
`;

export const Header = styled.div`
  height: 100%;
  display: flex;
  padding: 0 25px;
`;

export const HeaderSection = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  font-family: Arimo;
  color: #150e60;
  > a {
    color: inherit;
    text-decoration: none;
  }
`;

export const FormWrapper = styled.div`
  background-color: #ffefef;
  padding: 30px;
`;

export const DescriptionText = styled.p`
  font-family: Arimo;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  text-align: left;
  color: #150e60;
`;

export const HeaderText = styled.h1`
  font-family: Arimo;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 24px;
  color: #150e60;
  text-align: left;
  margin: 0;
`;
