import React, { useCallback, useEffect } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import styles from './styles';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import type { SliderState, SliderType } from '../types';
import { getSelectorLabelWidth } from 'src/utils';

export interface SelectorProps {
  /**
   * Current value of the selector.
   * @since 1.0.0
   */
  currentValue: number;
  /**
   * Range between Slider minimum and maximum values.
   * @since 1.0.0
   * Default value is `0`.
   */
  valueRange?: number;
  /**
   * End position of the Selector in the bar.
   * Default value is `0`.
   * @since 1.0.0
   */
  endPosition?: number;
  /**
   * Define the type of Slider.
   * Default value is `horizontal`.
   * @since 1.0.0
   */
  type?: SliderType;
  /**
   * Custom style for the Selector container.
   * @since 1.0.0
   */
  style?: ViewStyle;
  /**
   * Enables or disables Selector. If disabled the user won't be able to move the selector.
   * Default value is `false`.
   * @since 1.0.0
   */
  disabled?: boolean;
  /**
   * Invoked with the new value when the value changes.
   * @since 1.0.0
   */
  onValueChange?: (value: number) => void;
}

const Constants = {
  initialRange: 0,
  initialPosition: 0,
  label: {
    initialOpacity: 0,
    finalOpacity: 1,
    fadeOutDelay: 1000,
    fadeOutDuration: 1000,
  },
};

/**
 * Selector component for React Native.
 *
 * @version 1.0.0
 * @author [ProFUSION](https://github.com/profusion)
 */
const Selector = ({
  currentValue,
  valueRange = Constants.initialRange,
  endPosition = Constants.initialPosition,
  type = 'horizontal',
  style,
  disabled = false,
  onValueChange,
}: SelectorProps) => {
  const selectorState: SliderState = disabled ? 'disabled' : 'default';
  const currentStyles = styles[selectorState][type];

  const positionSingle = useSharedValue(currentValue);
  const labelOpacity = useSharedValue(Constants.label.initialOpacity);

  useEffect(() => {
    if (positionSingle.value > endPosition) {
      positionSingle.value = Constants.initialPosition;
    }
  }, [endPosition, positionSingle, type]);

  const panGesture = useCallback(
    (axis: 'x' | 'y') =>
      Gesture.Pan()
        .onUpdate((e: { y: number; x: number }) => {
          if (e[axis] > endPosition) {
            positionSingle.value = endPosition;
          } else if (e[axis] < Constants.initialPosition) {
            positionSingle.value = Constants.initialPosition;
          } else {
            positionSingle.value = e[axis];
          }
          labelOpacity.value = withSpring(Constants.label.finalOpacity);
          let newValue = Math.round(
            (valueRange * positionSingle.value) / endPosition
          );
          if (onValueChange) {
            runOnJS(onValueChange)(newValue);
          }
        })
        .onEnd(() => {
          labelOpacity.value = withDelay(
            Constants.label.fadeOutDelay,
            withTiming(Constants.label.initialOpacity, {
              duration: Constants.label.fadeOutDuration,
            })
          );
        }),
    [endPosition, labelOpacity, onValueChange, positionSingle, valueRange]
  );

  const animatedSelector = useAnimatedStyle(() => ({
    transform:
      type === 'horizontal'
        ? [{ translateX: positionSingle.value }]
        : [{ translateY: positionSingle.value }],
  }));

  const animatedLabel = useAnimatedStyle(() => ({
    transform:
      type === 'horizontal'
        ? [{ translateX: positionSingle.value }]
        : [{ translateY: positionSingle.value }],
    opacity: labelOpacity.value,
  }));

  const renderSelector = () => (
    <View style={currentStyles.container}>
      <Animated.View
        style={[
          {
            ...currentStyles.labelContainer,
            width: getSelectorLabelWidth(currentValue),
          },
          animatedLabel,
        ]}
      >
        <Text style={currentStyles.labelText}>{currentValue}</Text>
      </Animated.View>
      <Animated.View
        style={[{ ...currentStyles.circle, ...style }, animatedSelector]}
      />
    </View>
  );

  return (
    <>
      {disabled ? (
        <GestureDetector
          gesture={panGesture(type === 'horizontal' ? 'x' : 'y')}
        >
          {renderSelector()}
        </GestureDetector>
      ) : (
        renderSelector()
      )}
    </>
  );
};

export default Selector;
