import React from 'react';
import PropTypes from 'prop-types';
import StyledButton, { StyledIcon } from './Button.style';

export function Button({ text, icon, iconPosition, children, ...props }) {
  return (
    <StyledButton {...props}>
      {icon ? (
        <React.Fragment>
          <StyledIcon text={text} iconPosition={iconPosition}>
            {icon}
          </StyledIcon>
          {text}
        </React.Fragment>
      ) : (
        text
      )}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.any,
  text: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  size: PropTypes.string,
  iconPosition: PropTypes.string,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  rounded: PropTypes.bool,
  icon: PropTypes.element
};

Button.defaultProps = {
  disabled: false,
  size: 'default',
  primary: true,
  iconPosition: 'left'
};

export default Button;
