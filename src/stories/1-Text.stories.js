import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import Button from '@material-ui/core/Button';

import {muiTheme} from 'storybook-addon-material-ui';

import customTheme from '../theme'



storiesOf('Text', module)
    .addDecorator(muiTheme([customTheme]))
    .add('primary button', () => (
        <Button color='primary' variant="contained">Default</Button>
    ));
