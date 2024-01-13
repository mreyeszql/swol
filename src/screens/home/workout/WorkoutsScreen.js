import { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import Text from 'components/text';
import { Feather, AntDesign } from '@expo/vector-icons'; 
import SafeAreaView from 'components/view';
import { getUrl, list } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';



const WorkoutsScreen = ({ navigation }) => {
    const client = generateClient();
    const [recommendedWorkouts, setRecommendedWorkouts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedWorkouts, setSearchedWorkouts] = useState([]);

    //MISSING IN EXERCISE:  
    // difficulty
    // hasWeight
    // increment

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
                  lottie
                  hasWeight
                  muscles {
                    items {
                      muscle {
                        name
                      }
                    }
                  }
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
        localHandleFetchRecommendedWorkouts();
    }, []);

    useEffect(() => {
      if (searchText !== '') {
        localHandleFetchSearchWorkouts();
      }
    }, [searchText]);

    const localHandleFetchProfile = async () => {
      const { userId } = await getCurrentUser();
      const query = `
      query MyQuery {
          profilesByOwnerId(ownerId: "${userId}") {
          items {
              id
              experience
          }
          }
      }
      `;
      const profile = await client.graphql({
          query: query,
      });
  
      return profile.data.profilesByOwnerId.items[0];
    };

    const localHandleFetchSearchWorkouts = async () => {
      console.log("localHandleFetchSearchExercises");
      result = await client.graphql({
        query: customQuery(`(filter: {nameLower: {contains: "${searchText.toLowerCase()}"}})`)
      })
      localHandleProcessWorkouts(result, setSearchedWorkouts);
    };

    const localHandleFetchRecommendedWorkouts = async () => {
      const profile = await localHandleFetchProfile();
      const result = await client.graphql({ query: customQuery(`(filter: {difficulty: {le: ${profile?.experience}}})`) });
      localHandleProcessWorkouts(result, setRecommendedWorkouts);
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
                defaultSource={require('../../../../assets/logo.png')} //TODO Santi: better placeholder
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
              <Feather name="maximize" size={24} color="white" />
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
