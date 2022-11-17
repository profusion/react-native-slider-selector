import React from 'react';

import { SafeAreaView, StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Slider, { Test } from 'react-native-slider-selector';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/*<Slider />*/}
      <Test />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
