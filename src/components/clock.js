import React, { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, useDerivedValue, withSpring, runOnJS } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const PressClock = ({ theta, callback }) => {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
  
    const animatedProps = useAnimatedProps(() => {
        return {
        strokeDashoffset: withTiming(theta.value * radius, {
            duration: 1500,
        }, (finished) => {
            if (finished && theta.value === 0) {
                runOnJS(callback)();
            }
        }),
        };
    });
    
    return (
      <View style={styles.container}>
        <Svg height="100%" width="100%" style={{ transform: [{scaleY: -1}, {rotate: '90deg'}]}}>
          <AnimatedCircle
            animatedProps={animatedProps}
            cx="50%"
            cy="50%"
            r={radius}
            stroke="white"
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={2 * Math.PI * (radius * 0.5)}
          />
        </Svg>
        <Svg height="100%" width="100%" style={{ position: 'absolute'}}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="white" // Change the color as needed
            strokeWidth="0.25" // Change the width as needed
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={0}
          />
        </Svg>
      </View>
    );
}

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
            strokeWidth="2.5" // Change the width as needed
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - sector}
          />
        </Svg>
        <Svg height="100%" width="100%" style={{ position: 'absolute'}}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="white" // Change the color as needed
            strokeWidth="0.25" // Change the width as needed
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
          />
        </Svg>
      </View>
    );
  };

  
const PlaceholderClock = () => {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    return (
        <View style={styles.container}>
            <Svg height="100%" width="100%">
                <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="white" // Change the color as needed
                strokeWidth="0.25" // Change the width as needed
                fill="transparent"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={0}
                />
            </Svg>
        </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  }); 

export { TimerClock, PressClock, PlaceholderClock };
