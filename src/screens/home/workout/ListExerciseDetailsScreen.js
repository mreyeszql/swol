import { View, TouchableOpacity, FlatList } from "react-native";
import SafeAreaView from "components/view";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Text from "components/text";
import { useEffect, useState } from "react";

const ListExerciseDetailsScreen = ({ navigation, route }) => {
    const { data } = route.params;
    const items = [{exercise: {id: 0}, init: "Exercises"}, ...data.exercises.items];
    
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
            <View style={{marginVertical: 4}}>
                {
                    item?.init ? (
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontFamily: 'Inter-Bold', textTransform: 'uppercase', fontSize: 36}}>Exercises</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={handlePress}
                            style={{flexDirection: 'row', alignItems: 'center'}}
                        >
                            {/* <Image 
                                source={{uri: item.uri}}
                                defaultSource={require('../../../../assets/img/placeholder_workout.png')} //TODO Santi: better placeholder
                                style={{width: 80, height: 80, backgroundColor: 'gray', borderRadius: 10, borderWidth: 0.5}}
                            /> */}
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontFamily: 'Inter-Bold', textTransform: 'uppercase', fontSize: 20}}>{item.exercise.name}</Text>
                                <Text style={{fontSize: 14, flexWrap: 'wrap'}}>{item.exercise.muscles.items.map(item => item.muscle.name).join(' / ')}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    };

    return (
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 16}}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{ zIndex: 1, flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View 
                    style={{width: '100%', height: 1, backgroundColor: 'white', marginTop: 16}}    
                />
                <View>
                    <FlatList 
                        style={{height: '100%'}}
                        data={items}
                        keyExtractor={(item) => item.exercise.id}
                        renderItem={mockRenderItem}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ListExerciseDetailsScreen;