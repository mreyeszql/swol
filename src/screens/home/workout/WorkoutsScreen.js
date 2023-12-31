import { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import Text from 'components/text';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'components/view';


const WorkoutsScreen = ({ navigation }) => {
    const client = generateClient();
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        localHandleFetchWorkouts();
    }, []);

    const localHandleFetchWorkouts = async () => {
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
                rests
              }
            }
          }
          `;
        
        const result = await client.graphql({ query: customQuery });
        setWorkouts(result.data.listWorkouts.items);
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
              <View style={{width: 80, height: 80, backgroundColor: 'gray', borderRadius: 10}} />
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
          <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 26}}>
            <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>WORKOUTS</Text>
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
