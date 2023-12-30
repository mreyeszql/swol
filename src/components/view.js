import React from 'react';
import { SafeAreaView as RNSafeAreaView, StyleSheet } from 'react-native';

const SafeAreaView = ({ children }) => {
  return <RNSafeAreaView style={styles.container}>{children}</RNSafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default SafeAreaView;
