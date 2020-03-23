import React from "react";
import PropTypes from 'prop-types';
import {PageContainer} from './Page.style'
import Appbar from '../Appbar'

const Page = ({appbar ,children}) => {
  return (
    <PageContainer role="main">
        {appbar?appbar:<Appbar></Appbar>}
        {children}
    </PageContainer>
  );
};

Page.propTypes = {
    appbar: PropTypes.element,
    children: PropTypes.any
}
export default Page;
