import { View, TouchableOpacity, FlatList } from "react-native";
import SafeAreaView from "components/view";
import { AntDesign } from '@expo/vector-icons';
import Text from "components/text";

const ListExerciseDetailsScreen = ({ navigation, route }) => {
    const { data } = route.params;
    
    const mockRenderItem = ({ item }) => {
        // const muscles = Array.from(
        //     item.exercises.items
        //     .map(exercise => {
        //         return new Set(exercise.exercise.muscles.items.map(muscle => muscle.muscle.name));
        //     })
        //     .reduce((result, currentSet) => 
        //         new Set([...result, ...currentSet]), new Set()
        //     )
        // );
        const handlePress = () => {
            navigation.navigate('ExerciseDetail', { data: item, machine_increment: data.increment, machine_name: data.name, fromList: true });
        };

        return (
            <TouchableOpacity
                onPress={handlePress}
                style={{flexDirection: 'row', alignItems: 'center'}}
            >
                {/* <Image 
                    source={{uri: item.uri}}
                    defaultSource={require('../../../../assets/img/placeholder_workout.png')} //TODO Santi: better placeholder
                    style={{width: 80, height: 80, backgroundColor: 'gray', borderRadius: 10, borderWidth: 0.5}}
                /> */}
                <View style={{flexDirection: 'column', paddingLeft: 18}}>
                    <Text style={{fontFamily: 'Inter-Bold', textTransform: 'uppercase', fontSize: 20}}>{item.exercise.name}</Text>
                    <Text style={{fontSize: 14, flexWrap: 'wrap'}}>{item.exercise.muscles.items.map(item => item.muscle.name).join(' / ')}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 28}}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{marginLeft: -12, paddingRight: 15, zIndex: 1}}>
                        <TouchableOpacity onPress={() => navigation.pop(2)}>
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -(15 + 12), zIndex: 0}}>
                        <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>{data.name}</Text>
                    </View>
                </View>
                <View>
                    <FlatList 
                        style={{height: '100%'}}
                        data={data.exercises.items}
                        keyExtractor={(item) => item.exercise.id}
                        renderItem={mockRenderItem}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ListExerciseDetailsScreen;