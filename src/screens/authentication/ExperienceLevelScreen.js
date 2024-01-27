import React, { useState, useEffect } from 'react';
import { View, TextInput, Text as RNText, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'components/view';
import { generateClient } from 'aws-amplify/api';
import Slider from '@react-native-community/slider';
import { updateProfile } from 'graphql/mutations';
import Text from 'components/text';


const ExperienceLevelScreen = ({ navigation, route }) => {
    const { sub, comingFromSettings } = route.params;
    const [profile_id, setProfile_id] = useState(null);
    const [value, setValue] = useState(5);

    useEffect(() => {
        localHandleFetchAuth();
    }, []);

    const localHandleFetchAuth = async () => {
        client = generateClient();
        const query = `
        query MyQuery {
            profilesByOwnerId(ownerId: "${sub}") {
            items {
                id
                imageUrl
                experience
            }
            }
        }
        `;
        const profile = await client.graphql({
            query: query,
        });

        const profile_id = profile.data.profilesByOwnerId.items[0]?.id;
        setValue(profile.data.profilesByOwnerId.items[0]?.experience ?? 5);
        setProfile_id(profile_id);
    };

    const localHandleNext = async () => {
        if (value >= 0 && value <= 10) {
            const client = generateClient();
            const result = await client.graphql({
                query: updateProfile,
                variables: { input: {
                    id: profile_id,
                    experience: Math.round(value)
                }}
            });
            if (comingFromSettings) {
                navigation.goBack()
            } else { 
                navigation.navigate("SpecifyTypeGym", { profile_id });
            }
            
        }
    }

    return (
        <SafeAreaView>
        <TouchableWithoutFeedback 
            onPress={() => Keyboard.dismiss()}
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
            >
                <View>
                    <Text style={styles.title}>Experience Level</Text>
                    <Slider
                        style={{width: "100%", height: 10}}
                        minimumValue={0}
                        maximumValue={10}
                        value={value}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        onValueChange={(value) => setValue(value)}
                    />
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

export default ExperienceLevelScreen;