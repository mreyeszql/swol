import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Text = ({ children, style }) => {
  return <RNText style={[styles.text, style]}>{children}</RNText>;
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-Light'
  },
});

export default Text;
