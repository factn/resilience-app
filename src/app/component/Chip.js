import Chip from "@material-ui/core/Chip";
import styled from "styled-components";

const StyledChip = styled(Chip)`
  background: ${(props) => props.theme.color.purple};
  color: white;
  border-radius: 5px;
  margin: 4px;
`;

export default StyledChip;
