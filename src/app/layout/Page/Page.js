import React from "react";
import PropTypes from "prop-types";
import { PageContainer } from "./Page.style";
import Appbar from "../Appbar";

const Page = ({ appbar, children }) => {
  return (
    <React.Fragment>
      <Appbar>{appbar}</Appbar>
      <PageContainer role="main">{children}</PageContainer>
    </React.Fragment>
  );
};

Page.propTypes = {
  appbar: PropTypes.element,
  children: PropTypes.any,
};
export default Page;
