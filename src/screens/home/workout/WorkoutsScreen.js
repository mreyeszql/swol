import { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import Text from 'components/text';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import SafeAreaView from 'components/view';
import { getUrl, list } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';
import { listMachines } from 'graphql/queries';




const WorkoutsScreen = ({ navigation }) => {
    const client = generateClient();
    const [recommendedWorkouts, setRecommendedWorkouts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedWorkouts, setSearchedWorkouts] = useState([]);
    const [workoutIds, setWorkoutIds] = useState(null);
    const [machineIds, setMachineIds] = useState(null);

    const customQuery = (filterExp) => {
      const query = 
      `
      query MyCustomQuery {
        listWorkouts${filterExp} {
          items {
            id
            name
            nameLower
            imageUrl
            exercises {
              items {
                exercise {
                  id
                  name
                  timePerRep
                  machines(filter: {or: ${JSON.stringify(machineIds).replace(/"([^"]+)":/g, '$1:')}}) {
                    items {
                      machineId
                      machine {
                        increment
                        name
                      }
                    }
                  }
                  lottie
                  hasWeight
                  muscles {
                    items {
                      muscle {
                        name
                      }
                    }
                  }
                  incrementPR
                  increment
                }
              }
            }
            reps
            sets
            percents
            rests
          }
        }
      }
      `;
      return query;
    };

    useEffect(() => {
        localHandleFetchGymsWorkoutIds();
        localHandleFetchGymsMachineIds();
    }, []);

    useEffect(() => {
      if (workoutIds && machineIds) {
        localHandleFetchRecommendedWorkouts();
      }
    }, [workoutIds, machineIds]);

    useEffect(() => {
      if (searchText !== '' && machineIds) {
        localHandleFetchSearchWorkouts();
      }
    }, [searchText, machineIds]);

    const localHandleFetchProfile = async () => {
      const { userId } = await getCurrentUser();
      const query = `
      query MyQuery {
          profilesByOwnerId(ownerId: "${userId}") {
          items {
              id
              experience
              gym {
                id
                isRegistered
              }
          }
          }
      }
      `;
      const profile = await client.graphql({
          query: query,
      });
        return profile.data.profilesByOwnerId.items[0];
    };

    const localHandleFetchGymsMachineIds = async () => {
      const profile = await localHandleFetchProfile();
      if (profile.gym.isRegistered) {
        const res = await client.graphql({
          query: listMachines,
          variables: { filter: {
            machineGymId: {eq: profile.gym.id}
          }}
        })
        setMachineIds(res.data.listMachines.items.map(item => { return {machineId: {eq: item.id}} }));
      }
    };

    const localHandleFetchGymsWorkoutIds = async () => {
      const profile = await localHandleFetchProfile();
      if (profile.gym.isRegistered) {
        const query_str = `
        query MyQuery {
          workoutGymsByGymId(gymId: "${profile.gym.id}") {
            items {
              workout {
                id
              }
            }
          }
        }
        `;

        const workout_results = await client.graphql({
          query: query_str,
        })
        let workout_ids = workout_results.data.workoutGymsByGymId.items.map(item => { return {id: {eq: item.workout.id}} });
        setWorkoutIds(workout_ids);
      }
    }

    const localHandleFetchSearchWorkouts = async () => {
      console.log("localHandleFetchSearchExercises");
      const profile = await localHandleFetchProfile();

      if (profile.gym.isRegistered) {
        const result = await client.graphql({ query: customQuery(`(filter: {and: [{and: ${JSON.stringify(workoutIds).replace(/"([^"]+)":/g, '$1:')}}, {nameLower: {contains: "${searchText}"}}]})`) });
        localHandleProcessWorkouts(result, setSearchedWorkouts);
      } else {
        const result = await client.graphql({ query: customQuery(`(filter: {and: [{workoutCreatorId: {eq: "swol"}}, {nameLower: {contains: "${searchText}"}}]})`) });
        localHandleProcessWorkouts(result, setRecommendedWorkouts);
      }
    };

    const localHandleFetchRecommendedWorkouts = async () => {
      const profile = await localHandleFetchProfile();
      if (profile.gym.isRegistered) {
        const result = await client.graphql({ query: customQuery(`(filter: {and: [{and: ${JSON.stringify(workoutIds).replace(/"([^"]+)":/g, '$1:')}}, {difficulty: {le: ${profile?.experience + 1}}}, {difficulty: {ge: ${profile?.experience - 1}}}]})`) });
        localHandleProcessWorkouts(result, setRecommendedWorkouts);
      } else {
        const result = await client.graphql({ query: customQuery(`(filter: {and: [{workoutCreatorId: {eq: "swol"}}, {difficulty: {le: ${profile?.experience + 1}}}, {difficulty: {ge: ${profile?.experience - 1}}}]})`) });
        localHandleProcessWorkouts(result, setRecommendedWorkouts);
      }
    }

    const localHandleProcessWorkouts = async (result, setFunction) => {
      let workouts = result.data.listWorkouts.items;
        for (let i = 0; i < workouts.length; i++) {
          if (workouts[i]?.imageUrl) {
              let uri = await localHandleGetImage(workouts[i]?.imageUrl, workouts[i].id);
              workouts[i] = {...workouts[i], uri }
          }
        }
        setFunction(workouts);
    }

    const localHandleGetImage = async (key, id) => {
      console.log("localHandleGetImage");
      let getUrlResult = await getUrl({
          key: "exercisePic/" + id + "/" + key
      });
      return getUrlResult.url.toString();
    }

    const mockRenderItem = ({ item }) => {
      const muscles = Array.from(
        item.exercises.items
          .map(exercise => {
            return new Set(exercise.exercise.muscles.items.map(muscle => muscle.muscle.name));
          })
          .reduce((result, currentSet) => 
            new Set([...result, ...currentSet]), new Set()
          )
      );
      const handlePress = () => {
        navigation.navigate('Workout', {...item, muscles });
      };

      return (
          <TouchableOpacity
              onPress={handlePress}
              style={{flexDirection: 'row', alignItems: 'center'}}
          >
              <Image 
                source={{uri: item.uri}}
                defaultSource={require('../../../../assets/img/placeholder_workout.png')} //TODO Santi: better placeholder
                style={{width: 80, height: 80, backgroundColor: 'gray', borderRadius: 10, borderWidth: 0.5}}
              />
              <View style={{flexDirection: 'column', paddingLeft: 18}}>
                <Text style={{fontFamily: 'Inter-Bold', textTransform: 'uppercase', fontSize: 20}}>{item.name}</Text>
                <Text style={{fontSize: 14, flexWrap: 'wrap'}}>{muscles.join(' / ')}</Text>
              </View>
          </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView>
        <View style={{paddingHorizontal: 12}}>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 26, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase', fontWeight: 'bold'}}>Workouts</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Scan')}
            >
              <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10, borderColor: 'white', paddingHorizontal: 12, paddingVertical: 4}}>
            <AntDesign name="search1" size={16} color="grey" />
            <TextInput
              autoCorrect={false}
              autoCapitalize='none'
              style={{color: 'white', width: '100%', textTransform: 'lowercase', padding: 6, fontFamily: 'Inter-Light', borderBottomWidth: 1, fontSize: 16}}
              placeholderTextColor="grey"
              placeholder="Search Workouts..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
          {searchText === '' ? (
            <>
              <Text style={{fontFamily: 'Inter-Bold', fontSize: 20, marginVertical: 12}}>Recommended</Text>
              <FlatList 
                style={{height: '100%'}}
                data={recommendedWorkouts}
                keyExtractor={(item) => item.id}
                renderItem={mockRenderItem}
              />
              </>
          ) : (
            <FlatList 
              style={{height: '100%', marginTop: 12}}
              data={searchedWorkouts}
              keyExtractor={(item) => item.id}
              renderItem={mockRenderItem}
            />
          )}
        </View>
      </SafeAreaView>
    );
}

export default WorkoutsScreen;
