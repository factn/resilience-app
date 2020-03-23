import React from 'react';
import MiniMap from './MiniMap'
import { storiesOf } from '@storybook/react';

storiesOf('Components | Minimap', module)
.add('MiniMap - small', () => <MiniMap size='small'/>)
.add('MiniMap - medium', () => <MiniMap size='medium'/>)
.add('MiniMap - large', () => <MiniMap size='large'/>)