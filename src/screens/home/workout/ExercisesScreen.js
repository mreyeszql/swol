import { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions, Button } from "react-native";
import { generateClient } from 'aws-amplify/api';
import { listMyExercises } from "graphql/queries";
import { createMyExercise, updateMyExercise } from "graphql/mutations";

const ExercisesScreen = ({ route, navigation }) => {
    const client = generateClient();
    const [myExercises, setMyExercises] = useState({});
    const { width, height } = Dimensions.get('screen');
    const exercises = route.params;

    useEffect(() => {
        localFetchMyExercises();
    }, []);

    const localFetchMyExercises = async () => {
        const result = await client.graphql({ query: listMyExercises });
        const resultDict = result.data.listMyExercises.items.reduce((acc, item) => {
            acc[item.myExerciseExerciseId] = item;
            return acc;
        }, {});
        setMyExercises(resultDict);
    }

    const localHandleSetMyExercises = async (exerciseId, weightChange) => {
        const existingExercise = myExercises[exerciseId];

        if (existingExercise) {
            // Exercise already exists, update the weight
            const newWeight = Math.max(existingExercise.weight + weightChange, 0);
            const updatedExercise = { ...existingExercise, weight: newWeight };

            setMyExercises({
                ...myExercises,
                [exerciseId]: updatedExercise,
            });

            // Update the exercise in the database
            if (existingExercise.weight !== newWeight) {
                await client.graphql({
                    query: updateMyExercise,
                    variables: { input: { id: updatedExercise.id, weight: updatedExercise.weight } }
                });
            }
        } else {
            // Exercise doesn't exist, create a new MyExercise entry
            const newExercise = {
                myExerciseExerciseId: exerciseId,
                weight: weightChange,
                // Add other necessary fields
            };

            setMyExercises({
                ...myExercises,
                [exerciseId]: newExercise,
            });

            // Create the new exercise in the database
            await client.graphql({
                query: createMyExercise,
                variables: { input: newExercise }
            });
        }
    }

    const mockRenderItem = ({ item }) => {
        return (
            <View style={{ width, height }}>
                <Text>{item.exercise.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Button 
                        title="-"
                        onPress={() => localHandleSetMyExercises(item.exercise.id, -5)}
                    />
                    <Text>{myExercises[item.exercise.id]?.weight ?? 0}</Text>
                    <Button 
                        title="+"
                        onPress={() => localHandleSetMyExercises(item.exercise.id, 5)}
                    />
                </View>
            </View>
        );
    }
    return (
        <View>
            <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={exercises}
                keyExtractor={(item) => item.exercise.id}
                renderItem={mockRenderItem}
            />
        </View>
    );
}

export default ExercisesScreen;