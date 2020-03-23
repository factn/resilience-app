import React from "react";
import PropTypes from 'prop-types';
import {PageContainer} from './Page.style'
import Appbar from '../Appbar'

const Page = ({ header, footer, children}) => {
  return (
    <PageContainer>
        <Appbar></Appbar>
      {children}
    </PageContainer>
  );
};

Page.propTypes = {
    header: PropTypes.element,
    footer: PropTypes.element,
    children: PropTypes.any
}
export default Page;
