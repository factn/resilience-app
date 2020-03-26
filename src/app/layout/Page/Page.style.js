import styled from "styled-components";

const propsBgColor = (props) =>
  props.template === "pink" ? props.theme.color.pink : props.theme.color.white;

export const PageContainer = styled.div`
  width: 600px;
  flex-grow: 1;
  margin: 0 auto;
  padding-bottom: 50px;
  box-sizing: border-box;
  font-family: Arimo;
  background-color: ${propsBgColor};
`;
