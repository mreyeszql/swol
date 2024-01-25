import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Text as RNText, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import SafeAreaView from 'components/view';
import Text from 'components/text';
import { getGym } from "graphql/queries";
import { generateClient } from "aws-amplify/api";
import { createGym, updateGym, updateProfile } from "graphql/mutations";
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { requestForegroundPermissionsAsync } from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SelectGymScreen = ({ navigation, route }) => {
    const { profile_id } = route.params;
    const [gymId, setGymId] = useState(null);
    const [gymName, setGymName] = useState(null);
    const [gymRating, setGymRating] = useState(null);
    const [gymRatingsTotal, setGymRatingsTotal] = useState(null);
    const [gymAddress, setGymAddress] = useState(null);
    const [gymPhone, setGymPhone] = useState(null);
    const {width, height} = Dimensions.get('window')

    useEffect(() => {
        (async () => {
            let { status } = await requestForegroundPermissionsAsync();
        })();
    },[]);

    const localHandleGetGym = async (id) => {
        client = generateClient();
        const result = await client.graphql({
            query: getGym,
            variables: { 
                id
            }
        });
        const gym = result.data.getGym;
        if (gym && gym.isRegistered) {
            await client.graphql({
                query: updateProfile,
                variables: { input: {
                    id: profile_id,
                    profileGymId: gymId,
                }}
            });
            navigation.navigate("Tabs");
        } else if (gym && !gym.isRegistered) {
            await client.graphql({
                query: updateProfile,
                variables: { input: {
                    id: profile_id,
                    profileGymId: gymId,
                }}
            });

            await client.graphql({
                query: updateGym,
                variables: { input: {
                    id: gymId,
                    demandNumber: gym.demandNumber + 1
                }}
            });

            navigation.navigate("ProvideUnlistedGym", { profile_id });
        } else {
            await client.graphql({
                query: createGym,
                variables: { input: {
                    id: gymId,
                    name: gymName,
                    address: gymAddress,
                    isRegistered: false,
                    demandNumber: 1
                }}
            });

            await client.graphql({
                query: updateProfile,
                variables: { input: {
                    id: profile_id,
                    profileGymId: gymId,
                }}
            });
            
            navigation.navigate("ProvideUnlistedGym", { profile_id });
        };
    };

    const localHandleNext = async () => {
        if (gymId) {
            await localHandleGetGym(gymId);
        };
    } 

    const localHandleNextNoGym = async () => {
        navigation.navigate('NoGym', { profile_id });
    }

    const localHandleInputs = (data) => {
        setGymId(data.place_id);
        setGymName(data.structured_formatting.main_text);
        setGymAddress(data.structured_formatting.secondary_text);
    };

    return (
        <SafeAreaView
            keyboardShouldPersistTaps='handled'
        >
        <TouchableWithoutFeedback 
            onPress={() => Keyboard.dismiss()}
            keyboardShouldPersistTaps='handled'
        >
            <View style={{padding: 16}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                    keyboardShouldPersistTaps='handled'
                >
                    <View
                        keyboardShouldPersistTaps='handled'
                    >
                        <Text style={styles.title}>SELECT GYM</Text>
                        <ScrollView
                            scrollEnabled={false}
                            horizontal={true}
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            <GooglePlacesAutocomplete
                                placeholder="Type a place"
                                query={{
                                    key: "AIzaSyA6q1IEwstySs7Sjbm23sSAFskK9tGdQts",
                                    type: 'gym',
                                    rankby: 'distance',
                                    sessiontoken: profile_id,
                                }}
                                listViewDisplayed={false}
                                enablePoweredByContainer={false}
                                onPress={(data, details = null) => {
                                    console.log(data);
                                    localHandleInputs(data);
                                }}
                                onFail={error => console.log(error)}
                                onNotFound={() => console.log('no results')}
                                textInputProps={{
                                    placeholderTextColor: 'grey',
                                    fontFamily: 'Inter-Light'
                                }}
                                styles={{
                                    textInput: {
                                        color: 'white',
                                        backgroundColor: 'black',
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        borderRadius: 12,
                                        fontFamily: 'Inter-Light'
                                    },
                                    row: {
                                        backgroundColor: 'transparent',
                                    },
                                    description: {
                                        color: 'white',
                                        fontFamily: 'Inter-Light'
                                    },
                                    listView: {
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        borderRadius: 12,
                                        maxHeight: 264,
                                        overflow: 'hidden'
                                    },
                                    container: {
                                        maxWidth: width - 2 * 16
                                    }
                                }}
                            />
                        </ScrollView>
                        {/* <SelectList 
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
                        />*/}
                        <View>
                            <TouchableOpacity style={styles.next} onPress={localHandleNext}>
                                <RNText styles={styles.text}>
                                    Next
                                </RNText>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-Bold',
    color: 'white',
    fontSize: 50,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  textInput: {
    textTransform: 'lowercase',
    fontFamily: 'Inter-Light',
    color: 'white',
    marginVertical: 12,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
  },
  text: {
    fontFamily: 'Inter-Light'
  },
  next: {
    marginTop: 28 - 12,
    backgroundColor: 'white',
    width: 90,
    height: 30,
    alignSelf: 'flex-end',
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginBottom: 50,
    width: 125, 
    height: 125, 
    alignSelf: 'center'
  }
});

export default SelectGymScreen;