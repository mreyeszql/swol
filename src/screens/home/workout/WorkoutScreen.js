import React from 'react';
import { View, Text, Button } from 'react-native';

const WorkoutScreen = ({ route, navigation }) => {
  const { name, id, exercises } = route.params;

  const startWorkout = () => {
    navigation.navigate('Exercises', exercises.items);
  };

  return (
    <View>
      <Text>Workout: {name}</Text>
      <Text>Exercises:</Text>
      {exercises.items.map((exercise) => (
        <Text key={exercise.exercise.id}>{exercise.exercise.name}</Text>
      ))}
      <Button title="Start Workout" onPress={startWorkout} />
    </View>
  );
};

export default WorkoutScreen;
