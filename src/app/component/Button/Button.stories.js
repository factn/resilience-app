import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';
import Icon from '../../../img/success';

storiesOf('Components | Button', module)
  .add('Button - Primary', () => <Button primary onClick={action('Primary  button clicked')} text="Primary" />)
  .add('Button - Secondary', () => <Button text="Secondary Button" secondary />)
  .add('Button - Tertiary', () => <Button text="Tertiary Button" tertiary />)
  .add('Button - Disabled', () => <Button text="Disabled Button" disabled />)
  .add('Button - Long', () => <Button text="Long Button" size="lg" />)
  .add('Button - Rounded Primary', () => <Button text="Rounded Button Primary" rounded />)
  .add('Button - Rounded Secondary', () => <Button text="Rounded Button Seconday" rounded secondary />)
  .add('Button - Rounded Tertiary', () => <Button text="Rounded Button Tertiary" rounded tertiary />)
  .add('Icon Right Button', () => <Button text="Icon Right Button" iconPosition="right" icon={<Icon />} />)
  .add('Icon Left Button', () => <Button secondary text="Icon Left Button" icon={<Icon />} />)
  .add('Icon Only Button', () => <Button secondary icon={<Icon />} />)
  .add('Text as children', () => <Button>Children Text</Button>);
