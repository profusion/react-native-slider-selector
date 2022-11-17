import type { TextStyle, ViewStyle } from 'react-native';
import type { SliderState, SliderType } from '../types';

const Constants = {
  size: 20,
  borderWidth: 2,
  radius: 50,
  disabledOpacity: 0.4,
  label: {
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginHorizontal: -35,
    marginVertical: 25,
  },
};

type BaseStyles = {
  container: ViewStyle;
  labelContainer: ViewStyle;
  labelText: TextStyle;
  circle: ViewStyle;
};

type StylesStructure = {
  [S in SliderState]: {
    [T in SliderType]: BaseStyles;
  };
};

const commonStyles: BaseStyles = {
  container: {
    position: 'relative',
    flex: 1,
  },
  labelContainer: {
    position: 'absolute',
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    borderRadius: Constants.label.borderRadius,
    paddingHorizontal: Constants.label.paddingHorizontal,
    paddingVertical: Constants.label.paddingVertical,
  },
  labelText: {
    color: 'gray',
    textAlign: 'center',
  },
  circle: {
    backgroundColor: 'white',
    borderRadius: Constants.radius,
    borderWidth: Constants.borderWidth,
    height: Constants.size,
    width: Constants.size,
    zIndex: 10,
  },
};

const horizontalStyles: BaseStyles = {
  container: {
    ...commonStyles.container,
    justifyContent: 'center',
  },
  labelContainer: {
    ...commonStyles.labelContainer,
    top: Constants.label.marginHorizontal,
  },
  labelText: {
    ...commonStyles.labelText,
  },
  circle: {
    ...commonStyles.circle,
  },
};

const verticalStyles: BaseStyles = {
  container: {
    ...commonStyles.container,
  },
  labelContainer: {
    ...commonStyles.labelContainer,
    left: Constants.label.marginVertical,
  },
  labelText: {
    ...commonStyles.labelText,
  },
  circle: {
    ...commonStyles.circle,
    alignSelf: 'center',
  },
};

const disabledVerticalStyles: BaseStyles = {
  container: {
    ...verticalStyles.container,
  },
  labelContainer: {
    ...verticalStyles.labelContainer,
    opacity: Constants.disabledOpacity,
  },
  labelText: {
    ...verticalStyles.labelText,
    opacity: Constants.disabledOpacity,
  },
  circle: {
    ...verticalStyles.circle,
    opacity: Constants.disabledOpacity,
  },
};

const disabledHorizontalStyles: BaseStyles = {
  container: {
    ...horizontalStyles.container,
  },
  labelContainer: {
    ...horizontalStyles.labelContainer,
    opacity: Constants.disabledOpacity,
  },
  labelText: {
    ...horizontalStyles.labelText,
    opacity: Constants.disabledOpacity,
  },
  circle: {
    ...horizontalStyles.circle,
    opacity: Constants.disabledOpacity,
  },
};

const styles: StylesStructure = {
  default: {
    horizontal: {
      ...horizontalStyles,
    },
    vertical: {
      ...verticalStyles,
    },
  },
  disabled: {
    horizontal: {
      ...disabledHorizontalStyles,
    },
    vertical: {
      ...disabledVerticalStyles,
    },
  },
};

export default styles;
