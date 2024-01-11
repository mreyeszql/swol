import React, { useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'components/view';
import { handleSignUp } from 'functions/authentication/signup';

const CreatePasswordScreen = ({ navigation, route }) => {
    const { email, username, userId } = route.params;
    const [firstPassword, setFirstPassword] = useState(null);
    const [secondPassword, setSecondPassword] = useState(null);
    const [error, setError] = useState(null);

    const localHandleNext = () => {
        if (firstPassword && secondPassword) {
            if (firstPassword === secondPassword) {
                localHandleSignUp(username, email, firstPassword);
            } else {
                setError("You just gave me two different passwords there :/");
                setTimeout(() => {
                    setError(null);
                }, 5000);
            }
        } else {
            setError("You can't just not have a password :|");
            setTimeout(() => {
            setError(null);
            }, 5000);
        }
    };

    const localHandleSignUp = async (username, email, password) => {
        const result = await handleSignUp({
            username,
            email,
            password,
        });
        console.log(result);
        if (result) {
            navigation.navigate('ConfirmSignup', { email, username });
        } else {
            setError("Anyone could guess that weak ass password!");
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    };

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
                <Text style={styles.title}>Create Password</Text>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.textInput}
                    placeholderTextColor={"gray"}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={firstPassword}
                    onChangeText={(text) => setFirstPassword(text)}
                />
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.textInput}
                    placeholderTextColor={"gray"}
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    value={secondPassword}
                    onChangeText={(text) => setSecondPassword(text)}
                />
                <View>
                    <TouchableOpacity style={styles.next} onPress={localHandleNext}>
                    <Text styles={styles.text}>
                        Next
                    </Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 32}}>
                    <Text style={{color: error ? '#6388EC' : 'black'}}>{error ? error : '|'}</Text>
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

export default CreatePasswordScreen;


