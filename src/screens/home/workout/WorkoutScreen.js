import React, {useState, useEffect} from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'components/view';
import Text from 'components/text';
import { getUrl } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/api';
import { listMyWorkouts } from 'graphql/queries';

const WorkoutScreen = ({ route, navigation }) => {
  const { name, id, exercises, reps, percents, sets, rests, muscles, uri } = route.params;
  const [localVideos, setLocalVideos] = useState({});
  const [myWorkout, setMyWorkout] = useState(null);
  const [workoutTime, setWorkoutTime] = useState(null);

  useEffect(() => {
    localHandleFetchMyWorkout();
    localHandleFetchVideos();
    localHandleFetchEstimatedTime();
  }, []);

  const localHandleFetchEstimatedTime = () => {
    let i = 0;
    const timesPerRep = exercises.items.map((item, index) => {
      let counter = 0;
      let j = 0;
      while (j < sets[index]) {
        counter += reps[i];
        i += 1;
        j += 1;
      }
      return (item.exercise?.timePerRep ?? 8) * sets[index] * reps[index]
    });
    timeTotalRests = rests.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    timeTotalReps = timesPerRep.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setWorkoutTime(timeTotalReps + timeTotalRests);
  };

  const localHandleFetchMyWorkout = async () => {
    const client = generateClient();
    const myWorkoutResult = await client.graphql({ 
      query: listMyWorkouts,
      variables: {
          filter: {
              myWorkoutWorkoutId: {eq: id}
          }
      }
    });
    setMyWorkout(myWorkoutResult.data.listMyWorkouts.items[0]);
  };

  const localHandleFetchVideos = async () => {
    console.log("localHandleFetchVideos");
    for (let i = 0; i < exercises.items.length; i++) {
      let getUrlResult = await getUrl({
        key: "exerciseVideos/" + exercises.items[i].exercise.lottie,
        options: {
          accessLevel: 'guest'
        },
      });

      setLocalVideos((videos) => {
        return { ...videos, [exercises.items[i].exercise.id]: getUrlResult.url.toString() };
      });
    }
  };

  const startWorkout = () => {
    navigation.navigate('Exercises', { exercises: exercises.items, name, id, reps, percents, sets, rests, videos: localVideos, myWorkout });
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
      <View style={{paddingHorizontal: 28, justifyContent: 'space-between', flex: 1, paddingBottom: 24}}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 28}}>
            <Text>{Math.round(workoutTime / 60)} MIN</Text>
            <View style={{flexDirection: 'row'}}>
              {myWorkout?.completedTimes ? (
                <>
                  <Text>Completed</Text>
                  <Text style={{fontFamily: 'Inter-Bold'}}> {myWorkout?.completedTimes ?? 0} </Text>
                  <Text>times</Text>
                </>
              ) : (
                <>
                <Text style={{fontFamily: 'Inter-Bold'}}>First-timer </Text>
                <Text>:D</Text>
                </>
              )}
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
        </View>
        <Image 
          source={{uri: uri}}
          defaultSource={require('../../../../assets/logo.png')} //TODO Santi: better placeholder
          style={{width: "100%", aspectRatio: 1, backgroundColor: 'gray', borderRadius: 50}}
        /> 
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
