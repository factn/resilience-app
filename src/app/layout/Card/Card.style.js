import styled from "styled-components";
/**
 * Represents a Customised Card.
 * @param {object} props - Toggles Box Shadow.
 */
const propsBoxShadow = (props) => (props.flat ? "" : "0px 2px 4px rgba(0, 0, 0, 0.14);");
/**
 * Represents a Customised Card.
 * @param {object} props - Toggles Box Template Color.
 */
const propsBgColor = (props) =>
  props.template === "pink" ? props.theme.color.pink : props.theme.color.white;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 16px 24px;
  padding: 16px;
  flex-grow: 1;
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
