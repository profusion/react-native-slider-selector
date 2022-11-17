import type { ViewStyle } from 'react-native';
import type { SliderState, SliderType } from '../types';

const Constants = {
  bar: {
    lenght: '100%',
    breadth: 2,
    borderRadius: 50,
  },
  disabledOpacity: 0.4,
};

type BaseStyles = {
  container: ViewStyle;
  bar: ViewStyle;
};

type StylesStructure = {
  [S in SliderState]: {
    [T in SliderType]: BaseStyles;
  };
};

const commonStyles: BaseStyles = {
  container: {
    flex: 1,
  },
  bar: {
    backgroundColor: 'black',
    borderRadius: Constants.bar.borderRadius,
  },
};

const horizontalStyles: BaseStyles = {
  container: {
    ...commonStyles.container,
  },
  bar: {
    ...commonStyles.bar,
    justifyContent: 'center',
    height: Constants.bar.breadth,
    width: Constants.bar.lenght,
  },
};

const verticalStyles: BaseStyles = {
  container: {
    ...commonStyles.container,
  },
  bar: {
    ...commonStyles.bar,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: Constants.bar.lenght,
    width: Constants.bar.breadth,
  },
};

const disabledVerticalStyles: BaseStyles = {
  container: {
    ...verticalStyles.container,
  },
  bar: {
    ...verticalStyles.bar,
    opacity: Constants.disabledOpacity,
  },
};

const disabledHorizontalStyles: BaseStyles = {
  container: {
    ...horizontalStyles.container,
  },
  bar: {
    ...horizontalStyles.bar,
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
