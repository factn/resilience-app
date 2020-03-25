import styled from "styled-components";

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 25px;
  padding: 12px;
  flex-grow: 1;
  font-family: Arimo;
  background-color: white;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  img {
    text-align: center;
  }
  h2 {
    text-align: center;
  }
  p {
    text-align: center;
  }
  h5 {
    padding-bottom: 2%;
    text-align: center;
    border-bottom: 1px solid grey;
    cursor: pointer;
  }
  h5:hover {
    color: grey;
  }
  .side-by-side {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 13%;
  }
  h3 {
    text-align: center;
  }
`;
