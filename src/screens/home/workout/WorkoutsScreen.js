import { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import Text from 'components/text';
import { Feather } from '@expo/vector-icons'; 
import SafeAreaView from 'components/view';
import { getUrl } from 'aws-amplify/storage';


const WorkoutsScreen = ({ navigation }) => {
    const client = generateClient();
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        localHandleFetchWorkouts();
    }, []);

    const localHandleFetchWorkouts = async () => {
        //MISSING IN EXERCISE:  
        // difficulty
        // hasWeight
        // increment

        const customQuery = `
        query MyCustomQuery {
          listWorkouts {
            items {
              id
              name
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
        
        const result = await client.graphql({ query: customQuery });
        
        let workouts = result.data.listWorkouts.items;
        for (let i = 0; i < workouts.length; i++) {
          if (workouts[i]?.lottie) {
              let uri = await localHandleGetImage(workouts[i]?.lottie, workouts[i].id);
              workouts[i] = {...workouts[i], uri }
          }
        }
        setWorkouts(workouts);
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
                defaultSource={require('../../../../assets/img/leg_crusher.png')}
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
            <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>WORKOUTS</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Scan')}
            >
              <Feather name="maximize" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <FlatList 
            style={{height: '100%'}}
            data={workouts}
            keyExtractor={(item) => item.id}
            renderItem={mockRenderItem}
          />
        </View>
      </SafeAreaView>
    );
}

export default WorkoutsScreen;
