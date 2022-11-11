import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-slider-selector' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type SliderSelectorProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'SliderSelectorView';

export const SliderSelectorView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<SliderSelectorProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
