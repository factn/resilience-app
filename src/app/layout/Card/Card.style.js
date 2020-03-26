import styled from "styled-components";

const propsBoxShadow = (props) =>
  props.flat
    ? ""
    : " 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);";

const propsBgColor = (props) =>
  props.template === "pink" ? props.theme.color.pink : props.theme.color.white;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 25px;
  padding: 12px;
  flex-grow: 1;
  font-family: Arimo;
  box-shadow: ${propsBoxShadow};
  background-color: ${propsBgColor};
  img {
    text-align: center;
  }
  .side-by-side {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 13%;
  }
`;
