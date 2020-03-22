import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import Box from '@material-ui/core/Box';

import {muiTheme} from 'storybook-addon-material-ui';

import customTheme from '../theme'



storiesOf('Text', module)
    .addDecorator(muiTheme([customTheme]))
    .add('Text', () => (
        <React.Fragment>
        <Box fontWeight='bold' fontSize='16px' color='primary'>We are using this as header</Box>

        </React.Fragment>
    ));
