//React
import { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, Dimensions, Button, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

//AWS
import { generateClient } from 'aws-amplify/api';

//Local
import { listMyExercises } from "graphql/queries";
import { handleFetchAuth } from "functions/utils/profile";
import { handleNewExercise, handleUpdatedExercise } from "functions/workout/exercise";

const ExercisesScreen = ({ route, navigation }) => {
    const client = generateClient();    
    const [myExercises, setMyExercises] = useState({});
    const [localProfile, setLocalProfile] = useState({});

    const { width, height } = Dimensions.get('screen');
    const { exercises, name, reps, sets, rests } = route.params;

    useEffect(() => {
        localHandleFetchMyExercises();
        localHandleFetchAuth();
    }, []);

    const localHandleFetchAuth = async () => {
        const profile = await handleFetchAuth();
        setLocalProfile(profile.data.profilesByOwnerId.items[0]);
    };

    const localHandleFetchMyExercises = async () => {
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
            const updatedExercise = await handleUpdatedExercise(client, exercise, existingExercise, weightChange, localProfile);

            setMyExercises({
                ...myExercises,
                [exercise.id]: updatedExercise,
            });
        } else {
            const newExercise = await handleNewExercise(client, exercise, weightChange);

            setMyExercises({
                ...myExercises,
                [exercise.id]: newExercise,
            });
        }
    }

    const mockRenderItem = ({ item }) => {
        return (
            <View style={{ width, height: '100%' }}>
                { item.exercise ? (
                    <View style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', padding: 30 }}>
                        <Text>{item.exercise.name}</Text>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}> 
                                <Text>{timers[item.expandedId] ? timers[item.expandedId]: 0} SEC</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Button 
                                        title="-"
                                        onPress={() => localHandleSetMyExercises(item.exercise, -5)}
                                    />
                                    <Text>{myExercises[item.exercise.id]?.weight ?? 0} lbs.</Text>
                                    <Button 
                                        title="+"
                                        onPress={() => localHandleSetMyExercises(item.exercise, 5)}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}> 
                                <Text>SET: {item.currentSet}/{item.sets}</Text>
                                <Text>REPS: {item.reps}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={() => handleMockGoPage(-1)}>
                                    <Text>PREV</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleMockGoPage(1)}>
                                    <Text>NEXT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text>REST FOR {item.rest} SECONDS BITCH</Text>
                        <Text>CURRENT: {timers[item.expandedId] ? timers[item.expandedId]: 0}</Text>
                    </View>
                )}
            </View>
        );
    }

    //MISSING HANDLE ERROR IF SETS, REPS, and EXERCISES are of diff size and SUM(sets) == len(rests) and len(processedExercises)
    const combineLists = (objectsList, restsList) => {
        let combinedList = [];
    
        for (let i = 0; i < objectsList.length; i++) {
            // Add object to the combined list
            combinedList.push(objectsList[i]);
    
            // Check if the corresponding rest time is greater than 0
            if (restsList[i] > 0) {
            // Add rest time to the combined list
            combinedList.push({ rest: restsList[i] });
            }
        }

        return combinedList;
    };
    
    const processedExercises = combineLists(
        exercises
            .map((item, index) => {
                return { exercise: item.exercise, sets: sets[index], reps: reps[index] };
            })
            .flatMap(({ sets, ...rest }) =>
                Array.from({ length: sets }).map((_, index) => ({ ...rest, sets, currentSet: index + 1}))
            ), 
        rests
    ).map((item, index) => {
        return { ...item, expandedId: index }
    });
    //HANDLE ERR UP TO HERE

    // MESSY EXTRACT AND CLEAN
    const flatListRef = useRef(null);
    const [timers, setTimers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleMockGoPage = (to) => {
        if (currentIndex + to < processedExercises.length && currentIndex + to > 0) {
            flatListRef.current?.scrollToIndex({
              index: currentIndex + to,
              animated: true,
            });
        };
    };
    
    const handleMockScrollEnd = (e) => {
        const pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0), processedExercises.length);
        setCurrentIndex(pageNumber - 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the seconds
            setTimers(prevTimers => {
                return { ...prevTimers, [currentIndex]:  prevTimers[currentIndex] ? prevTimers[currentIndex] + 1 : 1};
              });
        }, 1000);
    
          // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, [timers]);
    //CLEAN UP TO HERE

    return (
        <SafeAreaView>
            <View style={styles.navigation}>
                <Button title="<" onPress={() => navigation.goBack()} />
                <Text>{name}</Text>
            </View>
            <FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={processedExercises}
                onMomentumScrollEnd={handleMockScrollEnd}
                keyExtractor={(item) => item.expandedId}
                renderItem={mockRenderItem}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    navigation: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default ExercisesScreen;