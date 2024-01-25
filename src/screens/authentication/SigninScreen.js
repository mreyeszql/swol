import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, View, Platform, Image, TouchableOpacity, Dimensions, Text as RNText, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { handleSignIn } from 'functions/authentication/signin';
import SafeAreaView from 'components/view';
import { AntDesign } from '@expo/vector-icons';
import { signIn, resendSignUpCode, getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import Text from 'components/text';


const SigninScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const params = route?.params;
  const {height} = Dimensions.get('window');

  useEffect(() => {
    if (params?.signup_email) {
      setEmail(signup_email);
    }
  }, []);

  const localHandleSignIn = async () => {
    try {
      const result = await signIn({
        username: email,
        password: password
      });
      if (result.nextStep.signInStep === "CONFIRM_SIGN_UP") {
        await resendSignUpCode({ username: email });
        navigation.navigate('ConfirmSignup', { email });
      } else if (result.nextStep.signInStep === "DONE") {
        
        try {
          const { username, userId } = await getCurrentUser();
          client = generateClient();
          const query = `
          query MyQuery {
              profilesByOwnerId(ownerId: "${userId}") {
              items {
                  id
                  experience
                  profileGymId
                  username
              }
              }
          }
          `;
          const profile = await client.graphql({
              query: query,
          });
    
          const profile_list = profile.data.profilesByOwnerId.items;
          if (profile_list[0]?.username) {
              if (profile_list[0]?.experience) {
                  if (profile_list[0]?.profileGymId) {
                      navigation.navigate('Tabs');
                  } else {
                      navigation.navigate('SpecifyTypeGym', { profile_id: profile_list[0].id });
                  }
              } else {
                  navigation.navigate('ExperienceLevel', { sub: userId });
              }
          } else {
              navigation.navigate('CreateUsername', { email: email, sub: userId })
          }
          
        } catch (err) {
            console.log(err);
        }
      } else {
        setError("I am having trouble signing you in :(");
        setTimeout(() => {
            setError(null);
        }, 5000);
      };
    } catch (err) {
      console.log(err);
      setError("I don't recognize that email or password :/");
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
              <RNText style={styles.title}>Log In</RNText>
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
                  <RNText styles={styles.text}>
                    Next
                  </RNText>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 32}}>
                  <RNText style={{color: error ? '#6388EC' : 'black', fontSize: 16}}>{error ? error : '|'}</RNText>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View  style={{position: 'absolute', width: '100%', transform: [{translateY: height - 150}, {translateX: 16}], justifyContent: 'center', flexDirection: 'row'}}>
              <Text>Forgot password?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordUsername', { email })}>
                  <Text style={{fontFamily: 'Inter-Bold', textDecorationLine: 'underline'}}> click here</Text>
              </TouchableOpacity>
          </View>
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
