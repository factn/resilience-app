import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import Page from './Page';
import {PageContainer} from './Page.style';

describe('Page Layout', () => {
  function renderComponent(props) {
    return render(<Page{...props} />);
  }

  afterEach(cleanup);

  it('Renders the page layout with a default header', () => {
    const { getByText } = renderComponent();
  });
});
