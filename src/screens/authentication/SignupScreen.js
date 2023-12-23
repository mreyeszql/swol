import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { handleSignUp } from 'functions/authentication/signup';

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
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
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
      <Button title="Sign Up" onPress={localHandleSignUp} />
    </View>
  );
};

export default SignupScreen;
