import React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';

const WorkoutScreen = ({ route, navigation }) => {
  const { name, id, exercises, reps, sets, rests } = route.params;

  const startWorkout = () => {
    navigation.navigate('Exercises', { exercises: exercises.items, name, id, reps, sets, rests });
  };

  return (
    <SafeAreaView>
      <View style={styles.navigation}>
        <Button title="<" onPress={() => navigation.goBack()} />
      </View>
      <Text>Workout: {name}</Text>
      <Text>Exercises:</Text>
      {exercises.items.map((exercise) => (
        <Text key={exercise.exercise.id}>{exercise.exercise.name}</Text>
      ))}
      <Button title="Start Workout" onPress={startWorkout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navigation: {
      flexDirection: 'row',
      alignItems: 'center'
  }
});


export default WorkoutScreen;
