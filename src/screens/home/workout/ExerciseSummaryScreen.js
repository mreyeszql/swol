import Text from "components/text";
import SafeAreaView from "components/view";
import { Button } from "react-native";
import { useEffect, useState } from "react";

const ExercisesSummaryScreen = ({ navigation, route }) => {
    const [restTime, setRestTime] = useState(0);
    const [exerciseTime, setExerciseTime] = useState(0);
    const [totalReps, setTotalReps] = useState(0);
    const [totalSets, setTotalSets] = useState(0);

    const { timers, processedExercises, sets, reps } = route.params;
    

    useEffect(() => {
        localHandleCalculateTimes();
        localHandleCalculateSummary();
    }, []);

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
        const totalReps = reps.map((x, i) => reps[i] * sets[i]).reduce((acc, sum) => acc + sum, 0);
        setTotalReps(totalReps);

        let totalSets = 0;

        sets.forEach((item) => {
            totalSets += item;
        });
        setTotalSets(totalSets);
    };

    return (
        <SafeAreaView>
            <Text>ExercisesSummaryScreen</Text>
            <Text>Rest Time: {restTime}</Text>
            <Text>Exercise Time: {exerciseTime}</Text>
            <Text>Total Time: {exerciseTime + restTime}</Text>
            <Text>Total Reps: {totalReps}</Text>
            <Text>Total Sets: {totalSets}</Text>
            <Button 
                title="Exit"
                onPress={() => navigation.navigate('Workouts')}
            />
        </SafeAreaView>
    );
};

export default ExercisesSummaryScreen;
