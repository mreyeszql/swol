import React, { useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'components/view';
import { generateClient } from 'aws-amplify/api';
import { listProfiles } from 'graphql/queries';
import { updateUserAttributes } from 'aws-amplify/auth';
import { createProfile } from 'graphql/mutations';

const CreateUsernameScreen = ({ navigation, route }) => {
  const { email, sub } = route.params;
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const localHandleNext = async () => {
    if (username) {
      client = generateClient();
      const result = await client.graphql({
        query: listProfiles,
        variables: { 
          filter: {
            username: {
              eq: username.toLowerCase()
            }
          }
        }
      });

      if (result.data.listProfiles.items.length === 0) {

        await client.graphql({
            query: createProfile,
            variables: { input: {
              username: username.toLowerCase(),
              ownerId: sub
            }}
        });
        
        await updateUserAttributes({
          userAttributes: {
              preferred_username: username.toLowerCase(),
          }
        });

        navigation.navigate('ExperienceLevel', { sub });
      } else {
        setError("That username is already taken :(");
        setTimeout(() => {
          setError(null);
        }, 5000);
      };

    } else {
        setError("Please enter a longer username.");
        setTimeout(() => {
          setError(null);
        }, 5000);
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
              <Text style={styles.title}>Create Username</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                style={styles.textInput}
                placeholderTextColor={"gray"}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              <View>
                <TouchableOpacity style={styles.next} onPress={localHandleNext}>
                  <Text styles={styles.text}>
                    Next
                  </Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 32}}>
                  <Text style={{color: error ? '#6388EC' : 'black', fontSize: 16}}>{error ? error : '|'}</Text>
                </View>
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

export default CreateUsernameScreen;


