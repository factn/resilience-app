import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import ImageUpload from "../../component/ImageUpload";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

export const Upload = styled(ImageUpload)`
  justify-content: center;
  align-content: center;
  width: 100%;
  background-color: #c197d2;
  margin-top: 20px;
  height: 300px;
`;
