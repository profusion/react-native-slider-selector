import 'react-native-gesture-handler';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Selector, { SelectorProps } from '../Selector';
import styles from './styles';
import type { SelectorMode, SliderState, SliderType } from '../types';

export interface SliderProps {
  /**
   * Custom style for the Slider bar.
   * @since 1.0.0
   */
  barStyle?: ViewStyle;
  /**
   * Enables or disables Slider. If disabled the user won't be able to move the selector.
   * Default value is `false`.
   * @since 1.0.0
   */
  disabled?: boolean;
  /**
   * Maximum value of the Slider range.
   * Default value is `100`.
   * @since 1.0.0
   */
  maximumValue?: number;
  /**
   * Minimum value of the Slider range.
   * Default value is `0`.
   * @since 1.0.0
   */
  minimumValue?: number;
  /**
   * Invoked with the new value when the value changes.
   * @since 1.0.0
   */
  onValueChange?: (value: number) => void;
  /**
   * Rendered to indicate the current value or pair of values.
   * @since 1.0.0
   */
  SelectorComponent?: FC<SelectorProps>;
  /**
   * Define the amount of selectors.
   * Default value is `single`.
   * @since 1.0.0
   */
  selectorMode?: SelectorMode;
  /**
   * Define the type of Slider.
   * Default value is `horizontal`.
   * @since 1.0.0
   */
  type?: SliderType;
}

const Constants = {
  slider: { defaultMin: 0, defaultMax: 100 },
  bar: { initialPosition: 0 },
};

/**
 * Slider component for React Native.
 *
 * @version 1.0.0
 * @author [ProFUSION](https://github.com/profusion)
 */
export const Slider = ({
  barStyle,
  disabled = false,
  maximumValue = Constants.slider.defaultMax,
  minimumValue = Constants.slider.defaultMin,
  onValueChange,
  SelectorComponent,
  selectorMode = 'single',
  type = 'horizontal',
}: SliderProps): JSX.Element => {
  const sliderState: SliderState = disabled ? 'disabled' : 'default';
  const currentStyles = styles[sliderState][type];
  const [currentValueSingle, setCurrentValueSingle] = useState(minimumValue);
  const [currentValueDouble, setCurrentValueDouble] = useState(minimumValue);
  const [endPosition, setEndPosition] = useState(Constants.bar.initialPosition);
  const valueRange = useMemo(
    () => maximumValue - minimumValue,
    [maximumValue, minimumValue]
  );

  const SelectorToShow = useCallback(
    ({ ...props }: SelectorProps) => (
      <>
        {SelectorComponent ? (
          <SelectorComponent {...props} />
        ) : (
          <Selector {...props} />
        )}
      </>
    ),
    [SelectorComponent]
  );

  const handleOnValueChange = useCallback(
    (updateFunction: (value: number) => void) => {
      onValueChange;
      return updateFunction;
    },
    [onValueChange]
  );

  return (
    <GestureHandlerRootView style={currentStyles.container}>
      <View
        style={{ ...currentStyles.bar, ...barStyle }}
        onLayout={(event) => {
          let { height, width } = event.nativeEvent.layout;
          setEndPosition(type === 'horizontal' ? width : height);
          setCurrentValueDouble(type === 'horizontal' ? width : height);
        }}
      >
        <SelectorToShow
          currentValue={currentValueSingle}
          onValueChange={handleOnValueChange(setCurrentValueSingle)}
          valueRange={valueRange}
          endPosition={endPosition}
          type={type}
          disabled={disabled}
        />
        {selectorMode === 'double' && (
          <SelectorToShow
            currentValue={currentValueDouble}
            onValueChange={handleOnValueChange(setCurrentValueDouble)}
            valueRange={valueRange}
            endPosition={endPosition}
            type={type}
            disabled={disabled}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};
