import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { Button } from './Button';
import { colors } from "../../../constants";

describe('Button Component', () => {
  function renderComponent(props) {
    return render(<Button {...props} />);
  }

  afterEach(cleanup);
  const props = {
    text: 'Batch',
    onClick: jest.fn()
  };

  it('Renders the text and render primary background color props', () => {
    const { getByText } = renderComponent(props);
    expect(getByText(props.text)).toBeTruthy();
    expect(getByText(props.text)).toHaveStyle(`background-color: ${colors.primary.background}`);
  });

  it('renders secondary button with its background color', () => {
    props.secondary = true;
    const { getByText } = renderComponent(props);
    expect(getByText(props.text)).toHaveStyle(`background-color: ${colors.secondary.background}`);
    expect(getByText(props.text)).toHaveStyle('color:#00000');
  });

  it('renders tertiary button with its background color', () => {
    props.tertiary = true;
    const { getByText } = renderComponent(props);
    expect(getByText(props.text)).toHaveStyle(`background-color: ${colors.tertiary.background}`);
  });

  it('disables button when prop is passed', () => {
    props.disabled = true;
    const { getByText } = renderComponent(props);
    expect(getByText(props.text)).toBeDisabled();
  });
});
