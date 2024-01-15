import Text from "components/text";
import SafeAreaView from "components/view";
import { Button, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { createMyWorkout, updateMyWorkout, updateProfile } from "graphql/mutations";

const ExercisesSummaryScreen = ({ navigation, route }) => {
    const [restTime, setRestTime] = useState(0);
    const [exerciseTime, setExerciseTime] = useState(0);
    const [totalReps, setTotalReps] = useState(0);
    const [totalSets, setTotalSets] = useState(0);

    const { timers, processedExercises, name, sets, reps, myWorkout, personalRecords, id, localProfile } = route.params;
    

    useEffect(() => {
        localHandleCalculateTimes();
        localHandleCalculateSummary();
    }, []);

    const localHandleMyWorkout = async () => {
        client = generateClient();
        if (myWorkout) {
            await client.graphql({
                query: updateMyWorkout,
                variables: { input: {
                    id: myWorkout.id,
                    completedTimes: myWorkout.completedTimes + 1
                }}
            });
        } else {
            await client.graphql({
                query: createMyWorkout,
                variables: { input: {
                    myWorkoutWorkoutId: id,
                    completedTimes: 1
                }}
            });
        }
    }

    const localHandleCalculateTimes = () => {
        let restTime = 0;
        let exerciseTime = 0;

        processedExercises.forEach((item) => {
            restTime += (item.rest ? (timers[item.expandedId] ? timers[item.expandedId] : 0) : 0);
            exerciseTime += (item.exercise ? (timers[item.expandedId] ? timers[item.expandedId] : 0) : 0);
        });

        setRestTime(restTime);
        setExerciseTime(exerciseTime);
    };

    const localHandleCalculateSummary = () => {
        const totalReps = reps.map((x, i) => reps[i]).reduce((acc, sum) => acc + sum, 0);
        setTotalReps(totalReps);

        let totalSets = 0;

        sets.forEach((item) => {
            totalSets += item;
        });
        setTotalSets(totalSets);
    };

    const localHandleExit = () => {
        localHandleMyWorkout();
        localHandleUpdateWeekTime();
        navigation.navigate('Workouts');
    };

    const localHandleUpdateWeekTime = async () => {
        let thisWeekTime = localProfile.thisWeekTime ?? [0, 0, 0, 0, 0, 0, 0];
        const date = new Date();
        const day = date.getDay();
        thisWeekTime[day] += Math.round((exerciseTime + restTime) / 60);

        const client = generateClient();
        await client.graphql({
            query: updateProfile,
            variables: {input: {
                id: localProfile.id,
                thisWeekTime
            }}
        })
    }

    return (
        <SafeAreaView>
            <View style={{paddingHorizontal: 12, flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
                <View>
                    <View>
                        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'Inter-Bold', textTransform: 'uppercase', fontSize: 28}}>
                                Workout Complete
                            </Text>
                        </View>
                        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'Inter-Bold', fontSize: 20, color: '#6388EC', textTransform: 'uppercase'}}>
                                {name}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}} />
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase'}}>
                                TOTAL TIME
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{fontFamily: 'Inter-Bold', fontSize: 40, textTransform: 'uppercase'}}>
                                    {Math.round((exerciseTime + restTime) / 60)}
                                </Text>
                                <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase', marginBottom: 4}}>
                                    {} MIN
                                </Text>
                            </View>
                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}} />
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase'}}>
                                REST TIME
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{fontFamily: 'Inter-Bold', fontSize: 40, textTransform: 'uppercase'}}>
                                    {Math.round((restTime) / 60)}
                                </Text>
                                <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase', marginBottom: 4}}>
                                    {} MIN
                                </Text>
                            </View>
                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}} />
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase'}}>
                                SETS
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{fontFamily: 'Inter-Bold', fontSize: 40, textTransform: 'uppercase'}}>
                                    {totalSets}
                                </Text>
                                <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase', marginBottom: 4}}>
                                    {} SETS
                                </Text>
                            </View>
                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}} />
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase'}}>
                                REPS
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{fontFamily: 'Inter-Bold', fontSize: 40, textTransform: 'uppercase'}}>
                                    {totalReps}
                                </Text>
                                <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase', marginBottom: 4}}>
                                    {} REPS
                                </Text>
                            </View>
                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}} />
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase'}}>
                                COMPLETED
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{fontFamily: 'Inter-Bold', fontSize: 40, textTransform: 'uppercase'}}>
                                    {myWorkout?.completedTimes ? myWorkout.completedTimes + 1 : 1}
                                </Text>
                                <Text style={{fontFamily: 'Inter-Light', fontSize: 24, textTransform: 'uppercase', marginBottom: 4}}>
                                    {} TIMES
                                </Text>
                            </View>
                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}} />
                        {personalRecords.map((item) => {
                            return (
                            <>
                                <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginVertical: 12}}>
                                    <Text style={{fontFamily: 'Inter-Light', fontSize: 16}}>
                                        New PR for {}
                                    </Text>
                                    <Text style={{fontFamily: 'Inter-Bold', fontSize: 16, color: '#6388EC'}}>
                                        {item.exerciseName}
                                    </Text>
                                    <Text style={{fontFamily: 'Inter-Light', fontSize: 16, textTransform: 'uppercase'}}>
                                        {} @ {}
                                    </Text>
                                    <Text style={{fontFamily: 'Inter-Bold', fontSize: 16, textTransform: 'uppercase'}}>
                                        {item.personalRecordWeight} {}
                                    </Text>
                                    <Text style={{fontFamily: 'Inter-Light', fontSize: 16}}>
                                        lbs.
                                    </Text>
                                </View>
                            </>   
                            );
                        })}
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 32}}>
                    <TouchableOpacity onPress={localHandleExit} style={{borderRadius: 10, borderWidth: 1, borderColor: 'white', paddingHorizontal: 24, paddingVertical: 8}}>
                        <Text style={{textTransform: 'uppercase', fontSize: 20}}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ExercisesSummaryScreen;
