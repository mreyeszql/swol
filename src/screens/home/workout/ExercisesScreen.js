//React
import { useEffect, useState, useRef } from "react";
import { View, FlatList, Dimensions, Button, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import LottieView from "lottie-react-native";
import { Video } from "expo-av";
import { getUrl } from 'aws-amplify/storage';


//AWS
import { generateClient } from 'aws-amplify/api';

//Local
import { listMyExercises } from "graphql/queries";
import { handleFetchAuth } from "functions/utils/profile";
import { handleNewExercise, handleUpdatedExercise } from "functions/workout/exercise";
import Text from "components/text";
import SafeAreaView from "components/view";
import TimerClock from "components/clock";

const ExercisesScreen = ({ route, navigation }) => {
    const client = generateClient();    
    const [myExercises, setMyExercises] = useState({});
    const [localProfile, setLocalProfile] = useState({});

    const { width, height } = Dimensions.get('screen');
    const { exercises, name, reps, sets, rests, videos } = route.params;

    useEffect(() => {
        localHandleFetchMyExercises();
        localHandleFetchAuth();
    }, []);

    const localHandleFetchAuth = async () => {
        console.log("localHandleFetchAuth");
        const profile = await handleFetchAuth();
        setLocalProfile(profile.data.profilesByOwnerId.items[0]);
    };

    const localHandleFetchMyExercises = async () => {
        console.log("localHandleFetchMyExercises");
        const result = await client.graphql({ query: listMyExercises });
        const resultDict = result.data.listMyExercises.items.reduce((acc, item) => {
            acc[item.myExerciseExerciseId] = item;
            return acc;
        }, {});
        setMyExercises(resultDict);
    }

    const localHandleSetMyExercises = async (exercise, weightChange) => {
        //TODO CHANGE SO THAT IT IS AT THE END OF WORKOUT SYNC W DTABAASE AND A BACL ARROW POP UP SAYING SYNC CURR RES?
        //OR SYNC W DB asap with zeros and then just update cuz update is async w ids, creating and updating takes time.
        console.log("localHandleSetMyExercises");
        const existingExercise = myExercises[exercise.id];

        if (existingExercise) {
            const updatedExercise = await handleUpdatedExercise(client, exercise, existingExercise, weightChange, localProfile);

            setMyExercises({
                ...myExercises,
                [exercise.id]: updatedExercise,
            });
        } else if (weightChange > 0) {
            const newExercise = await handleNewExercise(client, exercise, weightChange);

            setMyExercises({
                ...myExercises,
                [exercise.id]: newExercise,
            });
        }
    }

    const mockRenderItem = ({ item }) => {
        const videoUri = videos[item.exercise?.id];
        return (
            <View style={{ width, height: '100%', paddingBottom: 30, paddingHorizontal: 28 }}>
                { item.exercise ? (
                    <View style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <View style={styles.navigation}>
                            <View style={{marginLeft: -12, paddingRight: 15}}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <AntDesign name="close" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                            <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>{item.exercise.name}</Text>
                        </View>
                        {videoUri && <Video
                            source={{uri: videoUri}}
                            resizeMode="cover"
                            style={{width: '100%', height: '60%'}}
                            isLooping
                            shouldPlay
                        />}
                        <View>
                            <View style={{backgroundColor: 'white', width: '100%', height: 1}}/>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15}}> 
                                <Text>{timers[item.expandedId] >= 60 && Math.floor(timers[item.expandedId] / 60)}{ timers[item.expandedId] >= 60 && " MIN "}{timers[item.expandedId] ? timers[item.expandedId] % 60: 0} SEC</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => localHandleSetMyExercises(item.exercise, -5)}>
                                        <Text style={{fontFamily: 'Inter-Bold', fontSize: 20}}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{paddingHorizontal: 8}}>{myExercises[item.exercise.id]?.weight ?? 0} lbs.</Text>
                                    <TouchableOpacity onPress={() => localHandleSetMyExercises(item.exercise, 5)}>
                                        <Text style={{fontFamily: 'Inter-Bold', fontSize: 20}}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{backgroundColor: 'white', width: '100%', height: 1}}/>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15}}> 
                                <Text>SET: {item.currentSet}/{item.sets}</Text>
                                <Text>REPS: {item.reps}</Text>
                            </View>
                            <View style={{backgroundColor: 'white', width: '100%', height: 1}}/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 57, paddingHorizontal: 16}}>
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
                    <View style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <View style={styles.navigation}>
                            <View style={{marginLeft: -12, paddingRight: 15}}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <AntDesign name="close" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                            <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>REST MODE</Text>
                        </View>
                        <View style={{ height: '80%'}}>
                            {timers[item.expandedId] && 
                            <>
                                <TimerClock n={timers[item.expandedId] ? timers[item.expandedId] : 0} />
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                    }}
                                >
                                    <Text>
                                        {timers[item.expandedId] >= 60 &&
                                        Math.floor(timers[item.expandedId] / 60)}
                                        {timers[item.expandedId] >= 60 && ' MIN '}
                                        {timers[item.expandedId] && (timers[item.expandedId] % 60)} SEC
                                    </Text>
                                </View>
                            </>}
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: '90%',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                }}
                            >
                                <Text style={{fontFamily: 'Inter-ExtraLight', fontSize: 12}}>
                                    Recommended rest time: {item.rest >= 60 &&
                                    Math.floor(item.rest / 60)}
                                    {item.rest >= 60 && ' MIN '}
                                    {item.rest && (item.rest % 60) != 0 && (item.rest % 60)}
                                    {item.rest && (item.rest % 60) != 0 && ' SEC '}
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 57, paddingHorizontal: 16}}>
                                <TouchableOpacity onPress={() => handleMockGoPage(-1)}>
                                    <Text>PREV</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleMockGoPage(1)}>
                                    <Text>NEXT</Text>
                                </TouchableOpacity>
                        </View>
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
        if (currentIndex + to < processedExercises.length && currentIndex + to >= 0) {
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
        <SafeAreaView style={{backgroundColor: 'black'}}>
            <FlatList
                ref={flatListRef}
                disableVirtualization={false}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={processedExercises}
                onMomentumScrollEnd={handleMockScrollEnd}
                keyExtractor={(item) => item.expandedId.toString()}
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