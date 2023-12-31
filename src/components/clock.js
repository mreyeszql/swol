import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const TimerClock = ({ n }) => {
    // Calculate the angle for the circle border
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const sector = ((n % 60) === 0) ? circumference : (circumference * (n % 60) / 60);
  
    return (
      <View style={styles.container}>
        <Svg height="100%" width="100%" style={{ transform: [{scaleY: -1}, {rotate: '90deg'}]}}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="white" // Change the color as needed
            strokeWidth="1" // Change the width as needed
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - sector}
          />
        </Svg>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  }); 
  
export default TimerClock;