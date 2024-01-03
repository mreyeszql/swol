import React, { useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { handleSignUp } from 'functions/authentication/signup';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'components/view';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const localHandleSignUp = async () => {
    const result = await handleSignUp({
        username,
        email,
        password,
    });

    if (result) {
        navigation.navigate('ConfirmSignup', { email, username });
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
              <Text style={styles.title}>Sign Up</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                style={styles.textInput}
                placeholderTextColor={"gray"}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                style={styles.textInput}
                placeholderTextColor={"gray"}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                style={styles.textInput}
                placeholderTextColor={"gray"}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <View>
                <TouchableOpacity style={styles.next} onPress={localHandleSignUp}>
                  <Text styles={styles.text}>
                    Next
                  </Text>
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

export default SignupScreen;


