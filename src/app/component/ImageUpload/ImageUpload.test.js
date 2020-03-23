import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { ImageUpload } from '.';

describe('ImageUpload Component', () => {
  afterEach(cleanup);

  global.URL.createObjectURL = jest.fn(); // Mock

  it('renders camera icon and two buttons', () => {
    const { getByText, getByTestId } = render(<ImageUpload />);
    expect(getByTestId('cameraIcon')).toBeTruthy();
    expect(getByText(/Take Photo/)).toBeTruthy();
    expect(getByText(/Upload Photo/)).toBeTruthy();
  });

  it('Uploading file should show its preview', () => {
    const { getByTestId } = render(<ImageUpload />);
    const inputEl = getByTestId('uploadField');

    const file = new File(['(⌐□_□)'], 'example.png', {
      type: 'image/png'
    });

    Object.defineProperty(inputEl, 'files', {
      value: [file]
    });

    fireEvent.change(inputEl);

    expect(getByTestId('preview')).toBeTruthy();
  });
});
