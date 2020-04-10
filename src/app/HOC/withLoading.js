import PropTypes from "prop-types";
import React from "react";
import { LinearProgress } from "@material-ui/core";

/**
 * Return an HOC wrapper
 * @param {Component} BaseComponent- use other loading component than CircularProgress
 * @return {Component} the enhanced component
 */
const withLoading = (BaseComponent) => {
  /**
   * Return an enhanced component that show loading abilities
   * @param {bool} isEmpty- if there is no data.
   * @param {bool} isLoaded - if isLoaded -> we have load in data
   * @param {string} isEmptyText- if isEmpty -> we will display why with isEmptyText
   * @param {Component} LoadingComponent- In case we want to use other loading component than CircularProgress
   * @return {Component} the enhanced component
   */
  const EnhancedComponent = ({
    isEmpty,
    isEmptyText,
    isLoaded,
    LoadingComponent,
    children,
    ...rest
  }) => {
    LoadingComponent = LoadingComponent ? LoadingComponent : LinearProgress;

    return (
      <BaseComponent {...rest}>
        {!isLoaded ? <LoadingComponent /> : isEmpty ? isEmptyText : children}
      </BaseComponent>
    );
  };
  EnhancedComponent.defaultProps = {
    isEmpty: false,
    isLoaded: true,
    LoadingComponent: LinearProgress,
  };

  EnhancedComponent.propTypes = {
    children: PropTypes.any,
    isEmpty: PropTypes.bool,
    isEmptyText: PropTypes.string,
    isLoaded: PropTypes.bool,
    LoadingComponent: PropTypes.oneOf(PropTypes.func, PropTypes.object)
  };
  return EnhancedComponent;
};

withLoading.propTypes = {
  BaseComponent: PropTypes.element,
};

export default withLoading;
