import styled from "styled-components";
import { extractStyle } from "../../../theme.js";

const propsBgColor = (props) =>
  props.template === "pink" ? props.theme.color.pink : props.theme.color.white;

export const PageContainer = styled.div`
  ${(props) => extractStyle(props, "theme.typography.body1")}
  width: 600px;
  flex-grow: 1;
  margin: 0 auto;
  padding-bottom: 50px;
  box-sizing: border-box;
  background-color: ${propsBgColor};
`;
