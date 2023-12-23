import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { handleSignIn, handleCheckSession } from 'functions/authentication/signin';

const SigninScreen = ({ navigation }) => {
  useEffect(() => {
    localHandleCheckSession();
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const localHandleCheckSession = async () => {
    const result = await handleCheckSession();
    if (result) {
      navigation.navigate('Tabs')
    }
  }

  const localHandleSignIn = async () => {
    const result = await handleSignIn({
        email,
        password,
    });
    if (result) {
        navigation.navigate('Tabs');
    }
  };

  const localHandleSignUp = () => {
    navigation.navigate('Signup')
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={localHandleSignIn} />
      <Button title="Sign Up" onPress={localHandleSignUp} />
    </View>
  );
};

export default SigninScreen;
