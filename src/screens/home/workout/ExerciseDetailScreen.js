import { StyleSheet, View, TouchableOpacity } from "react-native";
import SafeAreaView from "components/view";
import Text from "components/text";
import { AntDesign } from '@expo/vector-icons';
import { getExercise } from "graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { getUrl } from "aws-amplify/storage";
import { Video } from "expo-av";
import { listMyExercises } from "graphql/queries";
import { handleUpdatedExercise, handleNewExercise } from "functions/workout/exercise";
import { handleFetchAuth } from "functions/utils/profile";

const ExerciseDetailScreen = ({ navigation, route }) => {
    const client = generateClient();
    const [videoUri, setVideoUri] = useState(null);
    const [exercise, setExercise] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null)
    const [myExercise, setMyExercise] = useState(null);
    const [myExistingExercise, setMyExistingExercise] = useState(null);
    const [localProfile, setLocalProfile] = useState({});
    const { data } = route.params;

    useEffect(() => {
        localHandleFetchAuth();
        localHandleGetExercise();
    }, []);

    const localHandleFetchAuth = async () => {
        console.log("localHandleFetchAuth");
        const profile = await handleFetchAuth();
        setLocalProfile(profile.data.profilesByOwnerId.items[0]);
    };

    const localHandleGetExercise = async () => {
        const exerciseResult = await client.graphql({
            query: getExercise, 
            variables: {
                id: data
            }
        });
        setExercise(exerciseResult.data.getExercise);

        const getUrlResult = await getUrl({
            key: exerciseResult.data.getExercise.lottie,
            options: {
              accessLevel: 'guest'
            },
        });
        setVideoUri(getUrlResult.url.toString());

        const myExerciseResult = await client.graphql({ 
            query: listMyExercises,
            variables: {
                filter: {
                    myExerciseExerciseId: {eq: data}
                }
            }
        });
        setMyExercise(myExerciseResult.data.listMyExercises.items[0]);
        setMyExistingExercise(myExerciseResult.data.listMyExercises.items[0]);
    };

    const localHandleSetMyExercise = async (myExercise, weightChange) => {
        console.log("localHandleSetMyExercises");

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const existingExercise = myExercise;
        if (existingExercise) {
            const newWeight = Math.max(existingExercise.weight + weightChange, 0);
            const updatedExercise = { ...existingExercise, weight: newWeight };

            setMyExercise(updatedExercise);
            const newTimeoutId = setTimeout(() => {
                localHandlePersistMyExercises(client, myExistingExercise, updatedExercise, exercise, localProfile);
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                setTimeoutId(null);
            }, 5000);
            setTimeoutId(newTimeoutId);
        } else if (weightChange > 0) {
            const newExercise = {
                myExerciseExerciseId: exercise.id,
                weight: weightChange,
            };
            setMyExercise(newExercise);
            const newTimeoutId = setTimeout(() => {
                localHandlePersistMyExercises(client, myExistingExercise, newExercise, exercise, localProfile);
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                setTimeoutId(null);
            }, 2000);
            setTimeoutId(newTimeoutId);
        }
    };

    const localHandlePersistMyExercises = async (client, existingExercise, updatedExercise, exercise, localProfile) => {
        console.log("persisting", existingExercise ? "updating" : "new", "weight", "from", existingExercise ? existingExercise.weight : 0, "to", updatedExercise.weight)
        if (existingExercise) {
            console.log(existingExercise, updatedExercise, exercise);
            await handleUpdatedExercise(client, existingExercise, updatedExercise, exercise, localProfile);
            setMyExistingExercise(updatedExercise);
        } else {
            const result = await handleNewExercise(client, updatedExercise, exercise);
            setMyExercise(result);
            setMyExistingExercise(result);
        }
    };

    return (
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 28}}>
                <View style={styles.navigation}>
                    <View style={{marginLeft: -12, paddingRight: 15}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Workouts')}>
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    {exercise?.name && <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>{exercise.name}</Text>}
                </View>
                {videoUri && <Video
                    source={{uri: videoUri}}
                    resizeMode="cover"
                    style={{width: '100%', height: '60%'}}
                    isMuted
                    isLooping
                    shouldPlay
                />}
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => localHandleSetMyExercise(myExercise, -5)}>
                            <Text style={{fontFamily: 'Inter-Bold', fontSize: 20}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal: 8}}>{myExercise ? (myExercise?.weight ?? 0) : 0} lbs.</Text>
                        <TouchableOpacity onPress={() => localHandleSetMyExercise(myExercise, 5)}>
                            <Text style={{fontFamily: 'Inter-Bold', fontSize: 20}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    navigation: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default ExerciseDetailScreen;