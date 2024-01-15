import React, { useState } from 'react';
import { View, TextInput, Text as RNText, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'components/view';
import Text from 'components/text';
import { signIn } from 'aws-amplify/auth';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);

  const localHandleNext = async () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email && reg.test(email) !== false) {
      try {
        const result = await signIn({
          username: email,
          password: "."
        });
        if (result.nextStep.signInStep === "CONFIRM_SIGN_UP") {
          setError("I see there is a user with that email already.");
          setTimeout(() => {
            setError(null);
          }, 5000);
        };
      } catch (err) {
        if (err.name === "UserNotFoundException") {
          navigation.navigate('CreatePassword', { email });
        } else {
          setError("I see there is a user with that email already.");
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
      }
    } else {
      setError("I can't seem to reach that email :(");
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
              <Text style={styles.title}>EMAIL</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                style={styles.textInput}
                placeholderTextColor={"gray"}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <View>
                <TouchableOpacity style={styles.next} onPress={localHandleNext}>
                  <RNText styles={styles.text}>
                    Next
                  </RNText>
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

export default SignupScreen;


