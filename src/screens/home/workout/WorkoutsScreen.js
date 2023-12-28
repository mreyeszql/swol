import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { generateClient } from 'aws-amplify/api';

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
        const handlePress = () => {
            navigation.navigate('Workout', item);
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
        <View>
            <FlatList 
                data={workouts}
                keyExtractor={(item) => item.id}
                renderItem={mockRenderItem}
            />
        </View>
    );
}

export default WorkoutsScreen;
