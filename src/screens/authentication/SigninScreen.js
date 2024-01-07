import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, View, Platform, Image, TouchableOpacity, Text, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { handleSignIn } from 'functions/authentication/signin';
import SafeAreaView from 'components/view';
import { AntDesign } from '@expo/vector-icons';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const localHandleSignIn = async () => {
    const result = await handleSignIn({
        email,
        password,
    });
    if (result) {
        navigation.navigate('Tabs');
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
              <Text style={styles.title}>Log In</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor={"gray"}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={"gray"}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <View>
                <TouchableOpacity style={styles.next} onPress={localHandleSignIn}>
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
    marginBottom: 4,
    textTransform: 'uppercase'
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
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
  },
  text: {
    fontFamily: 'Inter-Light'
  },
  next: {
    marginTop: 16,
    backgroundColor: 'white',
    width: 90,
    height: 30,
    alignSelf: 'flex-end',
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default SigninScreen;
