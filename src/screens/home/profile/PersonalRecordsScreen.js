import SafeAreaView from "components/view";
import { View, TouchableOpacity, FlatList, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Text from "components/text";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";

const PersonalRecordsScreen = ({ navigation, route }) => {
    const { username } = route.params;
    const [myExercises, setMyExercises] = useState(null);

    useEffect(() => {
        localHandleFetchMyExercises();
    }, []);

    const localHandleFetchMyExercises = async () => {
        const client = generateClient();
        const query = `query MyQuery {
            listMyExercises {
              items {
                exercise {
                  name
                }
                id
                maxweight
              }
            }
          }
          `;
        const result = await client.graphql({ query });  
        setMyExercises(result.data.listMyExercises.items);
    };

    const mockRenderItem = ({ item }) => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}}>
                <Text style={{fontSize: 24}}>{item.exercise.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 40, fontFamily: 'Inter-Bold'}}>{item.maxweight} </Text>
                    <Text style={{marginTop: 14, fontSize: 24}}>lbs</Text>
                </View>
            </View>
        );
    }

    const mockRenderItemSeparator = () => {
        return (
            <View style={{width: '100%', height: 1, backgroundColor: 'white'}}/>
        );
    };
    return (
        <SafeAreaView>
            <View style={{paddingHorizontal: 12}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                        <View style={{paddingRight: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign name="left" size={30} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontSize: 40, fontFamily: 'Inter-Bold'}}>MY PRs</Text>
                        </View>
                        <Text style={{fontSize: 20, fontFamily: 'Inter-Bold', color: '#6388EC'}}>@{username}</Text>
                    </View>
                    <Image 
                        source={require('../../../../assets/logo.png')}
                        style={{width: 65, height: 65}}
                    />
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: 'white', marginTop: 16}}/>
                <FlatList
                    style={{width: '100%', height: '100%'}}
                    data={myExercises}
                    ItemSeparatorComponent={mockRenderItemSeparator}
                    renderItem={mockRenderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    );
};

export default PersonalRecordsScreen;