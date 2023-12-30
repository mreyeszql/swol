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
          >
              <Text>{item.name}</Text>
          </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>WORKOUTS</Text>
        </View>
        <FlatList 
            data={workouts}
            keyExtractor={(item) => item.id}
            renderItem={mockRenderItem}
        />
      </SafeAreaView>
    );
}

export default WorkoutsScreen;
