import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
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
    const { data, machine_name, machine_increment, fromList } = route.params;
    const [videoUri, setVideoUri] = useState(null);
    const [exercise, setExercise] = useState(data);
    const [timeoutId, setTimeoutId] = useState(null)
    const [myExercise, setMyExercise] = useState(null);
    const [myExistingExercise, setMyExistingExercise] = useState(null);
    const [localProfile, setLocalProfile] = useState({});

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
        const getUrlResult = await getUrl({
            key: "exerciseVideos/" + data.exercise.lottie,
            options: {
              accessLevel: 'guest'
            },
        });
        setVideoUri(getUrlResult.url.toString());

        const myExerciseResult = await client.graphql({ 
            query: listMyExercises,
            variables: {
                filter: {
                    myExerciseExerciseId: {eq: data.exercise.id}
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
            await handleUpdatedExercise(client, existingExercise, updatedExercise, exercise, localProfile);
            setMyExistingExercise(updatedExercise);
        } else {
            const result = await handleNewExercise(client, updatedExercise, exercise);
            setMyExercise(result);
            setMyExistingExercise(result);
        }
    };

    const mockRenderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{borderColor: 'white', borderWidth: 1, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8}}>
                <Text>{item.muscle.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 28}}>
                <View style={styles.navigation}>
                    <View style={{marginLeft: -12, paddingRight: 15}}>
                        <TouchableOpacity onPress={() => {
                            if (fromList) {
                                navigation.goBack();
                            } else {
                                navigation.navigate('Workouts');
                            }
                        }}>
                            <AntDesign name={fromList ? "left" : "close"} size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    {exercise?.exercise?.name && <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>{exercise.exercise.name}</Text>}
                </View>
                {videoUri && <Video
                    source={{uri: videoUri}}
                    resizeMode="cover"
                    style={{width: '100%', height: '60%'}}
                    isMuted
                    isLooping
                    shouldPlay
                />}
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 28}}>
                    <FlatList 
                        style ={{width: '100%', overflow: 'visible'}}
                        horizontal={true}
                        data={data.exercise.muscles.items}
                        renderItem={mockRenderItem}
                        ItemSeparatorComponent={() => <View style={{width: 8}} />}
                    />
                    <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}}/>
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'}}>
                        <Text>
                            Difficulty: {data.exercise.difficulty}/10
                        </Text>
                        <TouchableOpacity style={{paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, borderColor: 'white', borderWidth: 1, opacity: 0.25}} disabled={true}>
                            <Text>Workouts</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12, marginBottom: 28}}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={{opacity: data.exercise.hasWeight ? 1 : 0.25}} onPress={() => localHandleSetMyExercise(myExercise, -(machine_increment ?? 5))} disabled={!data.exercise.hasWeight}>
                            <Text style={{fontFamily: 'Inter-Bold', fontSize: 28}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal: 8, fontSize: 28, opacity: data.exercise.hasWeight ? 1 : 0.25}}>{data.exercise.hasWeight ? (myExercise ? (myExercise?.weight ?? 0) : 0) : 0} lbs.</Text>
                        <TouchableOpacity style={{opacity: data.exercise.hasWeight ? 1 : 0.25}} onPress={() => localHandleSetMyExercise(myExercise, machine_increment ?? 5)} disabled={!data.exercise.hasWeight}>
                            <Text style={{fontFamily: 'Inter-Bold', fontSize: 28}}>+</Text>
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