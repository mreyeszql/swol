import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'components/view';
import Text from 'components/text';
import LottieView from 'lottie-react-native';

const WorkoutScreen = ({ route, navigation }) => {
  const { name, id, exercises, reps, sets, rests, muscles } = route.params;

  const startWorkout = () => {
    navigation.navigate('Exercises', { exercises: exercises.items, name, id, reps, sets, rests });
  };

  return (
    <SafeAreaView>
      <View style={styles.navigation}>
        <View style={{paddingRight: 15}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 40, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>{name}</Text>
      </View>
      <View style={{paddingHorizontal: 28}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 28}}>
          <Text>20 MIN</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>Completed</Text>
            <Text style={{fontFamily: 'Inter-Bold'}}> 80 </Text>
            <Text>times</Text>
          </View>
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}}/>
        <View>
          <Text style={{fontFamily: 'Inter-Bold', fontSize: 22}}>Exercises</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: -4, paddingTop: 4}}>
          {exercises.items.map((exercise, index) => (
            <View key={index} style={{borderColor: 'white', borderWidth: 0.5, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, margin: 4}}>
              <Text style={{color: 'white', fontSize: 12, fontFamily: 'Inter-Light'}}>{exercise.exercise.name}</Text>
            </View>
           ))}
          </View>
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}}/>
        <View>
          <Text style={{fontFamily: 'Inter-Bold', fontSize: 22}}>Muscle Groups</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: -4, paddingTop: 4}}>
          {muscles.map((muscle, index) => (
            <View key={index} style={{borderColor: 'white', borderWidth: 0.5, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, margin: 4}}>
              <Text style={{color: 'white', fontSize: 12, fontFamily: 'Inter-Light'}}>{muscle}</Text>
            </View>
           ))}
          </View>
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}}/>  
        <View>
          <TouchableOpacity onPress={startWorkout} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Inter-Bold', fontSize: 30}}>START</Text>
            <AntDesign name="right" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navigation: {
      flexDirection: 'row',
      alignItems: 'center'
  },
});


export default WorkoutScreen;
