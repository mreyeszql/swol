import SafeAreaView from "components/view";
import Text from "components/text";
import { SelectList } from "react-native-dropdown-select-list"
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Text as RNText, Keyboard, KeyboardAvoidingView, Dimensions, View, TouchableOpacity, Platform } from 'react-native';
import { generateClient } from "aws-amplify/api";
import { updateProfile } from "graphql/mutations";

const SpecifyTypeGymScreen = ({ route, navigation }) => {
    const { profile_id } = route.params;
    const client = generateClient();
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const {width, height} = Dimensions.get('window')

    useEffect(() => {
        localHandleFetchGyms();
    }, []);

    const localHandleFetchGyms = async () => {
        query = `
        query MyQuery {
            listGyms(filter: {isRegistered: {eq: true}}) {
                items {
                id
                name
                }
            }
        }
        `;
        const results = await client.graphql({ query });
        const itemsArray = results.data.listGyms.items.filter(item => item.name !== null).map(item => ({key: item.id, value: item.name}));
        setItems(itemsArray);
    };

    const localHandleNext = async () => {
        if (value) {
            await client.graphql({
                query: updateProfile,
                variables: { input: {
                    id: profile_id,
                    profileGymId: value,
                }}
            });
            navigation.navigate('Tabs');
        }
    }

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback 
                onPress={() => Keyboard.dismiss()}
                keyboardShouldPersistTaps='handled'
            >
                <View style={{padding: 16, paddingBottom: 80}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{
                            height: '100%',
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <View>
                            <Text style={{
                                fontFamily: 'Inter-Bold',
                                color: 'white',
                                fontSize: 50,
                                textTransform: 'uppercase',
                                marginBottom: 4,
                            }}>
                                SELECT GYM
                            </Text>
                            <SelectList 
                                setSelected={(val) => setValue(val)} 
                                data={items} 
                                save="key"
                                fontFamily='Inter-Light'
                                dropdownTextStyles={{color: 'white', fontFamily: 'Inter-Light'}}
                                boxStyles={{borderWidth: 1}}
                                inputStyles={{color: 'white', fontFamily: 'Inter-Light'}}
                                arrowicon={<AntDesign name="down" size={16} color={'white'} style={{paddingTop: 4}} />} 
                                searchicon={<AntDesign name="search1" size={16} color="white" style={{paddingRight: 16}}/>}
                                closeicon={<AntDesign name="close" size={20} color="white" />} 
                            />
                            <View>
                                <TouchableOpacity style={{
                                     marginTop: 28 - 12,
                                     backgroundColor: 'white',
                                     width: 90,
                                     height: 30,
                                     alignSelf: 'flex-end',
                                     borderRadius: 10,
                                     alignItems: 'center',
                                     alignContent: 'center',
                                     justifyContent: 'center'
                                }} onPress={localHandleNext}>
                                    <RNText styles={{fontFamily: 'Inter-Light'}}>
                                        Next
                                    </RNText>
                                </TouchableOpacity>
                            </View> 
                        </View>
                    </KeyboardAvoidingView>
                    <View  style={{position: 'absolute', width: '100%', transform: [{translateY: height - 150}, {translateX: 16}], justifyContent: 'center', flexDirection: 'row'}}>
                        <Text>Can't find your gym?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('NoGym', { profile_id })}>
                            <Text style={{fontFamily: 'Inter-Bold', textDecorationLine: 'underline'}}> click here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

export default SpecifyTypeGymScreen;