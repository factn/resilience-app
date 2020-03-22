import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import Box from '@material-ui/core/Box';

import {muiTheme} from 'storybook-addon-material-ui';

import customTheme from '../theme'



storiesOf('Button', module)
    .addDecorator(muiTheme([customTheme]))
    .add('Title', () => (
        <React.Fragment>
        <Box textAlign="left" fontWeight='bold' >Bold text here</Box>
        <Box textAlign="center">…</Box>
        <Box textAlign="right">…</Box>
        </React.Fragment>
    ))
    .add('Right', () => (
        <Box textAlign="right">…</Box>
    ))
