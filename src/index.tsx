import React from 'react';
import SelectorComponent, { SelectorProps } from './Selector';
import { Slider } from './Slider';

export const Selector = ({
  currentValue,
}: Pick<SelectorProps, 'currentValue'>) => (
  <SelectorComponent currentValue={currentValue} />
);

export { Test } from './Test';
export default Slider;
