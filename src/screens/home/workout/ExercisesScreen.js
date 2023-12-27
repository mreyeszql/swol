import { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions, Button } from "react-native";
import { generateClient } from 'aws-amplify/api';
import { listMyExercises } from "graphql/queries";
import { createMyExercise, createPost, updateMyExercise } from "graphql/mutations";
import { handleFetchAuth } from "functions/utils/profile";

const ExercisesScreen = ({ route, navigation }) => {
    const client = generateClient();
    const [myExercises, setMyExercises] = useState({});
    const { width, height } = Dimensions.get('screen');
    const [localProfile, setLocalProfile] = useState({});
    const exercises = route.params;

    useEffect(() => {
        localFetchMyExercises();
        localHandleFetchAuth();
    }, []);

    const localHandleFetchAuth = async () => {
        const profile = await handleFetchAuth();
        setLocalProfile(profile.data.profilesByOwnerId.items[0]);
    };

    const localFetchMyExercises = async () => {
        const result = await client.graphql({ query: listMyExercises });
        const resultDict = result.data.listMyExercises.items.reduce((acc, item) => {
            acc[item.myExerciseExerciseId] = item;
            return acc;
        }, {});
        setMyExercises(resultDict);
    }

    const localHandleSetMyExercises = async (exercise, weightChange) => {
        const existingExercise = myExercises[exercise.id];

        if (existingExercise) {
            // Exercise already exists, update the weight
            const newWeight = Math.max(existingExercise.weight + weightChange, 0);
            const updatedExercise = { ...existingExercise, weight: newWeight };

            setMyExercises({
                ...myExercises,
                [exercise.id]: updatedExercise,
            });

            // Update the exercise in the database
            if (existingExercise.weight !== newWeight) {
                await client.graphql({
                    query: updateMyExercise,
                    variables: { input: { 
                        id: updatedExercise.id, 
                        weight: updatedExercise.weight,
                        maxweight: Math.max(updatedExercise.weight, existingExercise.weight)
                    } }
                });

                if (updatedExercise.weight > existingExercise.weight && updatedExercise.weight % exercise.increment === 0 && updatedExercise.weight > 0) {
                    await client.graphql({
                        query: createPost,
                        variables: {
                            input: {
                                author: localProfile.id,
                                text: `${localProfile.username} just hit a ${updatedExercise.weight} lbs. PR on ${exercise.name}!`,
                            }
                        }
                    });
                }
            }
        } else {
            // Exercise doesn't exist, create a new MyExercise entry
            const newExercise = {
                myExerciseExerciseId: exercise.id,
                weight: weightChange,
                // Add other necessary fields
            };

            setMyExercises({
                ...myExercises,
                [exercise.id]: newExercise,
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
                        onPress={() => localHandleSetMyExercises(item.exercise, -5)}
                    />
                    <Text>{myExercises[item.exercise.id]?.weight ?? 0}</Text>
                    <Button 
                        title="+"
                        onPress={() => localHandleSetMyExercises(item.exercise, 5)}
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