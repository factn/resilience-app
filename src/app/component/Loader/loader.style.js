import styled from "styled-components";

export const StyledDiv = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3739b5;
  border-right: 16px solid #3739b5;
  border-bottom: 16px solid #e84a91;
  border-left: 16px solid #e84a91;
  width: 120px;
  height: 120px;
  margin-top: 200px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
